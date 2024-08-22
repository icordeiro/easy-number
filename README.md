# easy-number
O EasyNumber é um plugin JavaScript que adiciona botões de incremento e decremento a inputs do tipo number, removendo as setas padrão do navegador e respeitando os atributos min, max, e step. O plugin é fácil de integrar e personalizar, tornando a experiência de entrada de número mais intuitiva e estilizada.

## Tabela de Conteúdos

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Descrição

Este plugin transforma inputs do tipo `number` em controles mais amigáveis com botões para incrementar e decrementar valores. É projetado para ser fácil de integrar e estilizar, respeitando os atributos `min`, `max` e `step` do input.

## Instalação

Para instalar e usar o plugin, siga os passos abaixo:

1. **Incluir o CSS e JavaScript:**

   ```html
   <link rel="stylesheet" href="path/to/easy-number.css">
   <script src="path/to/easy-number.js"></script>

## Uso

1. **HTML**
Para criar um input com o plugin, adicione a classe easy-number ao seu elemento <input>:

```html
<input type="number" class="easy-number" min="1" max="10" step="1" value="5">
```html

2. **Javascript**

```html
<script>
   document.addEventListener('DOMContentLoaded', () => {
       EasyNumber.initAll();
   });
</script>
```html

## Contribuição
Se você gostaria de contribuir para este projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua modificação (git checkout -b feature/YourFeature).
3. Faça as mudanças e adicione um commit (git commit -am 'Add new feature').
4. Faça o push para a branch (git push origin feature/YourFeature).
5. Abra um pull request
