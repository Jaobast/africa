const group01 = document.getElementById('group1');
const group02 = document.getElementById('group2');

const containerPerson = document.querySelector('.person-container');
const containerGroup = document.querySelector('.group-container');
const bttnPerson = document.getElementById('person-done');

const inputName = document.getElementById('name');
const bttnName = document.getElementById('send-name');
const namePlaceholder = document.querySelector('.name-placeholder');
const newWordList = document.querySelector('.new-word-list');

let phraseArray = [];
let currentPerson = null;

group01.addEventListener('click', () => startNewPerson());
group02.addEventListener('click', () => startNewPerson());

bttnPerson.addEventListener('click', () => {
    if (currentPerson) {
        console.log(`Objeto fechado para ${currentPerson}`);
    }
    currentPerson = null; // "Fecha" o objeto atual
    hiddenDiv(containerGroup, containerPerson);
    namePlaceholder.innerHTML = '';
    newWordList.innerHTML = '';
});

function startNewPerson() {
    hiddenDiv(containerPerson, containerGroup);
    inputName.placeholder = 'your name';
}

function hiddenDiv(remove, add) {
    remove.classList.remove('hidden');
    add.classList.add('hidden');
}

bttnName.addEventListener('click', (e) => {
    if (inputName.placeholder.includes('your name')) {
        currentPerson = inputName.value;
        namePlaceholder.innerHTML = currentPerson;
        inputName.value = '';
        inputName.placeholder = 'add a phrase';

        phraseArray.push({ name: currentPerson, phrases: [] });
    } else {
        const personObject = phraseArray.find(obj => obj.name === currentPerson);
        if (personObject) {
            personObject.phrases.push(inputName.value);
        }
        inputName.value = '';

        newWordList.innerHTML = '';
        personObject.phrases.forEach(phrase => {
            const createTextElement = document.createElement('p');
            createTextElement.innerHTML = phrase;
            newWordList.appendChild(createTextElement);
        });
    }

    console.log(phraseArray);
});
