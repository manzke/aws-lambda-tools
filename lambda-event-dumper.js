console.log('Loading function kinesis-dumper.js');

exports.handler = function(event, context) {
    console.log(event);
    context.succeed(event);
};