// genera numeri random
function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// verifica numero pari o dispari
function isEven(num){
    if(num % 2 === 0){
        return true;
    } else {
        return false;
    }
}

// crea messaggio errore
function notificationError(msgError){
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger';
    alerta.innerHTML = msgError;
    return alerta;
}