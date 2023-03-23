import './screens/HomeScreen';

function handler(){



  const list = global.userStocks;
  const symOrder = [];

  //API Starter Code
  const finnhub = require('finnhub');
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = "cfnqd0pr01qr96uomd9gcfnqd0pr01qr96uomda0" 
  const finnhubClient = new finnhub.DefaultApi()

 // console.log('Handler Started');

  const socket = new WebSocket('wss://ws.finnhub.io?token=cfnqd0pr01qr96uomd9gcfnqd0pr01qr96uomda0');
  
  socket.addEventListener('open', function (event){
    try{list.forEach(element => {
      //Starts the websocket for real-time pricing for each element in userStocks
      socket.send(JSON.stringify({'type':'subscribe', 'symbol': element.symbol}));
      symOrder.push(element.symbol);
      //Sets the open price for the elements in the userStocks Array
      finnhubClient.quote(element.symbol, (error, data, response) => {
        const index = element.index - 1;
        let newList = global.userStocks;
        newList[index].openPrice = data.pc;
        global.userStocks = newList;
      });
    });}
    catch(e){
      console.log('Handler: Empty List')
    }
   
  });

  socket.addEventListener('message', function (event){
    const obj = JSON.parse(event.data);
  
    try{
      if(obj.data[0].p != '0'){  //Below Handles Data Responses

        //console.log(obj.data[0].s, obj.data[0].p);

        const index = symOrder.indexOf(obj.data[0].s);
        let newList = global.userStocks;
        newList[index].curPrice = obj.data[0].p;
        global.userStocks = newList;
      }
    }catch (e){
      console.log('Handler: No data')
    }
  });
  
}

export default handler;



