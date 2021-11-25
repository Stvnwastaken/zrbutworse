//SUPER MESSY BUT WORKS
/*
TO DO LIST:
-Accounts using database Possibly MongoDB or Replit
*/
const Websocket = require('ws')
const express = require('express')
const app = express()
const path = require('path')
const server = 'svl1.lightdarkhole.repl.co'
const mainServer = 'LightLord Main'
const granted = 'IkRYoURiNsAnE'


var socket = new Websocket(`wss://${server}`)

app.use(express.static(path.join(__dirname, 'public')));

if(socket.readyState === 1){
	console.log('Socket open')
}else if(socket.readyState === 2){
  console.log('Websocket connection is closing')
}else if(socket.readyState === 3){
	console.log('Websocket connection closed')
}

socket.on('open', (ws) => {
	console.log(`Attempting Connection to ${mainServer}`)
  console.log(`Connection to ${mainServer} successful`)
	socket.send('Client has Connected')
	console.log(`Sending Confirmation Message to ${mainServer}`)
})

socket.on('close', (ws) => {
	console.log(`Disconnected from server: ${mainServer}`)
	socket.send('Client has Disconnected')
})
socket.on('message', (msg) => {
	if(msg === granted){
		//do something
	}else{
			console.log(`Message recieved by ${mainServer}`)
		  console.log(`Message from ${mainServer}: ${msg}`);
	}
})

socket.on('error', (ws, err) => {
	console.log(`Encountered error while connection to ${mainServer}, its probably because the server is offline`)
	socket.send(`Client encountered error: ${err}`)
})

app.listen('2001')


