/**
 * Created by amit on 5/11/20.
 */
const request = require('request');

module.exports.getServerStatus = (serverUrl, priority) => {
    return new Promise(resolve => {
        module.exports.makeGetRequest(serverUrl,function (err, response) {
            let isOnlineServer = false;
            //check the status code of server if it between 200 an 299 then server is online
            if ((response && response.statusCode && (response.statusCode >= 200 || response.statusCode <= 299))) {
                isOnlineServer = true;
            }
            resolve({isOnlineServer, priority, url: serverUrl});
        });
    });
};

module.exports.makeGetRequest=(url,cb)=>{
    request.get(url, {timeout: 5 * 1000},cb);
};

module.exports.getLowestPriorityServer = (serverList) => {
    if (!(serverList instanceof Array)) {
        serverList = [serverList];
    }
    if (serverList.length === 1) {
        return serverList[0];
    }
    let priority = null;
    let serverObj;

    for (let t of serverList) {
        if (!priority) {
            priority = t.priority;
            serverObj = t;
        }
        if (priority && priority > t.priority) {
            serverObj = t;
            priority = t.priority;
        }
    }
    return serverObj;
};
