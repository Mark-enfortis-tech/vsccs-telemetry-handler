const net = require('node:net');
const dgram = require('dgram');
const querystring = require('querystring');

/*
this app will only need to listen to incoming messages, 
When a message is received the app will need to form a transmission frame 
and send to the target.
The message will need to be formed into a protocol appropriate for the target
The incoming message will provide the message plus the protocol to use.

Need to send a response back to the vsccs server indicating command received.

*/


// msgServer object - handles incoming commands
const targetClient = net.createServer((socket) => {
  // 'connection' listener.
  console.log('telemetry source connected');
  // myTimer.start();


  socket.on('end', () => {
    console.log('telemetry source disconnected');
  });

  // receive command from UI
  socket.on('data', (data) => {  
    console.log('telemetry handler received: ', data.toString());
    myObj = JSON.parse(data);
    var cmdMap = new Map(Object.entries(myObj));
    console.log('commandMap: ', cmdMap);

    // wait 1 second and send response to ack handler
    
    const respData = {
      "cmd_id": cmdMap.get("cmd_id"),
      "time_sent" : cmdMap.get("time_sent")
    };

    saveData(respData);

  }); 
});

targetClient.on('error', (err) => {
  throw err;
});

targetClient.listen(3008, () => {
  console.log('telemetry handler waiting for connection...'); 
});


function saveData(respData){
  console.log("saving data to cmdHistCollection:", respData);

}

