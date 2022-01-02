// Custom Element Template
class CustomEle extends HTMLElement {
    // 생성자 에서는 보통 해당 엘리먼트에 포함된 함수를 초기화 한다.
    constructor() {
        super();
    }
    // 커스텀 엘리먼트가 생성될때 실행된다.
    connectedCallback() {
        this.render();
    }
    // 해당요소가 새로운 문서로 이동 될 때마다 호출 된다.
    adoptCallback() {}
    // 요소의 속성이 추가, 제거, 업데이트, 교체되는 부분을 관찰하고 호출된다.
    // 이때 observedAttributes 속성에 나열된 특성에서만 호출된다.
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
    }
    //attributeChangedCallback 에서 관찰하는 항목을 리턴한다.
    static get observedAttributes() {
        return ['title'];
    }
    get title() {
        return this.getAttribute('title');
    }
    // custom element 가 제거될때 호출된다.
    disconnectedCallback() {
        alert('bye bye');
    }
    // custom method
    render() {
        this.innerHTML = ` <h1>${this.title}</h1> `;
    }
}
window.customElements.define('custom-ele', CustomEle);

// Day 1 - Expanding Cards
class ExpandingCards extends HTMLElement {
    // 생성자 에서는 보통 해당 엘리먼트에 포함된 함수를 초기화 한다.
    constructor() {
        super();
    }
    // 커스텀 엘리먼트가 생성될때 실행된다.
    connectedCallback() {
        this.render();
    }
    // 해당요소가 새로운 문서로 이동 될 때마다 호출 된다.
    adoptCallback() {}
    // 요소의 속성이 추가, 제거, 업데이트, 교체되는 부분을 관찰하고 호출된다.
    // 이때 observedAttributes 속성에 나열된 특성에서만 호출된다.
    attributeChangedCallback(attrName, oldVal, newVal) {
        this[attrName] = newVal;
    }
    //attributeChangedCallback 에서 관찰하는 항목을 리턴한다.
    static get observedAttributes() {
        return ['number'];
    }
    // custom element 가 제거될때 호출된다.
    disconnectedCallback() {
        alert('bye bye');
    }
    // custom method
    render() {
        const number = Number(this.number);
        const cards = [];
        const contents = [];
        for (let i = 0; i < number; i++) {
            const card = document.createElement('div');
            card.classList = i === 0 ? 'card acitve' : 'card';
            cards.push(card);

            const content = document.createElement('h3');
            contents.push(content);
            card.appendChild(content);
            this.appendChild(card);
        }

        this.cards = cards;
        this.contents = contents;
        this.setCardsEvent();
    }

    setCardsEvent() {
        this.cards.forEach((card) => {
            card.addEventListener('click', () => {
                this.removeActive();
                card.classList.add('active');
            });
        });
    }

    removeActive() {
        this.cards.forEach((card) => {
            card.classList.remove('active');
        });
    }

    setBackground(arr) {
        arr.forEach((url, idx) => {
            this.cards[idx].style.backgroundImage = `url(${url})`;
        });
    }

    setContent(arr) {
        arr.forEach((content, idx) => {
            this.contents[idx].innerHTML = content;
        });
    }
}
window.customElements.define('expanding-cards', ExpandingCards);

