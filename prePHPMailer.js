const button = document.querySelector(".button-add-new");
const pBeforeButton = document.querySelector(".button-add-new-p");
const buttonSend = document.querySelector('#submit');
const inputName = document.querySelector('.input-name')
const inputEmail = document.querySelector('.wpcf7-email')
const inputTel = document.querySelector('.wpcf7-tel')
const firstLinkInput = document.querySelector('.first-input-link')

let nameLength = 0
let emailLength = 0
let firstLinkLength = 0

let count = 1;
let lastInput = 0;
let textArray = [];
let colorArray = [];
let sizeArray = [];
let articleArray = [];
let text = [];


inputName.addEventListener('input', (event) => {
    nameLength = event.target.value.length
    isSubmitReady()
})

inputEmail.addEventListener('input', (event) => {
    emailLength = event.target.value.length
    isSubmitReady()
})

firstLinkInput.addEventListener('input', (event) => {
    firstLinkLength = event.target.value.length
    isSubmitReady()
})

function isSubmitReady() {
    if (nameLength > 2
        && emailLength > 6
        && firstLinkLength > 10
        && inputEmail.value.split('').includes('@')
        && firstLinkInput.value.split('//')[0].includes('https:')
    ) {
        buttonSend.removeAttribute('disabled')
    } else {
        buttonSend.setAttribute('disabled', 'true')
    }
}



button.addEventListener("click", () => {
    count++;
    const newElementPartOne = document.createElement("p");
    const newElementPartTwo = document.createElement("div");
    newElementPartTwo.setAttribute("class", `color-size-article`);

    newElementPartOne.innerHTML = `<label> 
                                <br>
                                <span class="wpcf7-form-control-wrap" 
                                data-name="your-message">
                                    <br>
                                    <input cols="40" 
                                    rows="1" 
                                    class="wpcf7-form-control wpcf7-text text mt20" 
                                    aria-invalid="false" 
                                    placeholder="https://someshop.com" 
                                    type="text"
                                    name="text" >
                                    <br>
                                </span> 
                                <br>
                            </label>`

    newElementPartTwo.innerHTML = `
                                <p><label> 
                                    <span class="wpcf7-form-control-wrap" 
                                    data-name="text-508">
                                        <input size="40" 
                                        class="wpcf7-form-control wpcf7-text color" 
                                        aria-invalid="false" 
                                        placeholder="Цвет" 
                                        value="" 
                                        type="text" 
                                        name="color">
                                    </span> 
                                </label></p>
                                <p><label> 
                                    <span class="wpcf7-form-control-wrap" 
                                    data-name="text-703">
                                        <input size="40" 
                                        class="wpcf7-form-control wpcf7-text size" 
                                        aria-invalid="false" 
                                        placeholder="Размер" 
                                        value="" 
                                        type="text" 
                                        name="size">
                                    </span> 
                                </label></p>
                                <p><label> 
                                    <span class="wpcf7-form-control-wrap" 
                                    data-name="text-950">
                                        <input size="40" 
                                        class="wpcf7-form-control wpcf7-text article" 
                                        aria-invalid="false" 
                                        placeholder="Артикул" 
                                        value="" 
                                        type="text" 
                                        name="article">
                                    </span> 
                                </label></p>
                            `;
    pBeforeButton.before(newElementPartOne);
    pBeforeButton.before(newElementPartTwo);
});


buttonSend.addEventListener('click', (event) => {
    textArray = document.querySelectorAll('.text');
    colorArray = document.querySelectorAll('.color')
    sizeArray = document.querySelectorAll('.size')
    articleArray = document.querySelectorAll('.article')

    for (let i = 0; i < textArray.length; i++) {
        textArray[i].style.color = '#ececec'
        text.push(`${i + 1}. ` + textArray[i].value
            + '<br />Color: ' + colorArray[i].value + ' / '
            + ' Size: ' + sizeArray[i].value + ' / '
            + ' Article: ' + articleArray[i].value);
    }

    lastInput = document.querySelectorAll('.text');
    lastInput[lastInput.length - 1].value = text.join(`<br /><br />`);

    setTimeout(() => {
        for (let i = 0; i < textArray.length; i++) {
            textArray[i].value = '';
            textArray[i].style.color = '#ccc';
            colorArray[i].value = '';
            colorArray[i].style.color = '#ccc';
            sizeArray[i].value = '';
            sizeArray[i].style.color = '#ccc';
            articleArray[i].value = '';
            articleArray[i].style.color = '#ccc';
        };
        inputName.value = '';
        inputEmail.value = '';
        inputTel.value = '';
    }, 500)

    setTimeout(() => {
        // window.location.replace("/պատվեր/");
    }, 3000)
})










