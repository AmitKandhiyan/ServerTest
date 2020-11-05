
const HelperService = require('./Service/Helper');
module.exports.findServer = async () => {

    //using try-catch for handling error in async-await or for some code error.
    try{
        const serverList = [
            {"url": 'http://doesNotExist.kratikal.com', priority: 1},
            {"url": 'http://kratikal.com', priority: 7},
            {"url": 'http://offline.kratikal.com', priority: 2},
            {"url": 'http://google.com', priority: 4}
        ];

        //Creating multiple promise
        const allServerPromiseList = serverList.map(t => HelperService.getServerStatus(t.url, t.priority));

        //sending all request simultaneously: Promise.all call all promise parallelly
        const allServer = await Promise.all(allServerPromiseList);

        //checking is all server offline
        if (allServer.every(t => !t.isOnlineServer)) {
            throw Error("All server offline");
        } else {
            const onlineServers = allServer.filter(t => t.isOnlineServer);
            if(!onlineServers.length){
                throw Error("All server offline");
            }
            return HelperService.getLowestPriorityServer(onlineServers);
        }

    }catch(e){
        throw e;
    }
};
//to check using without start server
module.exports.findServer().then(console.log).catch(console.log);