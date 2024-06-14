import express from 'express';
import db from './db.js';
import passport from 'passport';
import Authentication from "./auth.js"
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch'; //ERNESTO: libreria requerida para poder hacer el fetch

const dirname = fs.realpathSync('.');

class DictionaryBackendServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    const authentication = new Authentication(app);
    this.inMemoryDb = [];

    app.get('/lookup/:answers', authentication.checkAuthenticated, this.doLookup); //ERNESTO: recibimos en este metodo GET del backend, las respuestas del cuestionario para poder procesarlas
    app.post('/save/', authentication.checkAuthenticated, this.doSave);

    app.get('/login/', this.login);
    app.get('/', authentication.checkAuthenticated,  this.goHome);  

    app.get('/auth/google/', passport.authenticate('google', {
       scope: ['email', 'profile']
      }));

    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

    app.post("/logout", (req,res) => {
     req.logOut(err=>console.log(err));
     res.redirect("/login");
   })
   
    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));
  }

  async login(req, res) {
    res.sendFile(path.join(dirname, "public/login.html"));
  }

  async goHome(req, res) {
    res.sendFile(path.join( dirname, "public/home.html"));
  }

  async doSave(req, res) {
    const user = req.user.email;    
    const animal = req.body.animal.toLowerCase();
    const query = { 
      user: user,
      animal: animal 
    };
    const collection = db.collection("dict");
    await collection.insertOne(query);
    res.json({ success: true });
  }

  async doLookup(req, res) {
    const routeParams = req.params;
    const answers = routeParams.answers; //ERNESTO: obtenemos las respuestas que llegan como parametros

    console.log(answers);

    fetch('https://www.mockachino.com/ef79201c-208c-4f/animals')//ERNESTO: hacemos fetch a la API mockeada
      .then(result => result.json()) //ERNESTO: parseamos la respuesta a un objeto JSON
      .then(data => {

        let especie = "no encontrado"

        data.animales.forEach(element => {

          if (answers==element.lista){
             especie = element.especie;
           // break;
          }
          
        });((element) => {
          console.log(element.especie);
      });

          //ERNESTO: Hacemos todo lo que haya que hacer con los datos que nos entrega la API mockeada para poder conseguir el animal resultante (en estas lineas yo no estoy haciendo nada, solo estoy poniendo un valor por default)
          console.log(data);
          let animal_obtenido = especie;

          //ERNESTO: Construimos la respuesta para entregarle al frontend
          const response = {
            animal: animal_obtenido, 
          };
          //ERNESTO: Entregamos la respuesta al frontend
          res.json(response);
      })
  }


}

new DictionaryBackendServer();