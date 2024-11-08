const word = document.getElementById("word");
const submit = document.getElementById("submit");
const list = document.getElementById("list-words");
const deleteAll = document.getElementById("delete-all");

let wordList = [];
let number = 0;

function addWordToList(word) {
    const newWordToList = document.createElement("p");
    newWordToList.innerHTML = word;
    list.appendChild(newWordToList);
}

submit.addEventListener('click', (e) => {
    wordList.push(word.value);
    addWordToList(word.value);
    
    localStorage.setItem('listAfrica', JSON.stringify(wordList));
    
    word.value = "";
    word.focus();
    number++;
});

function localList() {
    const itemLocalList = localStorage.getItem('listAfrica');
    
    if (itemLocalList) {
        wordList = JSON.parse(itemLocalList);
        
        wordList.forEach(word => {
            addWordToList(word);
        });
    }
}

deleteAll.addEventListener('click', (e) => {
    localStorage.clear();
    list.innerHTML = "";
    wordList = [];
});

localList();
