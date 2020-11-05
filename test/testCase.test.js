const axios = require('axios');
const HelperService = require('../Service/Helper');
const main = require('../main');

jest.mock('axios');

function makeMockObject(data){
    axios.get.mockResolvedValue({data:data});
}

function makeMockRequest(url){
    return axios.get(url);
}

//unit test cases
describe("Unit test cases",function () {
    test('http://google.com : should be online',async () =>{
        const res = await HelperService.getServerStatus('http://google.com');
        expect(res.isOnlineServer).toBeTruthy();
    });

    test('http://kratikal.com : should be online',async () =>{
        const res = await HelperService.getServerStatus('http://kratikal.com');
        expect(res.isOnlineServer).toBeTruthy();
    });

    test('http://offline.kratikal.com : should be offline',async () =>{
        const res = await HelperService.getServerStatus('http://offline.kratikal.com');
        expect(res.isOnlineServer).toBeFalsy();
    });

    test('http://doesNotExist.kratikal.com : should be offline',async () =>{
        const obj ={isOnlineServer:false,"url": 'http://doesNotExist.kratikal.com', priority: 1}
        const res = await HelperService.getServerStatus('http://doesNotExist.kratikal.com',1);
        expect(res).toMatchObject(obj)
    });

    test('Should be called for lowest priority online server:',async () =>{
        const obj ={isOnlineServer:true,"url": 'http://google.com', priority: 4};
        const res = await main.findServer();
        expect(res).toMatchObject(obj)
    });

    test('Should be called for lowest priority server:', () =>{
        const obj ={"url": 'http://doesNotExist.kratikal.com', priority: 1};
        const serverList = [
            {"url": 'http://doesNotExist.kratikal.com', priority: 1},
            {"url": 'http://kratikal.com', priority: 7},
            {"url": 'http://offline.kratikal.com', priority: 2},
            {"url": 'http://google.com', priority: 4}
        ];
        let res =  HelperService.getLowestPriorityServer(serverList);
        expect(res).toMatchObject(obj)
    });
});



//mock testing:
describe("Mock test cases",function () {

   test('Mock:=> http://google.com : should be online', async () => {
    makeMockObject({statusCode:200});
    const response = await makeMockRequest('http://google.com')
    expect(response.data.statusCode).toEqual(200);
   });

   test('Mock:=> http://kratikal.com : should be online', async () => {
    makeMockObject({statusCode:200});
    const response = await makeMockRequest('http://kratikal.com');
    expect(response.data.statusCode).toEqual(200);
   });

   test('Mock:=> http://offline.kratikal.com : should be offline',async () =>{
    const obj ={statusCode:500,error:'Not found'};
    makeMockObject(obj);
    const response = await makeMockRequest('http://offline.kratikal.com');
    expect(response.data).toMatchObject(obj);
  });
});