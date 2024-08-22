/**
 * Classe EasyNumber
 * 
 * Adiciona botões de incremento e decremento aos inputs do tipo `number`, removendo as setas padrão do navegador e respeitando os atributos `min`, `max`, e `step`.
 */
class EasyNumber {
    /**
     * Cria uma instância da classe EasyNumber.
     * 
     * @param {HTMLElement} element - O elemento input do tipo number a ser transformado.
     */
    constructor(element) {
        this.element = element;
        this.init();
    }

    /**
     * Inicializa o plugin, cria a estrutura HTML e adiciona os eventos.
     */
    init() {
        // Criar os botões de incremento e decremento
        const decrementButton = document.createElement('button');
        decrementButton.className = 'decrement';
        decrementButton.innerText = '-';
        
        const incrementButton = document.createElement('button');
        incrementButton.className = 'increment';
        incrementButton.innerText = '+';

        // Envolver o input e adicionar os botões
        const wrapper = document.createElement('div');
        wrapper.className = 'easy-number-wrapper';
        this.element.parentNode.insertBefore(wrapper, this.element);
        wrapper.appendChild(decrementButton);
        wrapper.appendChild(this.element);
        wrapper.appendChild(incrementButton);

        // Remover setas padrão do input
        this.element.style.webkitAppearance = 'none';
        this.element.style.mozAppearance = 'textfield';

        // Atualizar o estado dos botões
        this.updateButtonsState();

        // Adicionar eventos aos botões
        decrementButton.addEventListener('click', () => this.decrement());
        incrementButton.addEventListener('click', () => this.increment());
        this.element.addEventListener('input', () => this.updateButtonsState());
    }

    /**
     * Decrementa o valor do input.
     */
    decrement() {
        const step = parseFloat(this.element.step) || 1;
        const newValue = parseFloat(this.element.value) - step;
        const min = this.element.min !== '' ? parseFloat(this.element.min) : -Infinity;

        if (newValue >= min) {
            this.element.value = newValue;
            this.updateButtonsState();
        }
    }

    /**
     * Incrementa o valor do input.
     */
    increment() {
        const step = parseFloat(this.element.step) || 1;
        const newValue = parseFloat(this.element.value) + step;
        const max = this.element.max !== '' ? parseFloat(this.element.max) : Infinity;

        if (newValue <= max) {
            this.element.value = newValue;
            this.updateButtonsState();
        }
    }

    /**
     * Atualiza o estado dos botões de incremento e decremento com base no valor atual do input.
     */
    updateButtonsState() {
        const value = parseFloat(this.element.value);
        const min = this.element.min !== '' ? parseFloat(this.element.min) : -Infinity;
        const max = this.element.max !== '' ? parseFloat(this.element.max) : Infinity;

        this.element.previousSibling.disabled = value <= min;
        this.element.nextSibling.disabled = value >= max;
    }

    /**
     * Inicializa o plugin em todos os inputs com a classe 'easy-number'.
     */
    static initAll() {
        const elements = document.querySelectorAll('input.easy-number');
        elements.forEach(element => new EasyNumber(element));
    }
}

// Inicializar automaticamente todos os inputs com a classe 'easy-number' após o DOM ser carregado
document.addEventListener('DOMContentLoaded', () => {
    EasyNumber.initAll();
});
