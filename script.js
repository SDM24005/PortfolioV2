'use strict';

(function () {
    const logoContainer = document.getElementById('logo-container');
    const logoCircle = document.getElementById('logo-circle');
    const pulseRing = document.getElementById('pulse-ring');
    const bottomMenu = document.getElementById('bottom-menu');
    const headerText = document.getElementById('header-text');
    const headerTextContent = document.getElementById('header-text-content');
    const backgroundVideo = document.querySelector('.background-video');
    const menuItems = Array.from(document.querySelectorAll('.menu-item'));

    if (!logoContainer || !logoCircle || !bottomMenu) {
        return;
    }

    const CLICK_TOLERANCE = 8;
    const MOVE_THRESHOLD = 5;
    const DRAG_MOVE_RATIO = 0.75;
    const SPRING = 0.35;
    const DAMPING = 0.75;

    let circleSize = parseFloat(getComputedStyle(logoCircle).getPropertyValue('--circle-size')) || 60;
    let circleRestLeft = window.innerWidth / 2;
    let circleRestTop = window.innerHeight / 2;
    let isDragging = false;
    let hasMoved = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartLeft = 0;
    let dragStartTop = 0;
    let currentCircleLeft = circleRestLeft;
    let currentCircleTop = circleRestTop;
    let totalDragDistance = 0;
    let springAnimId = null;
    let menuOpen = false;
    let hasClicked = false;

    function initializeCircle() {
        circleSize = logoCircle.offsetWidth || circleSize;
        circleRestLeft = window.innerWidth / 2;
        circleRestTop = window.innerHeight / 2;

        if (!isDragging) {
            setCirclePosition(circleRestLeft, circleRestTop);
        }
    }

    function setCirclePosition(left, top) {
        logoContainer.style.transition = '';
        logoContainer.style.left = `${left}px`;
        logoContainer.style.top = `${top}px`;
        logoContainer.style.transform = 'translate(-50%, -50%)';
    }

    function getCirclePosition() {
        const rect = logoContainer.getBoundingClientRect();
        return {
            left: rect.left + rect.width / 2,
            top: rect.top + rect.height / 2
        };
    }

    function animateSpring(targetLeft, targetTop, startLeft, startTop, velocityX = 0, velocityY = 0) {
        if (springAnimId) {
            cancelAnimationFrame(springAnimId);
        }

        let posX = startLeft;
        let posY = startTop;
        let velX = velocityX;
        let velY = velocityY;

        function step() {
            const distX = targetLeft - posX;
            const distY = targetTop - posY;

            const forceX = distX * SPRING;
            const forceY = distY * SPRING;
            const dampingX = velX * DAMPING;
            const dampingY = velY * DAMPING;

            const accelX = forceX - dampingX;
            const accelY = forceY - dampingY;

            velX += accelX;
            velY += accelY;
            posX += velX;
            posY += velY;

            setCirclePosition(posX, posY);

            const isSettled =
                Math.abs(distX) < 0.3 &&
                Math.abs(distY) < 0.3 &&
                Math.abs(velX) < 0.15 &&
                Math.abs(velY) < 0.15;

            if (isSettled) {
                setCirclePosition(targetLeft, targetTop);
                circleRestLeft = targetLeft;
                circleRestTop = targetTop;
                springAnimId = null;
            } else {
                springAnimId = requestAnimationFrame(step);
            }
        }

        step();
    }

    function hidePulseAnimation() {
        if (pulseRing && !pulseRing.classList.contains('hidden')) {
            pulseRing.classList.add('hidden');
        }
        hasClicked = true;
    }

    function openMenu(animated = true) {
        if (menuOpen) return;

        menuOpen = true;
        localStorage.setItem('menuOpened', 'true');

        bottomMenu.classList.remove('dragging');
        bottomMenu.classList.add('open');

        if (animated) {
            bottomMenu.style.transition = 'height 0.2s ease-out';
        } else {
            bottomMenu.style.transition = 'none';
            setTimeout(() => {
                bottomMenu.style.transition = 'height 0.2s ease-out';
            }, 50);
        }

        if (!hasClicked) {
            hidePulseAnimation();
        }
    }

    function animateMenuTextToTop(menuItem) {
        if (!headerText || !headerTextContent) return;

        const text = menuItem.getAttribute('data-text') || menuItem.textContent;
        const href = menuItem.getAttribute('href');
        const menuItemRect = menuItem.getBoundingClientRect();
        const menuItemTop = menuItemRect.top;
        const targetTop = window.innerHeight / 2 - 65;
        const targetLeft = window.innerWidth / 2;

        if (href) {
            sessionStorage.setItem('activeMenuLink', href);
        }

        menuItems.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');
        menuItem.classList.add('animating');

        backgroundVideo?.classList.add('fade-out');
        bottomMenu?.classList.add('fade-out');

        if (pulseRing && !pulseRing.classList.contains('hidden')) {
            pulseRing.style.transition = 'opacity 0.5s ease-out';
            pulseRing.style.opacity = '0';
        }

        headerTextContent.textContent = text;
        headerText.style.position = 'fixed';
        headerText.style.left = `${targetLeft}px`;
        headerText.style.top = `${menuItemTop}px`;
        headerText.style.transform = 'translate(-50%, -50%)';
        headerText.style.transition = 'top 0.5s ease-out, opacity 0.5s ease-out';

        void headerText.offsetHeight;

        requestAnimationFrame(() => {
            headerText.style.top = `${targetTop}px`;
            headerText.classList.add('visible');
        });

        setTimeout(() => {
            if (href && href !== '#') {
                window.location.href = href;
            } else {
                menuItem.classList.remove('animating');
                backgroundVideo?.classList.remove('fade-out');
                bottomMenu?.classList.remove('fade-out');
                headerText.classList.remove('visible');
            }
        }, 500);
    }

    function isHomePage() {
        const path = window.location.pathname;
        return path === '/' || path.endsWith('/index.html');
    }

    function setActiveMenuItem() {
        if (isHomePage()) {
            sessionStorage.removeItem('activeMenuLink');
            menuItems.forEach(item => item.classList.remove('active'));
            return;
        }

        const activeLink = sessionStorage.getItem('activeMenuLink');
        if (!activeLink) return;

        menuItems.forEach(item => {
            const itemHref = item.getAttribute('href');
            item.classList.toggle('active', itemHref === activeLink);
        });
    }

    function handleDragStart(clientX, clientY) {
        if (springAnimId) {
            cancelAnimationFrame(springAnimId);
            springAnimId = null;
        }

        logoContainer.style.transition = 'none';
        bottomMenu.classList.add('dragging');

        isDragging = true;
        hasMoved = false;
        totalDragDistance = 0;
        dragStartX = clientX;
        dragStartY = clientY;

        const pos = getCirclePosition();
        dragStartLeft = pos.left;
        dragStartTop = pos.top;
        currentCircleLeft = dragStartLeft;
        currentCircleTop = dragStartTop;

        logoCircle.classList.add('dragging');
    }

    function handleDragMove(clientX, clientY) {
        if (!isDragging) return;

        const deltaX = clientX - dragStartX;
        const deltaY = clientY - dragStartY;

        totalDragDistance = Math.hypot(deltaX, deltaY);

        if (Math.abs(deltaX) > MOVE_THRESHOLD || Math.abs(deltaY) > MOVE_THRESHOLD) {
            hasMoved = true;
        }

        currentCircleLeft = dragStartLeft + deltaX * DRAG_MOVE_RATIO;
        currentCircleTop = dragStartTop + deltaY * DRAG_MOVE_RATIO;

        const minLeft = circleSize / 2;
        const maxLeft = window.innerWidth - circleSize / 2;
        const minTop = circleSize / 2;
        const maxTop = window.innerHeight - circleSize / 2;

        currentCircleLeft = Math.max(minLeft, Math.min(maxLeft, currentCircleLeft));
        currentCircleTop = Math.max(minTop, Math.min(maxTop, currentCircleTop));

        setCirclePosition(currentCircleLeft, currentCircleTop);
    }

    function handleDragEnd() {
        if (!isDragging) return;

        isDragging = false;
        logoCircle.classList.remove('dragging');
        bottomMenu.classList.remove('dragging');

        if (totalDragDistance < CLICK_TOLERANCE && !hasMoved) {
            if (!hasClicked) {
                hidePulseAnimation();
                openMenu(true);
            }
        } else {
            const velocityX = (currentCircleLeft - dragStartLeft) * 0.3;
            const velocityY = (currentCircleTop - dragStartTop) * 0.3;
            animateSpring(circleRestLeft, circleRestTop, currentCircleLeft, currentCircleTop, velocityX, velocityY);
        }

        setTimeout(() => {
            hasMoved = false;
            totalDragDistance = 0;
        }, 100);
    }

    initializeCircle();

    const menuWasOpened = localStorage.getItem('menuOpened') === 'true';
    if (menuWasOpened) {
        hidePulseAnimation();
        menuOpen = true;
        bottomMenu.classList.add('open');
        bottomMenu.style.transition = 'none';
        setTimeout(() => {
            bottomMenu.style.transition = 'height 0.2s ease-out';
        }, 50);
    }

    setActiveMenuItem();

    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            if (item.classList.contains('animating')) return;
            animateMenuTextToTop(item);
        });
    });

    logoCircle.addEventListener('mousedown', event => {
        event.preventDefault();
        event.stopPropagation();
        handleDragStart(event.clientX, event.clientY);
    });

    document.addEventListener('mousemove', event => handleDragMove(event.clientX, event.clientY));
    document.addEventListener('mouseup', () => handleDragEnd());

    logoCircle.addEventListener('touchstart', event => {
        event.preventDefault();
        event.stopPropagation();
        const touch = event.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
    }, { passive: false });

    document.addEventListener('touchmove', event => {
        if (!isDragging) return;
        event.preventDefault();
        const touch = event.touches[0];
        handleDragMove(touch.clientX, touch.clientY);
    }, { passive: false });

    document.addEventListener('touchend', () => handleDragEnd());

    window.addEventListener('pageshow', () => setActiveMenuItem());
    window.addEventListener('popstate', () => setTimeout(setActiveMenuItem, 0));

    window.addEventListener('resize', () => {
        circleRestLeft = window.innerWidth / 2;
        circleRestTop = window.innerHeight / 2;
        if (!isDragging && !springAnimId) {
            setCirclePosition(circleRestLeft, circleRestTop);
        }
    });
})();

