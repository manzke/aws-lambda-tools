console.log('Loading function kinesis-dumper.js');

exports.handler = function(event, context) {
    event.Records.forEach(function(record, index, array) {
        // Kinesis data is base64 encoded so decode here
        var decodedPayload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', decodedPayload);
    });
    context.succeed();
};