const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const dynamoCB = (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
};

exports.handler = async (event, context) => {
    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
        statusCode: 200,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };
    console.log(event, "testing!!!", context, "\n\n\n");
    const params = event.queryStringParameters;

    try {
        switch (event.httpMethod) {
            case 'DELETE':
                const delete_title = params.delete;
                const delete_item = {
                    TableName: 'workshop_db',
                    Key: { "title": delete_title }
                };

                body = await dynamodb.delete(delete_item).promise();
                break;
            // case 'GET':
            //     body = await dynamo.scan({ TableName: event.queryStringParameters.TableName }).promise();
            //     break;
            case 'POST':
                console.log("Getting to post!!");
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                const dateString = today.toLocaleDateString();
                const title = params.title;
                const todo_description = JSON.stringify(event.body);

                // construct db object 
                const new_item = {
                    TableName: 'workshop_db',
                    Item: {
                        "title": title,
                        "data": { "date": dateString, "description": todo_description }
                    }
                };

                // add new todo to dynamo
                body = await dynamodb.put(new_item).promise();

                break;
            case 'GET':
                body = await dynamodb.scan({ TableName: "workshop_db" }).promise();
                break;
            // case 'PUT':
            //     body = await dynamo.update(JSON.parse(event.body)).promise();
            //     break;

            default:

                body = JSON.stringify('Hello from Michaels Lambda!');
                break
        }
    } catch (err) {
        console.log("ERROR ", err);
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
