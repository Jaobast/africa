
let AllPhraseArray = [];

const start = document.getElementById('start');

start.addEventListener('click', () => {
    AllPhraseArray = phraseArray.reduce((allPhrases, person) => {
        return allPhrases.concat(person.phrases);
    }, []);

    console.log("AllPhraseArray:", AllPhraseArray);
});