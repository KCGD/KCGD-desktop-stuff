function getRamPercentage(callback){
    let c = require('child_process').exec('free');

    c.stdout.on('data', (d) => {
        try{

            let free = d.split("\n")[1].split(" ");
            var parsed = free.filter((value, index, arr) => {
                return value !== '';
            })
            
            var totalmem = parseInt(parsed[1]);
            var freemem = parseInt([parsed[2]]);
            callback({'free': freemem, 'total':totalmem});
            //callback((freemem / totalmem) * 100);

        } catch (e){
            console.log(e);
        }
    })
}

//continuous free mem
function streamRamPercentage(time, callback){
    let c = require('child_process').exec(`watch -n 1 -t -w free`); //`watch -n ${time/1000} -t free`

    c.stdout.on('data', (d) => {
        try{
            console.log(d);
            let free = d.split("\n")[1].split(" ");
            var parsed = free.filter((value, index, arr) => {
                return value !== '';
            })
            
            var totalmem = parseInt(parsed[1]);
            var freemem = parseInt([parsed[2]]);
            callback({'free': freemem, 'total':totalmem});
            //callback((freemem / totalmem) * 100);

        } catch (e){
            console.log(e);
        }
    })
}

//get network conenctions
function getNetConnections(max, callback){

    let out = [];

    sysinfo.networkConnections((n) => {
        n.forEach((connection, index, n) => {
            if(index < max){
                out.push(connection);
            }
        })

        callback(out);

    })
}

//get network intercaces
function getNetInterfaces(callback){
    let out = [];

    sysinfo.networkInterfaces((interfaces) => {
        interfaces.forEach((i, index, interfaces) => {
            if(i.type !== "virtual"){
                out.push(i);
            }
        })
    })

    callback(out);
}
function simplifyNetInterfaces(interface, number){
    return (`${number}: ${interface.type}, ${interface.ipv4}`);
}

//BATTERY
//derived from https://github.com/kevva/linux-battery/blob/master/index.js
function battery(callback){
    let bc = require('child_process').exec(`upower -i "/org/freedesktop/UPower/devices/battery_BAT0"`);

    bc.stdout.on('data', (d) => {
        let split = d.split("\n");
        let obj = {};

        split.forEach((val, index, split) => {
            let keys = val.split(/:\s+(?=[\w\d'])/);
            obj[keys[0].trim()] = keys[1];
        })

        callback(obj);
    })
}