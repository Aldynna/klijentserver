const net = require('net');
var PORT = 8080;


const server = net.createServer((socket) => {
    //socket.end('close socket\n');
    console.log('client connected');
    socket.on('data',(data)=>{

        console.log('Podaci od klijenta, ispis server' +': ' + data);



    });
    socket.on('end', () => {
        console.log('client disconnected');
    });
}).on('error', (err) => {
    // handle errors here
    if (err.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT);
        }, 1000);
    }
    throw err;
}).on('connection',(socket)=>{
    //sta se desi ukoliko pokusamo da se konektujemo na stranicu, preko browsera,localhost:port
    console.log('Pokusaj konekcije');
});


// grab an arbitrary unused port.
server.listen({
    port: PORT

},() => {
    console.log('opened server on', server.address());
});
//server.listen(PORT);

const client = net.createConnection({ port: PORT }, () => {
//const client = net.createConnection({ port: 80, host:'pmf.unsa.ba' }, () => {
    //'connect' listener
    console.log('Konekcija client!');
    client.write('Klijent!\r\n');

});
client.on('data', (data) => {
    console.log(data.toString());
   /* setTimeout(() => {
        server.close();
        server.listen(PORT);
    }, 1000);*/
  // client.end();

});
client.on('end', () => {
    console.log('disconnected from server');
});
client.on('close', function() {
    console.log('Connection closed');
});

client.on('error', (err) => {
    // handle errors here
    throw err;})

client.on('vrijeme, sa servera', function(data){
    console.log('vrijeme:'+data);
});

//svako 4 sekunde ispis vremena
setInterval(function(){
    var d=new Date();
    client.emit('vrijeme, sa servera', d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
}, 4000);