# brainfuck-js

A JavaScript study project in the form of a brainfuck interpreter.

## Use

Make sure [you have Node.JS installed](https://nodejs.org/en/) and can run the command `node`.

To start the interpreter, type the following into the command line:

    node .\brainfuck.js <file>

...and replace `<file>` with the name of your actual file.

If you want to have the input logs, output logs, and input backlogs printed out at the end, use the `-l` flag.

    node .\brainfuck.js <file> -l

This will print out something along the lines of:

    { inLog: 'abc', outLog: 'aabbcc', inputBacklog: 'd' }

If you want to set a default input instead of dealing with input while the program is running (i.e. immediately setting the input backlog), use the `-d` flag followed by your default input string.

    node .\brainfuck.js <file> -d "ABCDEFG"

Multiple instances of `-l` or `-d` will throw an error. Likewise, the use of `-d` without an argument will also throw an error.

    node .\brainfuck.js <file> -l -d "ABCDEFG" -d # very bad!

You can also use both flags in any order simultaneously:

    node .\brainfuck.js <file> -d "ABCDEFG" -l
    node .\brainfuck.js <file> -l -d "ABCDEFG"