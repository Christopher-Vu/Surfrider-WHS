window.addEventListener("orientationchange", function () {
    var orientation = window.screen.orientation;
    if (orientation.type !== "portrait-primary" && orientation.type !== "portrait-secondary") {
        // Lock the screen to portrait mode
        if (screen.lockOrientation) {
        screen.lockOrientation("portrait");
        } else if (screen.mozLockOrientation) {
        screen.mozLockOrientation("portrait");
        } else if (screen.msLockOrientation) {
        screen.msLockOrientation("portrait");
        }
    }
});
    
const fadeElements = document.querySelectorAll('.fade-in-scroll');
const fadeSlowElements = document.querySelectorAll('.fade-in-scroll-slow');
const colorBox3 = document.getElementById("color-box-3");

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.bottom - rect.top;
    const threshold = 0.5; 

    return (
        rect.bottom >= (elementHeight * threshold) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - (elementHeight * threshold)
    );
}


function fadeInElement(element) {
    if (isElementInViewport(element)) {
        element.style.animation = "fadeInScroll 1s forwards";
        window.removeEventListener('scroll', () => fadeInElement(element));
    }
}


function fadeInElementSlow(element) {
    if (isElementInViewport(element)) {
        element.style.animation = "fadeInScroll 2s forwards";
        window.removeEventListener('scroll', () => fadeInElementSlow(element));
    }
}

fadeElements.forEach((element) => {
    window.addEventListener('scroll', () => fadeInElement(element));
    fadeInElement(element);
});

fadeSlowElements.forEach((element) => {
    window.addEventListener('scroll', () => fadeInElementSlow(element));
    fadeInElementSlow(element);
});



const slides = document.querySelectorAll('.slide');

let currentSlide = 0;

function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
        slide.style.opacity = index === slideIndex ? '1' : '0';
    });
    currentSlide = slideIndex;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

showSlide(currentSlide);

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    const wideOnlyNav = document.querySelectorAll('.wide-only-nav');
    const overlay = document.querySelector('.overlay');
    const buttons = document.querySelectorAll('.bbb');
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    
    const isNoPointer = window.matchMedia('(pointer: none)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    function closeMenu() {
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        menu.style.transform = "translate(200%, 0%)"; 
        setTimeout(function() {
            wideOnlyNav.forEach(function(navItem) {
                if (!isNoPointer && !isCoarsePointer) {
                    navItem.style.display = 'block';
                }
            });

            menu.classList.remove('show');
        }, 500);

        setTimeout(function() {
            overlay.style.display = 'none';
        }, 300);

        buttons.forEach(function(button) {
            button.style.color = 'white';
            const buttonSpan = button.querySelector('span')
            const buttonBefore = document.createElement('style');
            
            const bbbStyleTag = document.createElement('style');
            bbbStyleTag.innerHTML = '.bbb:hover span::before { background-color: rgba(246, 244, 235, 1); } .bbb:hover { color: black !important; }';
            document.head.appendChild(bbbStyleTag);

            buttonSpan.style.border = '4px solid white';
            buttonSpan.style.background = 'rgba(246, 244, 235, 0.2)';
        });
    };

    menuIcon.addEventListener('click', function() {
        if (menu.classList.contains('show')) {
            closeMenu();
        } else {
            document.body.style.overflow = 'hidden';
            menu.classList.toggle('show');
            if (window.innerWidth < 600) { 
                    menu.style.display = "flex";
            } else {
                menu.style.display = "grid";
            }

            wideOnlyNav.forEach(function(navItem) {
                navItem.style.display = 'none';
                });

            if (isNoPointer || isCoarsePointer) {
                buttons.forEach(function(button) {
                    const buttonSpan = button.querySelector('span')
                    button.style.color = 'rgba(0, 0, 0, 0)';
                    button.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    buttonSpan.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                    buttonSpan.style.background = 'rgba(255, 255, 255, 0)';
                    buttonSpan.style.border = '4px solid rgba(0, 0, 0, 0)';
                });
            } else {
                buttons.forEach(function(button) {
                    const buttonSpan = button.querySelector('span')
                    button.style.color = 'black';
                    buttonSpan.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                    buttonSpan.style.border = '4px solid black';
                });

                const buttonBefore = document.createElement('style');
                buttonBefore.innerHTML = `.bbb:hover span::before { background-color: black }`;
                document.head.appendChild(buttonBefore);

                const bbbStyleTag = document.createElement('style');
                bbbStyleTag.innerHTML = '.bbb:hover span::before { background-color: black; } .bbb:hover { color: white !important; }';
                document.head.appendChild(bbbStyleTag);
            }

            menu.style.transform = 'translate(200%, 0%)';
            menu.style.transition = "all 0.7s";
            overlay.style.display = 'block';
            setTimeout(function() { // Apply the transform property after a slight delay
                if (window.innerWidth > window.innerHeight) {
                    menu.style.transform = 'translate(100%, 0%)';
                } else {
                    menu.style.transform = 'translate(0%, 0%)';
                }  
            }, 50);
        }
    });

    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener('scroll', function() {
        const fadeButtons = document.querySelectorAll('.bbb');
        const scrollPosition = window.scrollY;
        const scrollInstructions = document.querySelector('.scroll-instructions');
        
        if (scrollPosition > 0) {
            scrollInstructions.style.background = "rgba(0, 0, 0, 0)";
            scrollInstructions.style.color = "rgba(0, 0, 0, 0)";
        }
        
        fadeButtons.forEach(function(element) {
            if (scrollPosition > 0) {
                element.style.textShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
                element.style.boxShadow = 'rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px inset';
                const buttonSpan = element.querySelector('span')
                element.style.color = "rgba(0, 0, 0, 0)";
                buttonSpan.style.background = "rgba(0, 0, 0, 0)";
                buttonSpan.style.border = "4px solid rgba(0, 0, 0, 0)";
                wideOnlyNav.forEach(function(navItem) {
                    navItem.style.color = 'rgba(0, 0, 0, 0)';
                });

                setTimeout(function() {
                    element.style.display = "none";
                    wideOnlyNav.forEach(function(navItem) {
                        navItem.style.display = 'none';
                    });
                }, 600);
            } else {
                element.style.textShadow = "1px 1px 2px black";
                element.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 5px 10px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -12px 0px inset';
                element.style.color = "white";
                const buttonSpan = element.querySelector('span')
                buttonSpan.style.background = "rgba(246, 244, 235, 0.2)";
                buttonSpan.style.border = "4px solid white";
                wideOnlyNav.forEach(function(navItem) {
                    if (!isNoPointer && !isCoarsePointer) {
                        navItem.style.color = '#454545';
                    }
                });

                setTimeout(function() {
                    element.style.display = "block";
                    wideOnlyNav.forEach(function(navItem) {
                        if (!isNoPointer && !isCoarsePointer) {
                            navItem.style.display = 'block';
                        }
                    });
                }, 600);
            }
        });
    });
});