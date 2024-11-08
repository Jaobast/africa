const word = document.getElementById("word");
const submit = document.getElementById("submit");
const list = document.getElementById("list-words");
const deleteAll = document.getElementById("delete-all");

let wordList = [];
let number = 0;

// Função para adicionar o conteúdo da lista no DOM
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

// Função para carregar a lista do localStorage e mostrar no DOM
function localList() {
    const itemLocalList = localStorage.getItem('listAfrica');
    
    if (itemLocalList) {
        wordList = JSON.parse(itemLocalList);
        
        // Exibe cada item da lista no DOM
        wordList.forEach(word => {
            addWordToList(word);
        });
    }
}

deleteAll.addEventListener('click', (e) => {
    localStorage.clear();
    list.innerHTML = "";  // Também limpa a exibição atual na página
    wordList = [];        // Limpa a lista em memória
});

// Carrega a lista assim que a página é carregada
localList();
