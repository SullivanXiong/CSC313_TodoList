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

    // response headers
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };

    // get query string parameters from the event object passed from API Gateway
    const params = event.queryStringParameters;

    try {
        switch (event.httpMethod) {

            // delete a todo from the DB
            case 'DELETE':
                const delete_title = params.delete;
                const delete_item = {
                    TableName: 'workshop_db',
                    Key: { "title": delete_title }
                };

                body = await dynamodb.delete(delete_item).promise();
                break;
    
            // add a todo to the DB
            case 'POST':
                const today = new Date(Date.now());
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

                body = await dynamodb.put(new_item).promise();
                break;

            // get all todos from the DB
            case 'GET':
                body = await dynamodb.scan({ TableName: "workshop_db" }).promise();
                break;

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
