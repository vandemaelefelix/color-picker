const init = () => {
    const colors = {
        'Light Carmine Pink': '#ED6572',
        'Middle Red': '#ED8C79',
        'Macaroni And Cheese': '#F6BF85',
        'Blond': '#FFF0BA',
        'Celadon': '#A8E3B3',
        'Maximum Blue Purple': '#B7ADED',
    }

    const mouse = new CustomCursor('body', {
        speed: 10,
        fade: true,
    });
    const parrallax1 = new Parrallax('.c-parrallax', {
        speed: 0.012,
        direction: 'invert',
    })

    const changeColorButton = document.querySelector('.c-button');
    const title = document.querySelector('.c-title');
    const hex = document.querySelector('.c-hex--text');
    const hexContainer = document.querySelector('.c-hex');
    const hexCopied = document.querySelector('.c-hex--copied');

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
        
        hexCopied.style.opacity = '1';
        setTimeout(() => {
            hexCopied.style.opacity = '0';
        }, 2000);
    }

    const changeColor = () => {
        let randomColor = getRandomColor(colors);
        let count = 0;
        while(randomColor.color == previousColor && count <= 5) {
            randomColor = getRandomColor(colors);
            count += 1;
        }
        previousColor = randomColor.color;

        let root = document.documentElement;
        root.style.setProperty('--main-color', randomColor.color);

        title.textContent = randomColor.name;
        hex.textContent = `${randomColor.color}`;
    }

    changeColor();
    
    changeColorButton.addEventListener('click', changeColor);
    hexContainer.addEventListener('click', handleCopyClick);

    let parrallaxActive = true;
    document.querySelector('.c-parrallax-button').addEventListener('click', () => {
        if (parrallaxActive) {
            parrallax1.removeParrallax();
            parrallaxActive = false;
        } else {
            parrallax1.setupParrallax();
            parrallaxActive = true;
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    init();
});