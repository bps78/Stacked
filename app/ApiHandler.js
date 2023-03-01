
const handler =  function() {


  var aaplPrice = 0;
  var disPrice = 0;
  global.aaplPrice = aaplPrice;
  global.disPrice = disPrice;

  //API Starter Code
  const finnhub = require('finnhub');
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = "cfnqd0pr01qr96uomd9gcfnqd0pr01qr96uomda0" 
  const finnhubClient = new finnhub.DefaultApi()

  //console.log('Handler Started');

  const socket = new WebSocket('wss://ws.finnhub.io?token=cfnqd0pr01qr96uomd9gcfnqd0pr01qr96uomda0');
  
  socket.addEventListener('open', function (event){
    socket.send(JSON.stringify({'type':'subscribe', 'symbol':'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol':'DIS'}))
  });

  socket.addEventListener('message', function (event){
    const obj = JSON.parse(event.data);
  
    try{
      if(obj.data[0].p != '0' && obj.data[0].s == 'AAPL'){
        global.aaplPrice = obj.data[0].p;
      }

      if(obj.data[0].p != '0' && obj.data[0].s == 'DIS'){
       global.disPrice = obj.data[0].p;
      }
    }catch (e){
      console.log('Handler: No data')
    }
    //console.log(obj.data[0].s, global.aaplPrice);
  });

  
}

export default handler;



