const init = () => {
    const colors = {
        'Light Carmine Pink': '#ED6572',
        'Middle Red': '#ED8C79',
        'Macaroni And Cheese': '#F6BF85',
        'Blond': '#FFF0BA',
        'Celadon': '#A8E3B3',
        'Maximum Blue Purple': '#B7ADED',
    }

    const changeColorButton = document.querySelector('.c-button');
    const mainSection = document.querySelector('.c-main');
    const title = document.querySelector('.c-title');
    const hex = document.querySelector('.c-hex--text');
    const hexContainer = document.querySelector('.c-hex');
    const hexIcon = document.querySelector('.c-hex--icon');
    const hexCopied = document.querySelector('.c-hex--copied');
    const hexCopiedIcon = document.querySelector('.c-hex--copied__icon');

    let previousColor = '';

    const getRandomColor = (obj) => {
        const keys = Object.keys(obj);
        const prop = keys[Math.floor(Math.random() * keys.length)];
        return {name: prop, color: obj[prop], rgb: hexToRgb(obj[prop])};
    }
    
    const hexToRgb = (hex) => {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
      
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(hex.textContent);
        
        hexCopied.style.opacity = '1'
        setTimeout(() => {
            hexCopied.style.opacity = '0'
        }, 2000)
    }

    const changeColor = () => {
        let randomColor = getRandomColor(colors);
        let count = 0
        while(randomColor.color == previousColor && count <= 5) {
            randomColor = getRandomColor(colors);
            count += 1;
        }
        previousColor = randomColor.color

        mainSection.style.backgroundColor = randomColor.color;
        changeColorButton.style.backgroundColor = randomColor.color
        changeColorButton.style.color = randomColor.color

        title.style.color = randomColor.color
        title.textContent = randomColor.name;

        hexContainer.style.backgroundColor = randomColor.color
        hexIcon.style.fill = randomColor.color
        
        hexCopied.style.backgroundColor = randomColor.color
        hexCopied.style.color = randomColor.color
        hexCopiedIcon.style.stroke = randomColor.color

        hex.style.color = randomColor.color
        hex.textContent = `${randomColor.color}`
    }

    changeColor();
    
    changeColorButton.addEventListener('click', changeColor);
    hexContainer.addEventListener('click', handleCopyClick);
}

window.addEventListener('DOMContentLoaded', () => {
    const mouse = new CustomCursor({parent: '.c-main', speed: 10});

    init();
});