const express = require('express');
require('dotenv').config()
const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);

client.on('message', (message) => {
    console.log(message.content);

    if (message.content.startsWith('!')) {
        let searchTerm = message.content.substr(1);

        console.log(searchTerm)
        let url = 'https://images-api.nasa.gov/search?q=' + searchTerm
        console.log(url);
        let random = Math.floor(Math.random() * 100)
        console.log('Random #: ' + random);

        axios.get(url)
            .then((res) => {
                console.log('Sizeof json: ' + res.data.collection.items.length);

                let x = res.data.collection.items[random]['links'][0]['href']
                console.log('Link: ' + x);
                const attachment = new MessageAttachment(x);
                message.channel.send(attachment);
            })
    }
})

