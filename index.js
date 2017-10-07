//https://www.npmjs.com/package/find-remove
const path = require("path");
const fs = require('fs');
const findRemoveSync = require('find-remove');
const FileHound = require('filehound');
const chalk = require('chalk');
const extentions = require('./extentions');

const files = FileHound.create()
  .paths(__dirname)
  .ext('asp')
  .find();

var pasok = function(directorio){
	return new Promise(function(resolve,reject){
		console.log(chalk.yellow("Iniciando proceso"));
		var errores = [];
		setTimeout(function(){
			console.log(chalk.cyan("Buscando codigo comentado"));
			files.then(result => {
				for(let i = 0; i <= result.length - 1; i++){
					fs.readFile(result[i], 'utf-8', (err, data) => {
						if(err) {
							reject(err);
			                return;
						} 
					    var info = data.split(/\n/);
					    for(let o = 0; o <= info.length - 1; o++){
					    	if (info[o].indexOf("<!--") > -1) {
					    		if (info[o].indexOf("<!--#include") > -1) {
						    	} else {
						    		errores.push({line:o,route:result[i],comment:info[o]})
						    	}
					    	}
					    }
					    setTimeout(function(){
					    	resolve(errores);
					    },5000);
					});
				}
			});
		},1000);
	})
}

pasok()
.then(res => {
	console.log(" ");
	for(let item of res){
		console.log(chalk.red("=> linea: ",item.line," del archivo: ", item.route), chalk.blue(" || comentario: => ",item.comment));
	}
})
.then(data => {
	console.log(" ");
	console.log(chalk.cyan("eliminando archivos basura"));
	const result = findRemoveSync(__dirname, {extensions: extentions});
	console.log(chalk.magenta.bold('archivos eliminados:'));
	console.log(result)
})
.then(() => {
	console.log(" ");
	console.log(chalk.green("proceso finalizado"))
})

 

 

