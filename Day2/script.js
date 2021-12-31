const progressLine = document.querySelector('.container .progress-container .line');
const progressCircles = document.querySelectorAll('.container .progress-container .circle');
const buttonPrev = document.querySelector('.container .button-container .prev');
const buttonNext = document.querySelector('.container .button-container .next');

const endPosition = progressCircles.length - 1;
const startPosition = 0;

let currentPosition = startPosition;

buttonNext.addEventListener('click', () => {
    if (currentPosition === endPosition) return;

    currentPosition++;
    update();
});

buttonPrev.addEventListener('click', () => {
    if (currentPosition === startPosition) return;

    currentPosition--;
    update();
});

function update() {
    progressCircles.forEach((circle, idx) => {
        if (idx <= currentPosition) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.container .progress-container .circle.active');

    progressLine.style.width = ((actives.length - 1) / endPosition) * 100 + '%';

    if (currentPosition === startPosition) {
        buttonPrev.disabled = true;
    } else if (currentPosition === endPosition) {
        buttonNext.disabled = true;
    } else {
        buttonPrev.disabled = false;
        buttonNext.disabled = false;
    }
}
