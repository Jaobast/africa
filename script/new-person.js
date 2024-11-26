const group01 = document.getElementById('group1');
const group02 = document.getElementById('group2');

const containerPerson = document.querySelector('.person-container');
const containerGroup = document.querySelector('.group-container');
const bttnPersonDone = document.getElementById('person-done');

const inputName = document.getElementById('name');
const bttnName = document.getElementById('send-name');
const namePlaceholder = document.querySelector('.name-placeholder');
const newWordList = document.querySelector('.new-word-list');

const nameList = document.querySelector('.name-list');

let phraseArray = [];
let currentPerson = null;

let peopleArray = [];

group01.addEventListener('click', () => startNewPerson());
group02.addEventListener('click', () => startNewPerson());

function startNewPerson() {
    hiddenDiv(containerPerson, containerGroup);
    inputName.placeholder = 'your name';

    nameList.innerHTML = '';
}

function hiddenDiv(remove, add) {
    remove.classList.remove('hidden');
    add.classList.add('hidden');
}



bttnName.addEventListener('click', (e) => {
    if (inputName.placeholder.includes('your name')) {
        currentPerson = inputName.value;
        namePlaceholder.innerHTML = currentPerson;
        peopleArray.push(inputName.value);

        inputName.value = '';
        inputName.placeholder = 'add a phrase';

        phraseArray.push({ name: currentPerson, phrases: [] });

        console.log(peopleArray);
        
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



bttnPersonDone.addEventListener('click', () => {

    currentPerson = null;
    hiddenDiv(containerGroup, containerPerson);
    namePlaceholder.innerHTML = '';
    newWordList.innerHTML = '';

    if (peopleArray){
        peopleArray.forEach(person => {
            const createNameText = document.createElement('p');
            createNameText.innerHTML = person;
            nameList.appendChild(createNameText);
        });
    }
});