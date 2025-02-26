jQuery(document).ready(function($){
    function smoothScroll(target, duration) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
    
      const windowHeight = window.innerHeight;
      const targetHeight = target.offsetHeight;
      const middleOffset = (windowHeight / 2) - (targetHeight / 2);
      const adjustedPosition = targetPosition - middleOffset;
      let startTime = null;
    
      function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, adjustedPosition - startPosition, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
      }
    
      function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
      }
    
      requestAnimationFrame(animation);
    }
    
    function addSmoothScrollListeners(buttonClass, targetClass, duration) {
      const buttons = document.querySelectorAll(buttonClass);
      const target = document.getElementById(targetClass);
    
      if (target) {
          buttons.forEach(button => {
              button.addEventListener('click', (event) => {
                  smoothScroll(target, duration);
              });
          });
      } else {
        console.warn(`Target with ID ${targetClass} not found`);
      }
    }
    
    if (window.innerWidth <= 440) {
      addSmoothScrollListeners('.main', 'html', 100); 
      addSmoothScrollListeners('#WIa', 'reasons', 100); 
      addSmoothScrollListeners('.about', 'bio-text', 100); 
      addSmoothScrollListeners('.prices', 'services', 100);  
      addSmoothScrollListeners('.reviews', 'carousels', 100);
      addSmoothScrollListeners('.clinic', 'medicine-description2', 100);
      addSmoothScrollListeners('.contacts', 'formF', 100);
      addSmoothScrollListeners('#singup', 'formF', 100);
    } else {
      addSmoothScrollListeners('.main', 'html', 100); 
      addSmoothScrollListeners('#WIa', 'SixFrame', 100); 
      addSmoothScrollListeners('.about', 'ScndFrame', 100); 
      addSmoothScrollListeners('.prices', 'ThrdFrame', 100);  
      addSmoothScrollListeners('.reviews', 'FourFrame', 100);
      addSmoothScrollListeners('.clinic', 'FiveFrame', 100);
      addSmoothScrollListeners('.contacts', 'SevenFrame', 100);
      addSmoothScrollListeners('#singup', 'SevenFrame', 100);
    }
    
    
        $('.carousel-1').owlCarousel({
            center: true,
            loop:true,
            stagePadding: 0,
            nav:true,
            dots: false,
            navText: ['&lsaquo;', '&rsaquo;'],
            autoWidth: false,
            autoHeight: false,
            items: 3,
        });
    
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
            const header = document.getElementById('header');
            const popups = document.querySelectorAll('.popup');
            const popWrappers = document.querySelectorAll('.popWrapper');
    
            content.style.transform = `scale(${scale})`;
            content.style.transformOrigin = '0 0';
            header.style.transform = `scale(${scale})`;
            header.style.transformOrigin = '0 0';
            body.style.height = `${content.scrollHeight * scale}px`;
            popups.forEach((popup) => {
                const popupContent = popup.querySelector('.popupContent');
                if (popupContent) {
                  popupContent.style.transform = `scale(${scale})`;
                  popupContent.style.transformOrigin = '0 0';
                }
            });
            popWrappers.forEach((popWrapper) => {
                popWrapper.style.transform = `scale(${scale})`;
                popWrapper.style.transformOrigin = ('0 0');
            });
    
        }
        
        window.addEventListener('resize', adjustPageScale);
        window.addEventListener('orientationchange', adjustPageScale);
        window.addEventListener('load', adjustPageScale);
    
        adjustPageScale();
    
        document.addEventListener('click', (event) => {
            if (event.target.hasAttribute('data-modal')) {
              const modalId = event.target.getAttribute('data-modal');
              const modal = document.getElementById(modalId);
              if (modal) {
                modal.style.display = 'flex';
                document.body.classList.add('no-scroll');
                setTimeout(() => modal.classList.add('visible'), 10);
              }
            }
    
            if (event.target.hasAttribute('data-close') || event.target.hasAttribute('data-backdrop')) {
              const modal = event.target.closest('.popup');
              if (modal) {
                modal.classList.remove('visible');
                document.body.classList.remove('no-scroll');
                setTimeout(() => (modal.style.display = 'none'), 300);
              }
            }
          });
          
          window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
              const visibleModal = document.querySelector('.popup.visible');
              if (visibleModal) {
                visibleModal.classList.remove('visible');
                document.body.classList.remove('no-scroll');
                setTimeout(() => (visibleModal.style.display = 'none'), 300);
              }
            }
          });
        
          const counterElement = document.getElementById('animated-counter');
          const numberElement = document.getElementById('number');
          const targetNumber = 500;
          let currentNumber = 0;
          const duration = 3000; 
          const increment = targetNumber / (duration / 16); 
      
          let animationStarted = false;
      
          function startAnimation() {
              if (animationStarted) return;
              animationStarted = true;
      
              function updateNumber() {
                  if (currentNumber < targetNumber) {
                      currentNumber += increment;
                      numberElement.textContent = Math.round(currentNumber);
                      requestAnimationFrame(updateNumber);
                  } else {
                      numberElement.textContent = targetNumber;
                  }
              }
      
              updateNumber();
          }
      
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      startAnimation();
                      observer.unobserve(counterElement);
                  }
              });
          }, {
              threshold: 1 
          });
      
          observer.observe(counterElement);
    
          document.getElementById('btnFD').addEventListener('click', function() {
            window.location.href = 'https://www.instagram.com/dr.ikarakhanyan?igsh=MXMybXVqaGpndTc0bg==';
        });
    
          const menuBtn = document.getElementById('menuBtn');
          const menuBar = document.getElementById('menuBar');
          const headers = document.querySelectorAll('.Header:not(.social)');
          const socialL = document.getElementById('socialLinks');
          const social = document.querySelectorAll('.social');
          const headd = document.getElementById('header');
          let isOpen = false;
    
          function moveElements() {
            if (window.innerWidth <= 440) {
    
                headers.forEach(header => {
                    if (!menuBar.contains(header)) {
                        menuBar.appendChild(header);
                    }
                });
        
                // Перемещение социальных ссылок в socialLinks
                social.forEach(socLink => {
                    if (!socialL.contains(socLink)) { // Проверяем, что элемент еще не находится внутри
                        socialL.appendChild(socLink);
                    }
                });
            } else {
                // Возвращение заголовков обратно в header
                headers.forEach(header => {
                    if (menuBar.contains(header)) { // Проверяем, что элемент находится внутри menuBar
                        document.getElementById('header').insertBefore(header, menuBar);
                    }
                });
        
                // Возвращение социальных ссылок обратно в socl
                social.forEach(socLink => {
                    if (socialL.contains(socLink)) { // Проверяем, что элемент находится внутри socialLinks
                        document.getElementById('socl').insertBefore(socLink, socialL);
                    }
                });
            }
        }
    
        window.addEventListener('resize', moveElements);
    
        moveElements();
    
          menuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
          });
    
          headers.forEach(header => {
            header.addEventListener('click', () => {
                if (isOpen) {
                    toggleMenu();
                } else {
                    const target = document.querySelector(header.getAttribute('data-target'));
                    if (target) {
                        smoothScroll(target, 2200);
                    }
                }
            });
        });
          
          function toggleMenu() {
            isOpen = !isOpen;
    
              if (isOpen) {
                  menuBar.style.display = 'flex';
                  menuBtn.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                menuBar.style.transform = 'translateY(0)';
            }, 10);
              } else {
                  menuBtn.style.transform = 'rotate(0deg)';
                  menuBar.style.transform = 'translateY(-306px)';
                  setTimeout(() => {
                      menuBar.style.display = 'none';
                  }, 500);
              }
          };
    
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
    
            allElements.forEach(element => {
              if (element.closest('.popup')) {
                  return;
              };
              if (element.closest('.carousel-1')) {
                return;
              };
              if (!element.hasAttribute('data-animate')) {
                element.setAttribute('data-animate', '')
              };
              if (isElementVisible(element, scale)) {
                  element.classList.add('visible');
              }
          });
            }
        
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);
        
            handleScroll();
            
            const form = document.getElementById('formF');

            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Отменяем стандартное поведение формы
            
                const messageDiv = document.getElementById('messageDiv');
                messageDiv.style.display = 'block'; // Отображаем сообщение
            
                // Скрываем сообщение через 5 секунд
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 3500);
                
                 const formData = new FormData(form);

                fetch(my_ajax_params.ajaxurl, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    console.log('Ответ сервера:', data);
                    document.getElementById('messageDiv').innerHTML = data;
                    this.reset();
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    document.getElementById('messageDiv').innerHTML = '<div class="message error">Ошибка при отправке данных.</div>';
                });
            });
    
              const footer = document.getElementById('footer');
              const wrapper = document.getElementById('wrapper');
    
              if (footer && wrapper) {
                  wrapper.appendChild(footer);
              }
              
              
              const preloader = document.getElementById('loader');
              const progressBar = document.getElementById('progress-bar');
              const progressText = document.getElementById('progress-text');

              let totalResources = 0;
              let loadedResources = 0;

              function updateProgress() {
                  loadedResources++;
                  const progress = (loadedResources / totalResources) * 100;
                  progressBar.style.width = progress + '%';
                  progressText.textContent = Math.round(progress) + '%';

                  if (loadedResources >= totalResources) {
                      setTimeout(() => {
                          preloader.classList.add('fade-out');
                          setTimeout(() => {
                              preloader.style.display = 'none';
                              document.body.style.overflowY = 'auto';
                          }, 500);
                      }, 300);
                  }

                  if (progress > 100) {
                    progressText.textContent = 100 + '%';
                  }
              }

              const resources = document.querySelectorAll('img, svg, script, link[rel="stylesheet"], iframe, video, audio');
              totalResources = resources.length;

              if (totalResources === 0) {
                  updateProgress();
              }

              resources.forEach(resource => {
                  if (resource.complete || resource.readyState === 'complete') {
                      updateProgress();
                  } else {
                      resource.addEventListener('load', updateProgress);
                      resource.addEventListener('error', updateProgress);
                  }
              });

              window.addEventListener('load', () => {
                  if (loadedResources < totalResources) {
                      loadedResources = totalResources;
                      updateProgress();
                  }
              });

});