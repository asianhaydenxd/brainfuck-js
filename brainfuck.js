function interpret(code) {
    let index = 0;

    let pointer = 0;
    const tape = [0];

    while (index < code.length) {
        switch (code[index]) {
            case '.': // Output pointed cell as per its ASCII value
                console.log(tape[pointer]); // This is temporary (just prints the number value) until I figure out how to convert ints into ASCII chars
                break;
            case '+': // Increment pointed cell by 1
                tape[pointer] += 1;
                break;
            case '-': // Decrement pointed cell by 1
                tape[pointer] -= 1;
                break;
        }

        index += 1;
    }
}

interpret("++++.");