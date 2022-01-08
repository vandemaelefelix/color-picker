
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

    changeColorButton.addEventListener('click', (e) => {
        const randomColor = getRandomColor(colors);
        console.log(randomColor.rgb)

        mainSection.style.backgroundColor = randomColor.color;
        changeColorButton.style.backgroundColor = randomColor.color
        changeColorButton.style.color = randomColor.color
        title.style.color = randomColor.color
        title.textContent = randomColor.name;
    });
    
    
    const followMouse = () => {
        //1. find distance X , distance Y
        var distX = mouse.x - circlePos.x;
        var distY = mouse.y - circlePos.y;
        
        //Progressive reduction of distance 
        circlePos.x += distX/5;
        circlePos.y += distY/5;

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
    
    // Mouse Effect
    const circle = document.querySelector('.outerCircle')
    const dot = document.querySelector('.innerCircle')
    
    let circlePos = {x:0, y:0};
    let dotPos = {x:0, y:0};

    setInterval(followMouse, 20);

    let mouse = {x:0, y:0};

    document.addEventListener('mousemove', getMouse)
}

window.addEventListener('DOMContentLoaded', () => {
    init();
});