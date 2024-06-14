import Questionary from "./questionary.js";

class App {
  constructor() {
    this.questionary = new Questionary();
    this.onSearch = this.onSearch.bind(this);
    this.onSet = this.onSet.bind(this);
    const searchForm = document.querySelector('#search');
    searchForm.addEventListener('submit', this.onSearch);
    const setForm = document.querySelector('#set');
    setForm.addEventListener('submit', this.onSet);
    this.lista=[];

    const logoutButton = document.querySelector("#logout-button");
    logoutButton.addEventListener('click', this.questionary.logout);
  }

  onSearch(event) {
    event.preventDefault();
    const status = results.querySelector('#status');
    status.textContent = '';
    this.lista.push(document.querySelector('#q1').checked);
    this.lista.push(document.querySelector('#q2').checked);
    this.lista.push(document.querySelector('#q3').checked);
    
    // ERNESTO: invocamos al metodo doLookup de la clsae questionary
    this.questionary.doLookup(this.lista)
      .then(this.showResults)
      .then(this.lista=[]);
  }

  onSet(event) {
    event.preventDefault();
    const animal = document.querySelector('#set-word-input').value;
    const status = results.querySelector('#status');
    status.textContent = '';

    // ERNESTO: invocamos al metodo save de la clsae questionary
    this.questionary.save(animal)
  }
  
  showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');
    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

// Init app
new App();