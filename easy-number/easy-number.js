/**
 * Classe EasyNumber para adicionar botões de incremento e decremento a inputs numéricos.
 * 
 * Este plugin permite a inclusão de botões '+' e '-' ao lado de campos de entrada numéricos (`<input type="number">`).
 * Ele também remove as setas padrão dos inputs e adiciona funcionalidades de incremento e decremento com base nos atributos `min`, `max` e `step`.
 * 
 * @class EasyNumber
 */
class EasyNumber {
    /**
     * Cria uma instância da classe EasyNumber.
     * 
     * @param {HTMLInputElement} element - O elemento de input que será melhorado com os botões de incremento e decremento.
     */
    constructor(element) {
        // Verifica se o elemento já foi inicializado para evitar múltiplas instâncias
        if (element.classList.contains('easy-number-initialized')) return;

        this.element = element;
        this.init();
    }

    /**
     * Inicializa o plugin EasyNumber para o elemento.
     * 
     * - Adiciona os botões de incremento e decremento.
     * - Envolve o input com um wrapper para organizar os botões.
     * - Remove as setas padrão dos inputs numéricos.
     * - Adiciona os eventos de clique nos botões e eventos de entrada no input.
     */
    init() {
        // Marca o elemento como inicializado para evitar múltiplas instâncias
        this.element.classList.add('easy-number-initialized');

        // Cria os botões de incremento e decremento
        const decrementButton = document.createElement('button');
        decrementButton.className = 'decrement';
        decrementButton.innerText = '-';

        const incrementButton = document.createElement('button');
        incrementButton.className = 'increment';
        incrementButton.innerText = '+';

        // Cria um wrapper para envolver o input e os botões
        const wrapper = document.createElement('div');
        wrapper.className = 'easy-number-wrapper';

        // Adiciona o wrapper se ainda não existir
        if (!this.element.parentNode.classList.contains('easy-number-wrapper')) {
            this.element.parentNode.insertBefore(wrapper, this.element);
            wrapper.appendChild(decrementButton);
            wrapper.appendChild(this.element);
            wrapper.appendChild(incrementButton);
        } else {
            // Caso o wrapper já exista, apenas adiciona os botões
            this.element.parentNode.insertBefore(decrementButton, this.element);
            this.element.parentNode.insertBefore(incrementButton, this.element.nextSibling);
        }

        // Remove as setas padrão dos inputs
        this.element.style.webkitAppearance = 'none';
        this.element.style.mozAppearance = 'textfield';

        // Atualiza o estado dos botões
        this.updateButtonsState();

        // Adiciona eventos aos botões e ao input
        decrementButton.addEventListener('click', () => this.decrement());
        incrementButton.addEventListener('click', () => this.increment());
        this.element.addEventListener('input', () => this.updateButtonsState());
    }

    /**
     * Decrementa o valor do input com base no atributo `step`.
     * 
     * Atualiza o valor do input e o estado dos botões, desativando o botão de decremento se o valor atingir o mínimo.
     */
    decrement() {
        const step = parseFloat(this.element.step) || 1;
        const currentValue = this.getCurrentValue();
        const newValue = currentValue - step;
        const min = this.getMinValue();

        if (newValue >= min) {
            this.element.value = newValue;
            this.updateButtonsState();
        }
    }

    /**
     * Incrementa o valor do input com base no atributo `step`.
     * 
     * Atualiza o valor do input e o estado dos botões, desativando o botão de incremento se o valor atingir o máximo.
     */
    increment() {
        const step = parseFloat(this.element.step) || 1;
        const currentValue = this.getCurrentValue();
        const newValue = currentValue + step;
        const max = this.getMaxValue();

        if (newValue <= max) {
            this.element.value = newValue;
            this.updateButtonsState();
        }
    }

    /**
     * Atualiza o estado dos botões de incremento e decremento com base no valor atual do input.
     * 
     * Desativa o botão de decremento se o valor for menor ou igual ao mínimo e desativa o botão de incremento se o valor for maior ou igual ao máximo.
     */
    updateButtonsState() {
        const currentValue = this.getCurrentValue();
        const min = this.getMinValue();
        const max = this.getMaxValue();

        this.element.previousSibling.disabled = currentValue <= min;
        this.element.nextSibling.disabled = currentValue >= max;
    }

    /**
     * Obtém o valor atual do input, retornando 0 se o valor estiver vazio.
     * 
     * @returns {number} - O valor atual do input, ou 0 se o valor estiver vazio.
     */
    getCurrentValue() {
        const value = parseFloat(this.element.value);
        return isNaN(value) ? 0 : value;
    }

    /**
     * Obtém o valor mínimo permitido para o input.
     * 
     * @returns {number} - O valor mínimo permitido para o input.
     */
    getMinValue() {
        return this.element.min !== '' ? parseFloat(this.element.min) : -Infinity;
    }

    /**
     * Obtém o valor máximo permitido para o input.
     * 
     * @returns {number} - O valor máximo permitido para o input.
     */
    getMaxValue() {
        return this.element.max !== '' ? parseFloat(this.element.max) : Infinity;
    }

    /**
     * Inicializa o plugin EasyNumber para todos os inputs com a classe `easy-number`.
     */
    static initAll() {
        const elements = document.querySelectorAll('input.easy-number');
        elements.forEach(element => new EasyNumber(element));
    }
}
