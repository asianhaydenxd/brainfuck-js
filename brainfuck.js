function interpret(code) {
    let index = 0;

    let pointer = 0;
    const tape = [0];

    while (index < code.length) {
        switch (code[index]) {
            case '.': // Output pointed cell as per its ASCII value
                process.stdout.write(String.fromCharCode(tape[pointer])); // This is temporary (just prints the number value) until I figure out how to convert ints into ASCII chars
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
        }

        index += 1;
    }
}

interpret(".+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+");