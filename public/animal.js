class Animal {
    constructor(resultsContainer, Animal) {
        const wordDisplay = resultsContainer.querySelector('#word');
        const defDisplay = resultsContainer.querySelector('#definition');
        wordDisplay.textContent = Animal.word;
        defDisplay.textContent = Animal.definition;
    }
}

export default Animal;