/* jshint node:true */
'use strict';
var request = require('superagent'),
    _ = require('lodash');

module.exports = function (grunt) {

    grunt.registerMultiTask('slack', 'Push info to slack', function () {
        var options = this.options(),
            invalids = [];

        if (!options.webhook) {
            invalids.push('webhook');
        }
        if (!options.channel) {
            invalids.push('channel');
        }
        if (invalids.length > 0) {
            grunt.log.error('grunt-slack-webhook: plugin is missing following options:', invalids.join(', '));
            return false;
        }

        if(options.icon_emoji && options.icon_url) {
            grunt.log.warn('grunt-slack-webhook: Both icon_emoji and icon_url defined. Will use icon_emoji.');
            delete options.icon_url;
        }

        // We are good to go
        var done = this.async(),
            message = grunt.option('message') || '',
            url = options.webhook,
            data = {
                text: this.data.text.replace('{{message}}', message)
            };

        for(var key in options) {
           switch (key) {
                case 'webhook':
                    break;
                default:
                    data[key] = options[key];
                    break;
            }
        }

        request.post(url).type('form').send('payload=' + JSON.stringify(data)).end(function (res) {
            if (!res.ok) {
                grunt.log.error('Error sending message to slack: ', res.text);
                return done(false);
            }
            grunt.log.writeln('Message sent to slack successfully!');
            done();
        }).on('error', function (err) { // Handling network error
            grunt.log.error('Error sending message to slack: ', err.message);
            done(false);
        });
    });
};