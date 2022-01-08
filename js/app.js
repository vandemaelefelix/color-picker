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

    const circle = document.querySelector('.outerCircle');
    const dot = document.querySelector('.innerCircle');
    
    let circlePos = {x:0, y:0};
    let dotPos = {x:0, y:0};
    let mouse = {x:0, y:0};

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
    
    const handleClickDown = (e) => {    
        dot.style.transform = `scale(2) translate(-25%, -25%)`
        circle.style.backgroundColor = 'transparent'
        circle.style.border = '2px solid #fff'
    }
    
    const handleClickUp = (e) => {    
        dot.style.transform = 'scale(1) translate(-50%, -50%)'
        circle.style.backgroundColor = '#fff'
        circle.style.border = 'none'
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
    
    const followMouse = () => {
        //1. find distance X , distance Y
        var distX = mouse.x - circlePos.x;
        var distY = mouse.y - circlePos.y;
        
        //Progressive reduction of distance 
        circlePos.x += distX/6;
        circlePos.y += distY/6;

        dotPos.x += mouse.x - dotPos.x
        dotPos.y += mouse.y - dotPos.y
        
        circle.style.left = circlePos.x + "px";
        circle.style.top = circlePos.y + "px";    

        dot.style.left = dotPos.x + "px";
        dot.style.top = dotPos.y + "px";    
    }
    
    const getMouse = (e) => {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }

    setInterval(followMouse, 20);

    changeColor();
    document.addEventListener('mousemove', getMouse);
    document.addEventListener('mousedown', handleClickDown);
    document.addEventListener('mouseup', handleClickUp);
    changeColorButton.addEventListener('click', changeColor);
    hexContainer.addEventListener('click', handleCopyClick);
}

window.addEventListener('DOMContentLoaded', () => {
    init();
});