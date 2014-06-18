# ector-command [![NPM version](https://badge.fury.io/js/ector-command.png)](http://badge.fury.io/js/ector-command)

ECTOR is a learning chatterbot. This is an interactive command to ECTOR.

## Installation
Install the module with: `npm install -g ector-command`

## Usage

```bash
$ ector
```

## Parameters

### Name of the utterer
`-p, --person [name]`: set the name of the utterer (the user) - default value: `User`.

### Name of the bot
`-b, --botname [botname]`: set the name of the bot - default value: `ECTOR` (all uppercase).

### Quiet
`-q, --quiet`: the bot won't answer, only learn.

### Log
`-l, --log [filepath]`: log the dialogue in log file - default value: `ector.log`. _Not yet working_

### Help
`-h, --help`: display the parameters of the command.

### Version
`-V, --version`: output the version number.


## Internal Commands

Once run, ECTOR can be told to do various things, using commands beginning with `@`.

To see the list of these commands, use `@help`.

### @help
Display the list of commands in interactive mode.

### @usage
Print the options the `ector` command.

### @quit, @exit, @bye
To quit the program and go back to the CLI, either type `@quit`, `@exit`, `@bye`, or simply `^D` (which always close an input-dependent unix command).

### @person
Change the utterer name (like -p)

### @botname 
Change the bot's name (like -b)

### @version
Give the current version

### @save
Save Ector's Concept Network and state (useful in order to teach Ector anything you don't want him to forget). _Not yet fully functional: no loading_

### @shownodes
Show the nodes of the Concept Network (Ector's brain's partial content).
Mainly a debug command.

### @showlinks
Show the links of the Concept Network (another part of Ector's brain).
Mainly a debug command.

### @showstate
Show the state of the nodes.
Mainly a debug command.

### @debug [on|off]
Show the debug state (on or off)


## Examples
```
$ ector -p Guy
Guy: Hello ECTOR.
ECTOR: Hello Guy.
Guy: How do you do?
ECTOR: How do you do?
Guy: Well, what do you think, right now?
ECTOR: How do you do?
Guy: We already greet ourselves, indeed.
ECTOR: Well, what do you think, right now?
Guy: I think that I'm not a native English speaker.
ECTOR: I think that I'm not a native English speaker.
Guy: And also, you are a true parrot. But that's normal: you are like a young child, learning to speak.
ECTOR: I think that I'm not a young child, learning to speak.
Guy: Marvelous, now you're thinking by yourself ;)
ECTOR: But that's normal: you do?
Guy: And now, you make mistakes, that even I wouldn't make.
ECTOR: How do you make mistakes, that I'm not a true parrot.
Guy: @save
Guy: 
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [mocha](http://visionmedia.github.com/mocha/).

## Release History

* 2014/06/18: version 0.1.2: fix a blocking bug (using a deprecated module)
* 2013/01/06: version 0.1.1: link response to next entry
* 2013/01/06: version 0.1.0: first release

Warning: this is a work in progress.

## License
Copyright (c) 2013 François Parmentier  
Licensed under the MIT license.
