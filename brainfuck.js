function makeBraceMap(code) {
    const braceStack = [];
    const braceMap = [];
    
    for (let index = 0; index < code.length; index++) {
        if (code[index] == '[') {
            braceStack.push(index);
        }
        else if (code[index] == ']') {
            let matchingIndex = braceStack.pop()
            braceMap[matchingIndex] = index;
            braceMap[index] = matchingIndex;
        }
    }

    return braceMap;
}

async function interpret(code) {
    let index = 0;

    let pointer = 0;
    const tape = [0];
    const braceMap = makeBraceMap(code);

    let inputBacklog = "";

    while (index < code.length) {
        switch (code[index]) {
            case '.': // Output pointed cell as per its ASCII value
                process.stdout.write(String.fromCharCode(tape[pointer])); // This is temporary (just prints the number value) until I figure out how to convert ints into ASCII chars
                break;
            case ',':
                if (inputBacklog.length > 0) {
                    tape[pointer] = inputBacklog.charCodeAt(0);
                    inputBacklog = inputBacklog.slice(1)
                    break;
                }

                const readline = require('readline');
                const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
                const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

                let input = await prompt('');

                rl.close();
                rl.on('close', () => process.exit(0));
                
                if (input.length == 0) throw "Input must be exactly 1 character!";

                if (input.length > 1) inputBacklog += input.slice(1);

                tape[pointer] = input.charCodeAt(0);
                break;
            case '+': // Increment pointed cell by 1
                tape[pointer] += 1;
                if (tape[pointer] > 255) tape[pointer] = 0
                break;
            case '-': // Decrement pointed cell by 1
                tape[pointer] -= 1;
                if (tape[pointer] < 0) tape[pointer] = 255
                break;
            case '>': // Shift pointer right by 1
                pointer += 1;
                if (pointer >= tape.length) tape[pointer] = 0;
                break;
            case '<': // Shift pointer left by 1
                pointer -= 1;
                if (pointer < 0) throw "Don't go below zero!"
                break;
            case '[': // If pointed cell is zero, jump forward to matching brace; skip otherwise
                if (tape[pointer] == 0) index = braceMap[index];
                break;
            case ']': // If pointed cell is greater than zero, jump back to matching brace; skip otherwise
                if (tape[pointer] > 0) index = braceMap[index];
                break;
        }

        index += 1;
    }
}

async function runFile(fileName) {
    const {promises: fsPromises} = require('fs');
    const code = await fsPromises.readFile(fileName, 'utf-8');
    await interpret(code);
}
