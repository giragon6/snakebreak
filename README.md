# SnakeBreak

A command line debugger that motivates you to not make errors... or maybe the other way around.

Run your file with "snake <filename>", get an error, then play the game until you "unlock" your message!

Controls:

- W: Up
- A: Left
- S: Down
- D: Right
- E: Exit

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Attribution](#attribution)
- [License](#license)

## Installation

To install the package, run:

```bash
npm install snakebreak
```

## Usage

To run and debug a file, run:

```bash
snake <filename>
```

## Customization

Adjust the package's settings in the config.json file.

`linesPerScreen` (default: 20) - How many lines/words of the error to print below the board\
`splitOnNewline` (default: false) - Whether to split the error into lines instead of words\
`step` (default: 1) - How many lines/words to unlock each score\
`snakeCharacter` (default: O) - The character to represent the snake as\
`foodCharacter` (default: X) - The character to represent the food as\
`spaceCharacter` (default: .) - The character to represent empty space as

## Attribution

This project was made with the help of GitHub Copilot, a generative AI tool.

## License

This project is licensed under the MIT License.
