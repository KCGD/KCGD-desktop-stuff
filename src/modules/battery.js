module.exports = function(callback){

    let bc = require('child_process').exec(`upower -i "/org/freedesktop/UPower/devices/battery_BAT0"`);

    bc.stdout.on('data', (d) => {
        callback(d);
    })

}