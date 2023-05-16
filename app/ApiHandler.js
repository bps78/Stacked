import './screens/HomeScreen';
import { useUser } from '@clerk/clerk-expo';

function handler(){

  const {user} = useUser();
  const list = global.userStocks;
  const symOrder = [];

  //API Starter Code
  const finnhub = require('finnhub');
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = "cfnqd0pr01qr96uomd9gcfnqd0pr01qr96uomda0" 
  const finnhubClient = new finnhub.DefaultApi()

 // console.log('Handler Started');

 // const socket = new WebSocket('wss://ws.finnhub.io?token=cfnqd0pr01qr96uomd9gcfnqd0pr01qr96uomda0');
  
 //socket.addEventListener('open', function (event){
    
    try{list.forEach(element => {
      
      //Starts the websocket for real-time pricing for each element in userStocks
     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': element.symbol}));
     
      symOrder.push(element.symbol);
      
      //Sets the open price for the elements in the userStocks Array
      finnhubClient.quote(element.symbol, (error, data, response) => {
        const index = element.index - 1;
        let newList = global.userStocks;

        newList[index].openPrice = data.pc;
        newList[index].curPrice = data.c;

        console.log('NEW LIST', newList);
        global.userStocks = newList;



        const userID = user.id;
    const obj = {public_metadata: {"Data": JSON.stringify(newList)}};
    const headers = new Headers();
    headers.append("Authorization", "Bearer sk_test_kDK8pIxifMpw37PnQ3eNeBCsdrMvvwPu2knTLGwcVK");
    headers.append("Content-Type", "application/json");
  
   const request = new Request('https://api.clerk.com/v1/users/' + userID, {
      method: "PATCH",
      body: JSON.stringify(obj),
      headers: headers,
   });
  
  
    fetch(request).then((response) => {
    console.log('Request Status: ' + response.status)
   });
      });
    });}
    catch(e){
      console.log('Handler: Empty List')
    };

  // socket.addEventListener('message', function (event){
  //   const obj = JSON.parse(event.data);
  
  //   try{
  //     if(obj.data[0].p != '0'){  //Below Handles Data Responses

  //       const index = symOrder.indexOf(obj.data[0].s);
  //       let newList = global.userStocks;
  //       newList[index].curPrice = obj.data[0].p;

  //       const userID = user.id;
  //      const obj = {public_metadata: {"Data": JSON.stringify(newList)}};
  //      const headers = new Headers();
  //      headers.append("Authorization", "Bearer sk_test_kDK8pIxifMpw37PnQ3eNeBCsdrMvvwPu2knTLGwcVK");
  //      headers.append("Content-Type", "application/json");
  
  //      const request = new Request('https://api.clerk.com/v1/users/' + userID, {
  //        method: "PATCH",
  //        body: JSON.stringify(obj),
  //        headers: headers,
  //     });
  
  
  //       fetch(request).then((response) => {
  //         console.log('Request Status: ' + response.status)
  //     });
  //      }
  //      }catch (e){
  //        console.log('Handler: No data')
  //     }
  // });
  
}

export default handler;



