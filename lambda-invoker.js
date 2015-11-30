var AWS = require('aws-sdk');
var lambda = new AWS.Lambda();

var config = {
    events : [
        {
            name: 'name_of_your_lambda_function',
            payload: {
                //whatever you want to access as the "event" object
            }
        }
    ]
};

console.log('Loading function lambda-invoker.js');

exports.handler = function(event, context) {
    var events = config.events;
    events.forEach(function(event, index, array) {
        console.log('invoking ' + (index + 1) + ' of ' + array.length);
        var payload = JSON.stringify(event.payload);
        var functionName = event.name;
        var params = {
            FunctionName: functionName,
            InvocationType: 'Event', //invokes the function asynchronously
            Payload: payload
        };
        console.log('params: ' + JSON.stringify(params));

        //TODO add error handling
        lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response

            if (index === array.length - 1) {
                context.succeed();
            }
        });
    });
};