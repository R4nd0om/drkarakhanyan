    function adjustPageScale() {
            const baseWidth = 1920; 
            const mbaseWidth = 440;
            const currentWidth = window.innerWidth;
            console.log("currentWidth: ", currentWidth);
            const body = document.body;
            let scale;
    
            if (currentWidth <= mbaseWidth) {
                scale = currentWidth / mbaseWidth;
            } else {
                scale = currentWidth / baseWidth;
            }
        
            scale = Math.round(scale * 100) / 100;
    
            const content = document.getElementById('wrapper');
    
            content.style.transform = `scale(${scale})`;
            content.style.transformOrigin = '0 0';
            body.style.height = `${content.scrollHeight * scale}px`;
    
        }
        
        window.addEventListener('resize', adjustPageScale);
        window.addEventListener('orientationchange', adjustPageScale);
        window.addEventListener('load', adjustPageScale);
    
        adjustPageScale();
    
            function isElementVisible(element, scale = 1) {
                const rect = element.getBoundingClientRect();
                const offset = 5;
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
                const scaledTop = (rect.top * scale) + offset;
                const scaledBottom = (rect.bottom * scale) + offset;
                const scaledLeft = rect.left * scale;
                const scaledRight = rect.right * scale;
        
                const isInViewport = (
                    scaledTop < windowHeight &&
                    scaledBottom > 0 &&
                    scaledLeft < windowWidth &&
                    scaledRight > 0
                );
    
                const isEmpty = element.children.length === 0 && !element.textContent.trim();
                const isZeroSize = rect.width === 0 && rect.height === 0;
    
                return isInViewport || (isEmpty && isInViewport) || (isZeroSize && isInViewport);
            }
        
            function handleScroll() {
              const allElements = document.querySelectorAll('body *');
    
                const baseWidth = 1920;
                const mbaseWidth = 440; 
            const currentWidth = window.innerWidth;
    
            let scale;
            if (currentWidth <= mbaseWidth) {
                scale = currentWidth / mbaseWidth; 
            } else {
                scale = currentWidth / baseWidth;
            }
            }
        
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);
        
            handleScroll();
            
document.body.style.overflowY = 'auto';
