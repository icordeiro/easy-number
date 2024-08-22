/**
 * Classe EasyNumber
 * 
 * Adiciona botões de incremento e decremento aos inputs do tipo `number`, removendo as setas padrão do navegador e respeitando os atributos `min`, `max`, e `step`.
 * 
 * EasyNumber Class
 * 
 * Adds increment and decrement buttons to `number` type inputs, removing the default browser arrows and respecting the `min`, `max`, and `step` attributes.
 */
class EasyNumber {
    /**
     * Cria uma instância da classe EasyNumber.
     * 
     * @param {HTMLElement} element - O elemento input do tipo number a ser transformado.
     * @param {HTMLElement} element - The number type input element to be transformed.
     */
    constructor(element) {
        this.element = element;
        this.init();
    }

    /**
     * Inicializa o plugin, cria a estrutura HTML e adiciona os eventos.
     * 
     * Initializes the plugin, creates the HTML structure, and adds events.
     */
    init() {
        // Criar os botões de incremento e decremento
        // Create increment and decrement buttons
        const decrementButton = document.createElement('button');
        decrementButton.className = 'decrement';
        decrementButton.innerText = '-';
        
        const incrementButton = document.createElement('button');
        incrementButton.className = 'increment';
        incrementButton.innerText = '+';

        // Envolver o input e adicionar os botões
        // Wrap the input and add the buttons
        const wrapper = document.createElement('div');
        wrapper.className = 'easy-number-wrapper';
        this.element.parentNode.insertBefore(wrapper, this.element);
        wrapper.appendChild(decrementButton);
        wrapper.appendChild(this.element);
        wrapper.appendChild(incrementButton);

        // Remover setas padrão do input
        // Remove default input arrows
        this.element.style.webkitAppearance = 'none';
        this.element.style.mozAppearance = 'textfield';

        // Atualizar o estado dos botões
        // Update the state of the buttons
        this.updateButtonsState();

        // Adicionar eventos aos botões
        // Add events to the buttons
        decrementButton.addEventListener('click', () => this.decrement());
        incrementButton.addEventListener('click', () => this.increment());
        this.element.addEventListener('input', () => this.updateButtonsState());
    }

    /**
     * Decrementa o valor do input.
     * 
     * Decrements the input value.
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
     * 
     * Increments the input value.
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
     * 
     * Updates the state of the increment and decrement buttons based on the current input value.
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
     * 
     * Initializes the plugin on all inputs with the 'easy-number' class.
     */
    static initAll() {
        const elements = document.querySelectorAll('input.easy-number');
        elements.forEach(element => new EasyNumber(element));
    }
}

// Inicializar automaticamente todos os inputs com a classe 'easy-number' após o DOM ser carregado
// Automatically initialize all inputs with the 'easy-number' class after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    EasyNumber.initAll();
});
