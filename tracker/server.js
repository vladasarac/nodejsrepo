var net = require('net');
var server = net.createServer(function(connection){
  console.log('FROM SERVER client connected');
  connection.on('end', function(){
  	console.log('FROM SERVER client disconnected');
  });
  connection.write('FROM SERVER Hello World!\r\n');
  connection.pipe(connection);
});

server.listen(8080, function(){
	console.log('FROM SERVER server is listening');
})

