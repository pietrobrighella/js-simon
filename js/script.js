/*
[1] Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
[2] Dopo 5 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite una casella di input e un bottone
[3] Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
*/

// creo una variabile che imposta il numero dei numeri randomici
let numeroDiNumeri = 5;

// imposto una variabile con un array vuoto che andremo a riempire con i numeri randomici
let numeri = [];

// riempio questo array con i numeri inseriti dall'utente per verificare quanti numeri ha indovinato
let numeriInseriti = [];

// genero i numeri randomici da 1 a numeriDiNumeri con la funzione in libreria e li pusho nell'array
while(numeri.length < numeroDiNumeri){
    let numero = randomNumber(10, 99);
    if(!numeri.includes(numero)){
        numeri.push(numero);
        stampaNumeri(numero);
    }
}

console.log(numeriInseriti, ' ', numeri)

/***** FUNZIONI *****/
function stampaNumeri(numero){
    const numeriGiocoHtml = document.getElementById('numeri-gioco');
    const cella = document.createElement('div');
    cella.classList.add('number-box');
    numeriGiocoHtml.appendChild(cella);
    cella.innerHTML = numero;
    setTimeout(creaAreaGioco, 5000);
}

function creaAreaGioco(){
    const campoGioco = document.getElementById('numeri-gioco');
    campoGioco.innerHTML = `
        <section id="game" class="d-flex flex-column">
            <div id="input-numeri">
                <input type="number" id="numero1" class="campo-input form-control-lg" min="1" max="99">
                <input type="number" id="numero2" class="campo-input form-control-lg" min="1" max="99">
                <input type="number" id="numero3" class="campo-input form-control-lg" min="1" max="99">
                <input type="number" id="numero4" class="campo-input form-control-lg" min="1" max="99">
                <input type="number" id="numero5" class="campo-input form-control-lg" min="1" max="99">
            </div>
            <button id="start-game" class="btn btn-primary btn-lg mt-4">Verifica i tuoi numeri</button>
        </section>
    `   
    const startGame = document.getElementById('start-game');
    startGame.addEventListener('click', inputNumeri);
    startGame.addEventListener('click', risultato);
}

function inputNumeri(){
    const inputHtml1 = document.getElementById('numero1');
    const inputHtml2 = document.getElementById('numero2');
    const inputHtml3 = document.getElementById('numero3');
    const inputHtml4 = document.getElementById('numero4');
    const inputHtml5 = document.getElementById('numero5');

    numeriInseriti.push(parseInt(inputHtml1.value));
    numeriInseriti.push(parseInt(inputHtml2.value));
    numeriInseriti.push(parseInt(inputHtml3.value));
    numeriInseriti.push(parseInt(inputHtml4.value));
    numeriInseriti.push(parseInt(inputHtml5.value));

    //console.log(numeriInseriti);
}

function risultato(){
    const gameHtml = document.getElementById('game');
    const divRisultato = document.createElement('div');
    divRisultato.classList.add('alert');
    gameHtml.prepend(divRisultato);

    score = 0;
    numeriInclusi = [];
    for(let i = 0; i < numeri.length; i++) {
        if(numeri.includes(numeriInseriti[i])){
            numeriInclusi.push(numeriInseriti[i]);
            score += 10;
        }
    } 

    console.log(numeriInclusi);

    if (score <= 20){
        divRisultato.classList.add('alert-danger');
        divRisultato.innerText = `Hai ricordato ${numeriInclusi.length} numeri, eccoli: ${numeriInclusi}
        Il tuo punteggio è di ${score} ... sì proprio nà chiavica!`;
    } else if (score > 20 && score < 50){
        divRisultato.classList.add('alert-warning');
        divRisultato.innerText = `Hai ricordato ${numeriInclusi.length} numeri, eccoli: ${numeriInclusi}
        Il tuo punteggio è di ${score} ... 'mpegnati n'anzì!`;
    } else {
        divRisultato.classList.add('alert-success');
        divRisultato.innerText = `Hai ricordato ${numeriInclusi.length} numeri, eccoli: ${numeriInclusi}
        Il tuo punteggio è di ${score} ... freé mandrake!`;
    }

    // const removeButton = document.getElementById('start-game');
    // removeButton.remove();
    const buttonRestart = document.getElementById('start-game');
    buttonRestart.classList.remove('btn-primary');
    buttonRestart.classList.add('btn-warning');
    buttonRestart.innerText = 'Prova di nuovo';
    buttonRestart.removeEventListener('click', inputNumeri);
    buttonRestart.removeEventListener('click', risultato);
    buttonRestart.addEventListener('click', () => location.reload());
}