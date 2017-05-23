'use strict';

require('./scss/reset.scss');
require('./scss/main.scss');

const angular = require('angular');
const cowsay = require('cowsay-browser');

const cowsayApp = angular.module('cowsayApp', []);

cowsayApp.controller('CowsayController', ['$log', CowsayController]);
cowsayApp.controller('NavigationController', ['$', NavigationController]);

function CowsayController($log) {
  $log.debug('#CowsayController');
  $log.log('check this out', this);

  this.title = 'Welcome to the Cowsay';
  this.history = [];

  // lecture additions
  cowsay.list((err, cows) => {
    this.cowfiles = cows;
    this.current = this.cowfiles[0];
  });

  this.update = function(input) {
    $log.debug('#update');
    return cowsay.say({text: input || 'moofasa', f: this.current});
  };

  this.speak = function(input) {
    $log.debug('#speak');
    this.spoken = this.update(input);
    this.history.push(this.spoken);
  };

  this.undo = function() {
    $log.debug('#undo');
    let temp = this.history.pop();
    this.spoken = temp || '';
  };
}
