let AllPhraseArray = [];
let arrayPhase1 = [];

let arrayPhase1Right = [];
let arrayPhase1Discard = [];

const start = document.getElementById('start');
const phaseContainer = document.querySelector('.phase-container');
const gameContainer = document.querySelector('.game-container');
const sentence = document.querySelector('.sentence');
const rightBttn = document.getElementById('right');
const discardBttn = document.getElementById('discard');
const nextGroup = document.querySelector('.next-group-container');
const nextGroupStart = document.getElementById('next-group-bttn');

const still = document.querySelector('.still');


let nummer = 0;



start.addEventListener('click', () => {
    AllPhraseArray = phraseArray.reduce((allPhrases, person) => {
        return allPhrases.concat(person.phrases);
    }, []);

    phaseContainer.classList.remove('hidden');
    containerGroup.classList.add('hidden');
});

const phase1 = document.getElementById('phase1');
const phase2 = document.getElementById('phase2');
const phase3 = document.getElementById('phase3');







function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function startRound(remove, add) {
    arrayPhase1 = shuffleArray([...AllPhraseArray]);
    console.log("AllPhraseArrayPhase1 (shuffled):", arrayPhase1);

    remove.classList.remove('hidden');
    add.classList.add('hidden');

    sentence.innerHTML = arrayPhase1[nummer];

    // Criar o temporizador
    timer = setTimeout(() => {
        let restArray = AllPhraseArray.length - arrayPhase1Right.length;

        if (restArray > 1) {
            still.innerHTML = 'still ' + restArray + ' words';
        } else {
            still.innerHTML = 'still ' + restArray + ' word';
        }

        // Transição para o próximo grupo, caso ainda haja palavras
        if (arrayPhase1.length > 0) {
            nextGroup.classList.remove('hidden');
            gameContainer.classList.add('hidden');
        }
    }, 20000);
}



phase1.addEventListener('click', () => startRound(gameContainer, phaseContainer));


rightBttn.addEventListener('click', () => {
    if (nummer < arrayPhase1.length - 1) {
        arrayPhase1Right.push(arrayPhase1[nummer]);
        console.log('right', arrayPhase1Right);

        nummer++;
        sentence.innerHTML = arrayPhase1[nummer];
    } else {
        // Se for a última palavra, só mostra o phaseContainer e esconde o gameContainer
        arrayPhase1Right.push(arrayPhase1[nummer]); // Adiciona a última palavra ao array
        console.log('right', arrayPhase1Right);

        clearTimeout(timer); // Cancela o temporizador para garantir que o próximo grupo não será mostrado

        // Finaliza o jogo
        gameContainer.classList.add('hidden');
        nextGroup.classList.add('hidden');
        phaseContainer.classList.remove('hidden');
        still.innerHTML = 'Game Over! Thank you for playing.'; // Mensagem de conclusão
    }
});


discardBttn.addEventListener('click', () => {
    if( nummer < arrayPhase1.length - 1){
        arrayPhase1Discard.push(arrayPhase1[nummer]);
        console.log('discard' + arrayPhase1Discard);


        nummer ++

        sentence.innerHTML = arrayPhase1[nummer];
    }

})



nextGroupStart.addEventListener('click', () => {
    nummer = 0;

    AllPhraseArray = AllPhraseArray.filter(item => !arrayPhase1Right.includes(item));
    console.log("Updated AllPhraseArray:", AllPhraseArray);

    arrayPhase1Right = [];
    startRound(gameContainer, nextGroup);
});