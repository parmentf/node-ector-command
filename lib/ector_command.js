/*jshint node:true curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, sub: true, undef: true, eqnull: true, laxcomma: true, white: true, indent: 2 */
/*
 * ector-command
 * https://github.com/parmentf/node-ector-command
 *
 * Copyright (c) 2012 François Parmentier
 * Licensed under the MIT license.
 */
"use strict";

var debug = require('debug')('ector:command');
var program = require('commander');
var Ector = require('ector');

program
  .version('0.1.0')
  .option('-p, --person [name]', 'set the name of the utterer', 'User')
  .option('-b, --botname [botname]', 'set the name of the bot', 'ECTOR')
  .option('-q, --quiet', 'shut up!')
  .option('-l, --log [filepath]', 'log the dialogue in log file', 'ector.log')
  .parse(process.argv);

var ector = new Ector(program.botname, program.person);

function loop() {
  program.prompt(program.person + ': ', function (phrase) {
    if (phrase !== null || phrase !== 'Bye') {
      ector.addEntry(phrase);
      var response = ector.generateResponse();
      console.log('%s: %s', program.botname, response.sentence);
      loop();
    }
  });
}

loop();

process.on('exit', function () {
  console.log('Bye');
});