//continuous parser and output of ifstat command, auto-defined interfaces and outputs constantly via its callback
function continuousFstat(update){
    let initial = true;
    let interfaces = [];
    let outputObj = {};
    try{
        let c = require('child_process').exec(`ifstat ${config.ifstatUpdateRate}`);

        c.stdout.on('data', (d) => {
            var inLine = d.split(/:\s+(?=[\w\d'])/);
            var parsed = removeEmpty(inLine[0].split(" "));

            //define interfaces
            if(initial){
                interfaces = removeEmpty(String(parsed).split("\n")[0].split(","));
                initial = false;

                //define the interfaces
                interfaces.forEach((int) => {
                    outputObj[int] = {};
                    console.log("DEFINE NET ADAPTER:",int);
                })
            } else {

                //split the output into 3 parts, and define 'up' and 'down' to the corresponding interface (calculated by cnt)
                let cnt = 0;
                for(var i = 0; i < parsed.length; i = i + 2){

                    try{

                        let _down = parseFloat(parsed[i].replace(/\n/g, ""));
                        let _up = parseFloat(parsed[i+1].replace(/\n/g, ""));

                        //verify integrity of numbers, if nan then dont update
                        if(!isNaN(_down) && !isNaN(_up)){
                            outputObj[interfaces[cnt]]["down"] = _down;
                            outputObj[interfaces[cnt]]["up"] = _up;
                        }

                        cnt++;

                    } catch (e){
                        console.log(e);
                    }

                }

                update(outputObj);
                
            }


        })
    } catch (e) {
        console.log(e);
    }
}