const fs = require('fs');


const dataFolder = '/home/redel/Documentos/HACKUPC2018/tensorflow/data/trainnig'

for (const file of fs.readdirSync(dataFolder)) {

    var data = JSON.parse(fs.readFileSync(dataFolder+'/'+file, {encoding: 'UTF-8'}))
    console.log(data);
    
}
