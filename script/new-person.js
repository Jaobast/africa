const group01 = document.getElementById('group1');
const group02 = document.getElementById('group2');

const containerPerson = document.querySelector('.person-container');
const containerGroup = document.querySelector('.group-container');
const bttnPersonDone = document.getElementById('person-done');

const inputName = document.getElementById('name');
const bttnName = document.getElementById('send-name');
const namePlaceholder = document.querySelector('.name-placeholder');
const newWordList = document.querySelector('.new-word-list');

let phraseArray = [];
let currentPerson = null;

let peopleArrayGroup1 = [];
let peopleArrayGroup2 = [];
let groupnumber = null;

group01.addEventListener('click', () => startNewPerson(groupnumber = '1'));
group02.addEventListener('click', () => startNewPerson(groupnumber = '2'));

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

        if (groupnumber === '1') {
            if (!peopleArrayGroup1.includes(inputName.value)) {
                peopleArrayGroup1.push(inputName.value);
            }
        } else if (groupnumber === '2') {
            if (!peopleArrayGroup2.includes(inputName.value)) {
                peopleArrayGroup2.push(inputName.value);
            }
        }

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
});

bttnPersonDone.addEventListener('click', () => {
    currentPerson = null;
    hiddenDiv(containerGroup, containerPerson);
    namePlaceholder.innerHTML = '';
    newWordList.innerHTML = '';

    const nameList = document.getElementById(`group${groupnumber}`).querySelector('.name-list');
    const currentPeopleArray = groupnumber === '1' ? peopleArrayGroup1 : peopleArrayGroup2;

    if (currentPeopleArray) {
        currentPeopleArray.forEach(person => {
            if (![...nameList.children].some(child => child.innerHTML === person)) {
                const createNameText = document.createElement('p');
                createNameText.innerHTML = person;
                nameList.appendChild(createNameText);
            }
        });
    }

    groupnumber = null;
});
