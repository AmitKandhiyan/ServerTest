/**
 * Created by amit on 5/11/20.
 */
const express = require("express");
const app = express();
const port = 3000;
const main = require('./main');

app.get('/',async (req, res) => {
    try{
    let arr=[
        {"url": 'http://doesNotExist.kratikal.com', priority: 1},
        {"url": 'http://kratikal.com', priority: 7},
        {"url": 'http://offline.kratikal.com', priority: 2},
        {"url": 'http://google.com', priority: 4}
    ];
    let response = await main.findServer();
    res.send({serverList:arr,lowestPriorityAndOnlineServer:response})
    }catch(e){
        res.send({error:e});
    }
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});