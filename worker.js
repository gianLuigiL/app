require('dotenv').config()
const { chan : channel } = require("./rabbit/connect");

const readMessage = () => {
    return new Promise( (resolve, reject) => {
        if(channel) {
            channel.consume(process.env.MAIN_QUEUE, function(msg) {
                resolve(msg.content.toString())
              }, {
                  noAck: true
            });
        } else {
            setTimeout(readMessage, 5000);
        }
    })
}

readMessage();