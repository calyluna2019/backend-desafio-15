const app = require("./src/server");
const argv = require('./src/config/yargs');
const server = require('http').Server(app);
const cluster = require('cluster');
const core = require('os');

/* por consola para el puerto es -p o -port */
const PORT = argv.port ? argv.port : argv._.length > 0 ? argv._[0] : 8080;
const modo = argv.modo || 'fork';

const startServer =() => {
    server.listen(PORT, () => {
        console.log(`Escuchando port: ${server.address().port} en proceso ID:(${process.pid})`); 
    });

    server.on('error', (err) => console.log(err));
}


if (modo !== 'fork'){
  if (cluster.isPrimary) {
      console.log(`Proceso principal ID:(${process.pid})`)
      for(let i = 0; i <  core.cpus().length; i++) {
          cluster.fork();
      }
  
      cluster.on('exit', (worker) => {
          cluster.fork();
      });
  
  } else {
    startServer();
  }
} else {
  startServer();
}

/*
se debe ejecutar los siguientes comando para el cluster del desafio. 
pm2  start server.js --name="8082" --watch -i 3  -- -- 8082
pm2  start server.js --name="8083" --watch -i 3  -- -- 8083
pm2  start server.js --name="8084" --watch -i 3  -- -- 8084
pm2  start server.js --name="8085" --watch -i 3  -- -- 8085 
*/