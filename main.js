const opciones = {
	id:{
		alias: 'i',
		demand:true
	},
	nombre:{
		alias: 'n',
		demand:true
	},
	cedula:{
		alias: 'x',
		demand:true
	}
}

const express = require('express')
const app = express()
const fs = require('fs')
const argv = require('yargs')
            .command('inscribir','inscribir al solicitante',opciones)
            .argv

let cursos = [
            {id:0, nombre:"Calculo", duracion: 120, valor:130000} ,
            {id:1, nombre:"Semiotica", duracion:100,valor:110000} ,
            {id:2, nombre:"Sistemas Operativos", duracion:120,valor:150000},
            {id:3, nombre:"Proyecto de grado",duracion:60,valor:130000}
]
var texto=""
  function mostrarCursos  ()  {
    cursos.forEach((curso, index ) => {
      setTimeout(() => {
          console.log("Curso N°:[" + curso.id + "]: El curso se llama " + curso.nombre + " tiene una duracion de " + curso.valor + " horas y tiene un valor de " + curso.valor);
          texto = texto + "<br> curso N°:["  + curso.id +  "]: El curso se llama " + curso.nombre + " tiene una duracion de " + curso.valor + " horas y tiene un valor de " + curso.valor;

      }, index * 2000);
    });
  }

  function buscarCurso(id){
    let  curso = cursos.find( cursos => cursos.id  == id)
    if (curso !== undefined){
    
      let data ="El estudiante " + argv.n + " con cedula " + argv.x + " se ha matriculado en el curso llamado " + curso.nombre  +
      " tiene una duracion de " + curso.duracion + " y un valor de " + curso.valor
      texto = texto + "<br>" + data
      escribirArchivo(data)
    }else {
      console.log('Ha ingresado un Id que no pertenece a algun curso')
      mostrarCursos();
    }
  }
    
  function escribirArchivo(data){
    fs.writeFile('archivo.txt',data,callback=>{
      console.log('se a creado el archivo')
      texto = texto +  "<br> se a creado el archivo"
    })
  }

  app.get('/', ((req,res) => {
    res.send(texto)
  }))
  
  if (argv.i  !== undefined ){
    buscarCurso(argv.i);
  }else {
    mostrarCursos()
  }
  console.log('Servidor iniciado en puerto 3000')
  app.listen(3000)
  