/*eslint no-console: off */
/*
 * ector-command
 * https://github.com/parmentf/node-ector-command
 *
 * Copyright (c) 2013 François Parmentier
 * Licensed under the MIT license.
 */
"use strict";

var config = require('../package');
var debug = require('debug')('ector:command');
var sugar = require('sugar');
var program = require('commander');
var FileConceptNetwork = require('file-concept-network').FileConceptNetwork;
var Ector = require('ector');

program
  .version(config.version)
  .option('-p, --person [name]', 'set the name of the utterer', 'User')
  .option('-b, --botname [botname]', 'set the name of the bot', 'ECTOR')
  .option('-q, --quiet', 'shut up!')
  .option('-l, --log [filepath]', 'log the dialogue in log file', 'ector.log')
  .parse(process.argv);

var ector = new Ector(program.botname, program.person);

ector.injectConceptNetwork(FileConceptNetwork);

var help = function (command) {
  switch (command) {
  case "bye":
  case "quit":
    console.log("Quit the program.");
    break;
  case "usage":
    console.log("Print the options of ector command.");
    break;
  case "person":
    console.log("Change the utterer's name (like -p)");
    console.log("Without parameter, display his name.");
    break;
  case "botname":
    console.log("change the bot's name (like -b)");
    console.log("Without parameter, display the bot's name.");
    break;
  case "version":
    console.log("give the current version");
    break;
  case "shownodes":
    console.log("show the nodes of the Concept Network");
    break;
  case "showlinks":
    console.log("show the links of the Concept Network");
    break;
  case "showstate":
    console.log("show the state of the Concept Network");
    break;
  case "debug":
    console.log("show the debug state (on or off)");
    break;
  case "save":
    console.log("save Ector's Concept Network and state");
    break;
  default:
    console.log("You can just start typing phrases.\n" +
                "But there are some commands you can use:\n" +
                "- @usage     : print the options of the ector command\n" +
                "- @quit      : quit\n" +
                "- @exit      : quit\n" +
                "- @bye       : quit\n" +
                "- @person    : change the utterer name (like -p)\n" +
                "- @botname   : change the bot's name (like -b)\n" +
                "- @version   : give the current version\n" +
                "- @save      : save Ector's Concept Network\n" +
                "- @shownodes : show the nodes of the Concept Network\n" +
                "- @showlinks : show the links of the Concept Network\n" +
                "- @showstate : show the state of the nodes\n" +
                "- @load      : load Ector's Concept Network\n" +
                // "- @cleanstate: clean the state from the non-activated nodes\n" +
                // "- @log [file]: log the entries in the file (no file turns off the logging)\n" +
                // "- @status    : show the status of Ector (Concept Network, states)\n" +
                // "- @sentence [on|off]: set the sentence reply mode\n" +
                // "- @generate [on|off]: set the generate reply mode\n" +
                "- @debug [on|off]: show the debug state (on or off)"
    );
  }
};

var previousResponseNodes = null;
var loop;
var treatPhrase = function (phrase) {
  debug('phrase', '"' + phrase + '"');
  if (phrase === null || phrase === '@bye' || phrase === "@quit" || phrase === "@exit") {
    process.exit(0);
  }
  if (phrase.startsWith('@help')) {
    var command = phrase.split(' ')[1];
    help(command);
  }
  else if (phrase === '@usage') {
    program.outputHelp();
  }
  else if (phrase.startsWith('@person')) {
    var person = phrase.split(' ').slice(1).join(' ');
    debug('person', person);
    if (person.length > 0) {
      program.person = person;
      ector.setUser(person);
    }
    else {
      console.log('person: "' + ector.username + '"');
    }
  }
  else if (phrase.startsWith('@botname')) {
    var botname = phrase.split(' ').slice(1).join(' ');
    debug('botname', botname);
    if (botname.length > 0) {
      program.botname = botname;
      ector.setName(botname);
    }
    else {
      console.log('botname: "' + ector.name + '"');
    }
  }
  else if (phrase === '@version') {
    console.log('version: ' + program.version());
  }
  else if (phrase === '@shownodes') {
    console.log('nodes:', ector.cn.node);
  }
  else if (phrase === '@showlinks') {
    console.log('links:', ector.cn.link);
  }
  else if (phrase === '@showstate') {
    console.log('state:', ector.cns[ector.username].nodeState);
  }
  else if (phrase.startsWith('@debug')) {
    var toggle = phrase.split(' ').slice(1).join(' ');
    debug('debug toggle', toggle);
    switch (toggle) {
    case 'on':
      process.env.NODE_DEBUG = 'ector:command';
      break;
    case 'off':
      delete process.env.NODE_DEBUG;
      break;
    }
    console.log('DEBUG ' + (process.env.DEBUG ? 'ON' : 'OFF'));
  }
  else if (phrase === '@save') {
    ector.cn.save('cn.json', function (err) {
      if (err) {
        console.error('Error while saving to file cn.json!\n%s', err);
      }
    });
  }
  else if (phrase === '@load') {
    debug('@load');
    ector.cn.load('cn.json', function (err) {
      debug(' end of cn.load', err);
      if (err) {
        console.error('Error while loading from file cn.json!\n%s', err);
      }
    });
  }
  else if (phrase.startsWith('@')) {
    console.log('This command does not exist.');
  }
  // When it is not a command (beginning with @)
  else {
    var nodes = ector.addEntry(phrase);
    // link the nodes of the last response to the node of this entry
    ector.linkNodesToLastSentence(previousResponseNodes);
    var response = ector.generateResponse();
    console.log('%s: %s', program.botname, response.sentence);
    previousResponseNodes = response.nodes;
    debug('response', response);
  }
  loop();
};

loop = function () {
  program.prompt(program.person + ': ', treatPhrase);
};
loop();

process.on('exit', function () {
  console.log('Bye');
});
