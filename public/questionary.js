import Setanimal from './setanimal.js';

class Questionary {

    doLookup(answers) {
        return fetch('/lookup/' + answers) //ERNESTO: Invocamos al metodo GET lookup del backend enviandole la lista de respuestas
            .then(response => response.json()) //ERNESTO: Obtenemos la respuesta que entrega el backend y la parseamos como un objeto JSON
            .then(json => document.querySelector('#definition').innerHTML = json.animal) //ERNESTO: reemplazamos el valor del HTML actual por la respuesta obtenida            
    }

    save(animal) {
        const postBody = {
            animal: animal
        }
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };   
        // ERNESTO: salvamos el animal ingresado y actualizamos el status
        return fetch('/save/', fetchOptions)
            .then(response => response.json()) 
            .then(json => alert(JSON.stringify(json)))
            .then(result => {
                const setAnimal = new Setanimal();
                setAnimal.showStatus();
            });            
    }

    logout() {
        const fetchOptions = {
            method: 'POST',            
        };
        return fetch('/logout/', fetchOptions);
    }
}


export default Questionary;