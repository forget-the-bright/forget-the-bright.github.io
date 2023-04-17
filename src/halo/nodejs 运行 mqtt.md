---
icon: edit
date: 2022-12-26
category:
  - nodejs
tag:
  - mqtt
headerDepth: 5
---


# nodejs 运行 mqtt
npm 安装 mqtt
```shell
npm install -g mqtt
```
客户端
```js
var mqtt = require('mqtt');
//var process = require('process');
var client = mqtt.connect('mqtt://192.168.3.254:1883', {
    username: "admin",
    password: "public",
    clientId: 'client9'
});

function getYYYYMMDDhhmmssByDate() {
    let date = new Date();
    let value = date.getFullYear() * 10000000000 +
        (date.getMonth() + 1) * 100000000 +
        date.getDate() * 1000000 +
        date.getHours() * 10000 +
        date.getMinutes() * 100 +
        date.getSeconds();
    return value;
};


client.on('connect', function() {
    console.log("connect success");
    client.subscribe('/server/task/roleId/1/update_task_data');
    client.subscribe('/server/task/roleId/1/setValue');
});

client.on('message', function(topic, message, packet) {
    console.log(" ");
    console.log(process.env.JAVA_HOME);
    console.log("time: ", getYYYYMMDDhhmmssByDate());
    var jsonStr = message.toString()
    console.log("jsonStr: " + jsonStr);
    console.log(" ");
});
```
服务端
```js
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.254:1883', {
    username: 'admin',
    password: 'public',
    clientId: 'server1'
});

function getJsonStr() {
    return JSON.stringify({
        "event": "update_task_data",
        "data": {
            "arrTaskId": [],
            "arrTaskInst": [{
                "id": 1,
                "roleId": 1,
                "moduleId": "0",
                "userId": 0,
                "taskId": 9999,
                "finish": 0,
                "taskNodeId": 15,
                "taskNodeStatus": 0,
                "taskNodeStartTime": 20210811,
                "beforeNodeId": 14
            }]
        },
        "open": (Math.round(Math.random())+1)*10,
        "state": (Math.round(Math.random())+1)*10,
    });
}

// 推送的频道和数据

setInterval(() => {
    client.publish("/server/task/roleId/1/update_task_data", getJsonStr(), {qos: 2, retain: false});
}, 5000)

```