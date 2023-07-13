import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
//import { Client, LocalAuth } from 'whatsapp-web.js';
import {chat } from "./chat.js";

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    // console.log('Client is ready!');
});

client.on('authenticated', (session) => {    
    // Save the session object however you prefer.
    // Convert it to json, save it to a file, store it in a database...
    console.log('Application is ready!');
});

let messages = {};
client.on('message', async message => {
    if (!messages[message.from]) {
        messages[message.from] = [];
    }
    messages[message.from].push(message.body);
    if (message.notifyName) {
        client.sendMessage(message.from, `Hello ${message.notifyName}`);
        // Your code here
    }
    
    if (message.type === "chat") {
        const res = await chat(message.body, message.from);
        message.reply(res);
       // if(message.body === '!ping') {
        //    message.reply(res);
            // client.sendMessage(message.from, 'pong');
       // }
    } else {
        client.sendMessage(message.from, 'Sorry, can answer text messages only so far.');
    }
});


client.initialize();
