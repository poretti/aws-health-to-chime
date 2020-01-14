import { SNSEvent } from 'aws-lambda';

exports.handler = async (event: SNSEvent) => {
    try {
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
