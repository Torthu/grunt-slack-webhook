/*
 * grunt-slack-hook
 * https://github.com/pwalczyszyn/grunt-slack-hook
 *
 * Copyright (c) 2013 Piotr Walczyszyn
 * Licensed under the MIT license.
 */

/* jshint node:true */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        slack: {
            options: {
                webhook: "your Slack webhook",
                channel: "#test",
                username: "Mr. Test",
                icon_url: "https://slack.com/img/icons/app-57.png",
                parse: "full"
            },
            test: {
                text: "Doing some testing {{message}}."
            } 
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['slack:test']);

};