function interpret(code) {
    let index = 0;

    let pointer = 0;
    let tape = [0];

    while (index < code.length()) {
        switch (code[index]) {
            case '+':
                tape[pointer] += 1;
        }
    }
}

interpret("+");