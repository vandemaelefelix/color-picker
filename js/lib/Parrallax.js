class Parrallax {
    constructor (className = 'parrallax', options = {speed, direction}) {
        this.className = className;
        this.options = options;

        this.setupParrallax();
    }

    isTouchDevice () {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) || 
            (navigator.msMaxTouchPoints > 0));
    }

    handleEffect (e) {
        let event;
        if (e.type == 'touchmove' || e.type == 'touchdown') {
            event = e.changedTouches[0]; 
        } else {
            event = e;
        }

        const items = document.querySelectorAll(this.className);
        items.forEach((item, index) => {            
            let speed;
            if (item.hasAttribute('data-speed')) {
                speed = item.getAttribute('data-speed');
            } else {
                speed = 1;
            }

            if (speed > 0) {
                item.style.transition = 'none';
                const scale = this.options.speed;
                
                let x = null,
                    y = null;
                
                x = (window.innerWidth - event.pageX * speed) * scale;
                y = (window.innerHeight - event.pageY * speed) * scale;
                
                if (this.options.direction === 'normal') {
                    item.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
                } else if (this.options.direction === 'invert') {
                    item.style.transform = `translateX(${x}px) translateY(${y}px)`;
                }
            }

        });
    }

    setupParrallax () {
        this.eventHandler = this.handleEffect.bind(this);

        document.addEventListener('mousemove', this.eventHandler);
        
        if (this.isTouchDevice()) {
            document.addEventListener('touchmove', this.eventHandler);
        }
    }

    removeParrallax () {
        console.log('Removing parrallax')

        const items = document.querySelectorAll(this.className);
        items.forEach((item, index) => {
            item.style.transition = 'transform .3s ease';
            item.style.transform = `translate(0)`;
        });

        document.removeEventListener('mousemove', this.eventHandler);
        if (this.isTouchDevice()) {
            document.removeEventListener('touchmove', this.eventHandler);
        }
    }
}