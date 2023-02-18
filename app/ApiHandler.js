


var aaplPrice = 0;

const handler =  function() {
  console.log('Handler Started');



  const socket = new WebSocket('wss://ws.finnhub.io?token=cfnqd0pr01qr96uomd9gcfnqd0pr01qr96uomda0');
  
  socket.addEventListener('open', function (event){
    socket.send(JSON.stringify({'type':'subscribe', 'symbol':'AAPL'}))
  });

  socket.addEventListener('message', function (event){
    const obj = JSON.parse(event.data);
    console.log(obj.data[0].s, obj.data[0].p);
    aaplPrice = obj.data[0].p;
  });

  
}

export default handler;



