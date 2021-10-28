let quote = document.getElementsByTagName('p')[0];
let timer = document.getElementsByTagName('p')[1];
let input = document.getElementsByTagName('input')[0];
let button = document.getElementsByTagName('input')[1];
let running = false;

button.addEventListener('click', () => this.startGame());

function startTimer(content) {
    quote.textContent = `Quote: ${content}`
    input.value = '';
    let i = 1;
    const interval = setInterval(() => {
        timer.textContent = `Timer: ${i++}s`;
        // Bug: O timer para quando exibe 3s ao invés de 5s, provavel que o DOM demora pra atualizar
        if(i == 5) {
            clearInterval(interval);
            this.validateInput(content);
        }
    }, 1000);
}

function validateInput(content) {
    let { value } = input;

    if(value == content) {
        alert('You did it!');
    } else {
        alert(`You've lost :(`);
    }

    button.disabled = false;
    running = false;
}

function startGame() {
    if(!running) {
        running = true;
        button.disabled = true;
        fetch('https://api.quotable.io/random', { method: 'GET' })
        .then(data => data.json())
        .then(data => startTimer(data.content));
    }
}