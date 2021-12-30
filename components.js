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
