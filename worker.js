require('dotenv').config()
const { channel } = require("./rabbit/connect");

//Read messages from default queue
channel().then(channel => {
    return channel.assertQueue(process.env.MAIN_QUEUE).then(function (ok) {
        return channel.consume(process.env.MAIN_QUEUE, function (msg) {
            if (msg !== null) {
                console.log(msg.content.toString());
                channel.ack(msg);
            }
        });
    })
})