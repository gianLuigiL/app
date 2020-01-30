require('dotenv').config()
const amqp = require("amqplib");

let ch = null;
const channel = () => new Promise((resolve, reject) => {

    if (ch) {
        console.log("Channel already exists")
        resolve(ch)
    }
    //Try to connect
    return amqp.connect('amqp://rabbit')
        //If connected
        .then(connection => {
            console.info("Connected amqp")
            //Create a channel
            return connection.createChannel()
                //Jump a level and return the channel
                .then(channel => {
                    ch = channel;
                    console.info("Created channel");
                    resolve(ch)
                })
        })
        .catch(err => {
            console.warn("Couldn't connect retrying")
            setTimeout(() => {
                return channel();
            }, 5000);
        })
})

const readMessage = (queue = process.env.MAIN_QUEUE) => new Promise((resolve, reject) => {
    return channel().then(async channel => {
        const ok = await channel.assertQueue(queue);
        resolve({ consume: channel.consume, ack: channel.ack })
    })
})

const sendMessage = (msg, queue = process.env.MAIN_QUEUE) => {
    return channel().then(async channel => {
        const ok = await channel.assertQueue(process.env.MAIN_QUEUE);
        console.log("Sent message", msg)
        return (channel.sendToQueue(queue, Buffer.from(msg)))
    })
}





module.exports = { channel, sendMessage, readMessage }