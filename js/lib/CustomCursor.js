const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class CustomCursor {
    constructor (parent, options = {speed, fade}) {
        if (parent === 'body') {
            this.parentElement = document.body;
        } else {
            this.parentElement = document.querySelector(parent);
        }
        this.speed = options.speed;
        this.circlePos = { x: 0, y: 0};
        this.dotPos = { x: 0, y: 0 };
        this.mousePos = { x: 0, y: 0 };
        this.dot;
        this.circle;
        this.isMoving = false;
        this.fade = options.fade;
        this.createMouse();
    }

    handleClickDown (e) {    
        this.dot.style.transform = `scale(2) translate(-25%, -25%)`
        this.circle.style.backgroundColor = 'transparent'
        this.circle.style.border = '2px solid #fff'
    }
    
    handleClickUp (e) {    
        this.dot.style.transform = 'scale(1) translate(-50%, -50%)'
        this.circle.style.backgroundColor = '#fff'
        this.circle.style.border = 'none'
    }

    followMouse () {
        //1. find distance X , distance Y
        let distX = this.mousePos.x - this.circlePos.x;
        let distY = this.mousePos.y - this.circlePos.y;
        
        //Progressive reduction of distance 
        this.circlePos.x += distX / this.speed;
        this.circlePos.y += distY / this.speed;

        this.dotPos.x += this.mousePos.x - this.dotPos.x
        this.dotPos.y += this.mousePos.y - this.dotPos.y
        
        this.circle.style.left = this.circlePos.x + "px";
        this.circle.style.top = this.circlePos.y + "px";    

        this.dot.style.left = this.dotPos.x + "px";
        this.dot.style.top = this.dotPos.y + "px";    

        requestAnimationFrame(() => this.followMouse())
    }

    fadeOutMouse () {
        this.dot.style.opacity = '0';
        this.dot.style.transform = 'scale(0) translate(-50%, -50%)';
        this.circle.style.opacity = '0';
        this.circle.style.transform = 'scale(0) translate(-50%, -50%)';
    }
    fadeInMouse () {
        this.dot.style.opacity = '1';
        this.dot.style.transform = 'scale(1) translate(-50%, -50%)';
        this.circle.style.opacity = '1';
        this.circle.style.transform = 'scale(1) translate(-50%, -50%)';
    }

    getMouse (e) {
        if (this.fade) {
            if (!this.isMoving) {
                this.isMoving = true;
                this.fadeInMouse();
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.fadeOutMouse();
                this.isMoving = false;
            }, 2000);
        }

        if (e.type == 'touchmove' || e.type == 'touchdown') {
            this.handleClickUp();
            e.preventDefault();
            const touch = e.changedTouches[0]
            this.mousePos.x = touch.pageX;
            this.mousePos.y = touch.pageY;
        } else {
            this.mousePos.x = e.pageX;
            this.mousePos.y = e.pageY;
        }
    }

    createMouse () {
        if (this.parentElement !== null) {
            const innerCircle = document.createElement('span');
            const outerCircle = document.createElement('span');
    
            innerCircle.setAttribute('class', 'innerCircle');
            outerCircle.setAttribute('class', 'outerCircle');
    
            this.dot = this.parentElement.appendChild(innerCircle);
            this.circle = this.parentElement.appendChild(outerCircle);
        }

        this.followMouse();
        // setInterval(() => {this.followMouse()}, 20);

        this.parentElement.addEventListener('touchmove', (e) => this.getMouse(e));
        this.parentElement.addEventListener('mousemove', (e) => this.getMouse(e));
        this.parentElement.addEventListener('touchend', (e) => this.handleClickUp(e));
        this.parentElement.addEventListener('pointerdown', (e) => this.handleClickDown(e));
        this.parentElement.addEventListener('pointerup', (e) => this.handleClickUp(e));
    }
}