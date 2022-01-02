const open = document.querySelector('.open');
const close = document.querySelector('.close');
const content = document.querySelector('.content');

open.addEventListener('click', () => {
    content.classList.add('show-nav');
});

close.addEventListener('click', () => {
    content.classList.remove('show-nav');
});
