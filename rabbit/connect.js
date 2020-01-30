require('dotenv').config()
const amqp = require("amqplib/callback_api");
let conn = null, chan = null;
const connect = () => new Promise((resolve, reject) => {
    if(conn) resolve(conn)
    amqp.connect('amqp://rabbit', function (err, connection) {
        if (err) {
            reject(err)
        }
        console.log("CONNECTED")
        conn = connection;
        resolve(connection);
    });
})

const createChannel = connection => new Promise((resolve, reject) => {
    if(chan) resolve(chan)
    connection.createChannel(function (err, channel) {
        if (err) {
            console.warn("Tried to create a channel with RabbitMQ but couldn't");
            reject(err)
        }
        console.log("CHANNEL CREATED")
        chan = channel;
        resolve(channel);
    });
})

let trials = 10;
const retry = () => new Promise(async (resolve, reject) => {
    try {
        const connection = await connect();
        const channel = await createChannel(connection);
        resolve({conn, chan})
    } catch (error) {
        console.log(error)
        if (trials) {
            setTimeout(retry, 5000);
            trials--;
        }
    }
})

module.exports = retry