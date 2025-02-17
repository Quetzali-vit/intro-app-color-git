document.addEventListener("DOMContentLoaded", function () {
    // Selección de elementos del DOM
    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");

    const redInput = document.getElementById("redInput");
    const greenInput = document.getElementById("greenInput");
    const blueInput = document.getElementById("blueInput");

    const colorBox = document.getElementById("colorBox");
    const hexCode = document.getElementById("hexCode");
    const colorPicker = document.getElementById("colorPicker");
    const copyBtn = document.getElementById("copyBtn");

    // Función para actualizar el color desde los sliders
    function updateColor() {
        let r = red.value;
        let g = green.value;
        let b = blue.value;
        let hex = rgbToHex(r, g, b);

        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexCode.textContent = hex;
        colorPicker.value = hex;

        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;
    }   

    // Función para actualizar sliders desde los inputs numéricos
    function updateSliders() {
        let r = validateInput(redInput.value);
        let g = validateInput(greenInput.value);
        let b = validateInput(blueInput.value);
        let hex = rgbToHex(r, g, b);

        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexCode.textContent = hex;
        colorPicker.value = hex;

        red.value = r;
        green.value = g;
        blue.value = b;
    }

    // Función para actualizar los valores desde el selector de color
    function updateFromColorPicker() {
        let hex = colorPicker.value;
        let rgb = hexToRgb(hex);

        red.value = rgb.r;
        green.value = rgb.g;
        blue.value = rgb.b;

        redInput.value = rgb.r;
        greenInput.value = rgb.g;
        blueInput.value = rgb.b;

        colorBox.style.backgroundColor = hex;
        hexCode.textContent = hex.toUpperCase();
    }

    // Conversión de valores RGB a HEX
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + +b).toString(16).slice(1).toUpperCase()}`;
    }

    // Conversión de valores HEX a RGB
    function hexToRgb(hex) {
        let bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    // Validación de entrada de números dentro del rango 0-255
    function validateInput(value) {
        let num = parseInt(value);
        return isNaN(num) ? 0 : Math.min(255, Math.max(0, num));
    }

    // Copiar código hexadecimal al portapapeles
    function copyToClipboard() {
        navigator.clipboard.writeText(hexCode.textContent)
            .then(() => alert("Código HEX copiado al portapapeles"))
            .catch(err => console.error("Error al copiar: ", err));
    }

    // Eventos de los sliders
    red.addEventListener("input", updateColor);
    green.addEventListener("input", updateColor);
    blue.addEventListener("input", updateColor);

    // Eventos de los inputs numéricos
    redInput.addEventListener("input", updateSliders);
    greenInput.addEventListener("input", updateSliders);
    blueInput.addEventListener("input", updateSliders);

    // Evento del selector de color
    colorPicker.addEventListener("input", updateFromColorPicker);
    
    // Evento del botón copiar
    copyBtn.addEventListener("click", copyToClipboard);

    // Inicializa el color al cargar la página
    updateColor();
});