// Day 2 - Progress Steps
class ProgressSteps extends HTMLElement {
    // 생성자 에서는 보통 해당 엘리먼트에 포함된 함수를 초기화 한다.
    constructor() {
        super();
    }
    // 커스텀 엘리먼트가 생성될때 실행된다.
    connectedCallback() {
        this.render();
    }
    // 해당요소가 새로운 문서로 이동 될 때마다 호출 된다.
    adoptCallback() {}
    // 요소의 속성이 추가, 제거, 업데이트, 교체되는 부분을 관찰하고 호출된다.
    // 이때 observedAttributes 속성에 나열된 특성에서만 호출된다.
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'end') {
            this.end = Number(newVal) - 1;
        }
    }
    //attributeChangedCallback 에서 관찰하는 항목을 리턴한다.
    static get observedAttributes() {
        return ['end'];
    }
    // custom element 가 제거될때 호출된다.
    disconnectedCallback() {
        alert('bye bye');
    }
    // custom method
    render() {
        // progress container
        const progress = document.createElement('div');
        progress.classList = 'progress-container';

        // progressLine
        const progressLine = document.createElement('div');
        progressLine.classList = 'line';
        progress.appendChild(progressLine);

        // circles
        const circles = [];
        for (let i = 0; i <= this.end; i++) {
            const circle = document.createElement('div');
            circle.classList = i === 0 ? 'circle active' : 'circle';
            circle.innerHTML = i + 1;
            circles.push(circle);
            progress.appendChild(circle);
        }

        // buttons
        const buttons = document.createElement('div');
        buttons.classList = 'button-container';

        // prev
        const prev = document.createElement('button');
        prev.classList = 'prev';
        prev.innerHTML = 'Prev';
        prev.disabled = true;
        buttons.appendChild(prev);

        // next
        const next = document.createElement('button');
        next.classList = 'next';
        next.innerHTML = 'Next';
        buttons.appendChild(next);

        this.appendChild(progress);
        this.appendChild(buttons);

        // variables
        this.position = 0;
        this.progressLine = progressLine;
        this.circles = circles;
        this.buttons = buttons.children;

        this.setEvent();
    }

    setEvent() {
        for (let button of this.buttons) {
            const isPrev = button.classList.contains('prev');
            button.addEventListener('click', () => {
                if (isPrev) this.position--;
                if (!isPrev) this.position++;

                this.updateProgress();
                this.buttonsDisable(button, isPrev);
            });
        }
    }

    updateProgress() {
        let actives = 0;
        this.circles.forEach((circle, idx) => {
            if (idx <= this.position) {
                circle.classList.add('active');
                actives++;
            } else {
                circle.classList.remove('active');
            }
        });

        this.progressLine.style.width = ((actives - 1) / this.end) * 100 + '%';
    }

    buttonsDisable(button, isPrev) {
        if ((isPrev && this.position === 0) || (!isPrev && this.position === this.end)) {
            button.disabled = true;
        } else {
            for (let btn of this.buttons) {
                btn.disabled = false;
            }
        }
    }
}
window.customElements.define('progress-steps', ProgressSteps);

// Day 3 - Rotating Navigation
class RotatingNavigation extends HTMLElement {
    // 생성자 에서는 보통 해당 엘리먼트에 포함된 함수를 초기화 한다.
    constructor() {
        super();
    }
    // 커스텀 엘리먼트가 생성될때 실행된다.
    connectedCallback() {
        this.render();
    }
    // 해당요소가 새로운 문서로 이동 될 때마다 호출 된다.
    adoptCallback() {}
    // 요소의 속성이 추가, 제거, 업데이트, 교체되는 부분을 관찰하고 호출된다.
    // 이때 observedAttributes 속성에 나열된 특성에서만 호출된다.
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName !== 'title') this[attrName] = newVal;
    }
    //attributeChangedCallback 에서 관찰하는 항목을 리턴한다.
    static get observedAttributes() {
        return ['title', 'writer'];
    }
    // custom element 가 제거될때 호출된다.
    disconnectedCallback() {
        alert('bye bye');
    }
    // custom method
    render() {
        // innerText init
        const innerText = this.innerText;
        this.innerText = '';

        // content
        const content = document.createElement('div');
        content.classList = 'content';

        const circle = document.createElement('div');
        circle.classList = 'circle';

        for (let i = 0; i < 2; i++) {
            const button = document.createElement('button');
            const fontAwesome = document.createElement('i');
            switch (i) {
                case 0: {
                    button.classList = 'close';
                    fontAwesome.classList = 'fas fa-times';
                    button.addEventListener('click', () => content.classList.remove('show-nav'));
                    break;
                }
                case 1: {
                    button.classList = 'open';
                    fontAwesome.classList = 'fas fa-bars';
                    button.addEventListener('click', () => content.classList.add('show-nav'));
                    break;
                }
            }

            button.appendChild(fontAwesome);
            circle.appendChild(button);
        }
        content.appendChild(circle);

        // article
        const article = document.createElement('article');
        const h1 = document.createElement('h1');
        h1.innerHTML = this.title;
        article.appendChild(h1);

        const small = document.createElement('small');
        small.innerHTML = this.writer;
        article.appendChild(small);

        const p = document.createElement('p');
        p.innerHTML = innerText;
        article.appendChild(p);

        content.appendChild(article);

        this.appendChild(content);

        // nav
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');

        for (let i = 0; i < 3; i++) {
            const li = document.createElement('li');
            const fontAwesome = document.createElement('i');
            let text;
            switch (i) {
                case 0: {
                    fontAwesome.classList = 'fas fa-home';
                    text = document.createTextNode(' Home');
                    break;
                }
                case 1: {
                    fontAwesome.classList = 'fas fa-user-alt';
                    text = document.createTextNode(' About');
                    break;
                }
                case 2: {
                    fontAwesome.classList = 'fas fa-envelope';
                    text = document.createTextNode(' Contact');
                    break;
                }
            }

            li.appendChild(fontAwesome);
            li.appendChild(text);

            ul.appendChild(li);
        }
        nav.appendChild(ul);

        this.appendChild(nav);
    }
}
window.customElements.define('rotating-navigation', RotatingNavigation);
