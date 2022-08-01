const argv = require('yargs')
    .options({
        'p':{
            alias: 'port',
            type: 'number',
            describe: 'Puerto a utilizar',
        },
        'm':{
            alias: 'modo',
            type: 'string',
            describe: 'Modo a ejecutarse : fork o cluster',
        }
    })
    .check((argv,options) => {
        if (argv.p && isNaN(argv.p)){
            throw 'E puerto es incorrecto';
        }
        return true;
    })
    .argv;

module.exports = argv;