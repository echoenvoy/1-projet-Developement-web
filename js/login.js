const uname = document.querySelector('#uname');
const pass = document.querySelector('#pass');
const btn = document.querySelector('#login-btn');
const message = document.querySelector('#message');

function isValidInput() {
    return uname.value.trim() !== '' && pass.value.trim() !== '';
}

function shiftButton() {
    if (!isValidInput()) {
        const maxX = 200;
        const maxY = 100;

        const height = btn.offsetHeight;
        const width = btn.offsetWidth;

        let randomX, randomY;

        do {
            randomX = (Math.random() * maxX * 2) - maxX;
            randomY = (Math.random() * maxY * 2) - maxY;
        } while (randomX === height || randomY === width);

        btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
}


// Move button if fields are empty
btn.addEventListener('mouseenter', shiftButton);
btn.addEventListener('click', shiftButton);

// Enable login button if inputs are filled
uname.addEventListener('input', () => {
    if (isValidInput()) {
        btn.style.transform = 'translate(0, 0)';
        message.style.display = 'block';
    }
});

pass.addEventListener('input', () => {
    if (isValidInput()) {
        btn.style.transform = 'translate(0, 0)';
        message.style.display = 'block';
    }
});
