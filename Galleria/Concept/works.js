'use strict';

(function () {
    // DOM references
    const headerText = document.querySelector('.header-text');
    const container = document.querySelector('.masonry-container');
    const tagFilterSection = document.getElementById('tag-filter-section');
    const tagContainer = document.getElementById('tag-container');
    const yearFilterSection = document.getElementById('year-filter-section');
    const yearContainer = document.getElementById('year-container');
    const logoCircle = document.getElementById('logo-circle');
    const bottomMenu = document.getElementById('bottom-menu');
    const galleryFooter = document.querySelector('.gallery-footer');
    const backToTopLink = document.querySelector('.back-to-top');

    if (!container || !logoCircle || !bottomMenu) {
        return;
    }

    // Gallery constants/state
    const ANIMATION_BASE_DELAY = 0.5;
    const COLUMN_DELAY = 0.15;
    const ITEM_DELAY = 0.08;
    const LOGO_ANIMATION_DELAY = 1000;
    const RESIZE_DEBOUNCE = 250;
    const RESIZE_THRESHOLD = 50;
    const BATCH_SIZE = 20;

    const loadedImages = new Set();
    let isCreatingGrid = false;
    const selectedTags = new Set();
    const selectedYears = new Set();
    let allProjectsData = [];
    let resizeTimer;
    let tagResizeTimer;
    let lastWindowWidth = window.innerWidth;
    let lastWindowHeight = window.innerHeight;

    // Logo/menu constants/state
    let MENU_HEIGHT = 400;
    const LOGO_SIZE = 60;
    const CIRCLE_REST_BOTTOM_DESKTOP = 100;
    const CIRCLE_REST_BOTTOM_MOBILE = 80;
    const CLICK_TOLERANCE = 8;
    const MOVE_THRESHOLD = 5;
    const DRAG_MOVE_RATIO = 0.75;
    const SPRING = 0.35;
    const DAMPING = 0.75;

    let menuOpen = false;
    let circleRestTop = 0;
    let circleRestLeft = 0;
    let isDraggingLogo = false;
    let hasMovedLogo = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartLeft = 0;
    let dragStartTop = 0;
    let currentCircleLeft = 0;
    let currentCircleTop = 0;
    let totalDragDistance = 0;
    let springAnimId = null;

    // Utility: header click/back-to-top
    function initHeaderClick() {
        if (headerText) {
            headerText.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        if (backToTopLink) {
            backToTopLink.addEventListener('click', event => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Adjust relative paths for current directory
    function adjustPath(path) {
        if (!path) return '';
        if (path.startsWith('../../')) return path;
        if (path.startsWith('../')) {
            return `../../${path.slice(3)}`;
        }
        return path;
    }

    // Auto-scroller factory (used for tag/year selectors)
    function createAutoScroller(containerEl) {
        let animationId = null;
        let startTimer = null;
        let isPaused = false;
        let accumulator = 0;
        const speed = 0.2;

        const hasScrollableContent = () => {
            if (!containerEl) return false;
            return containerEl.scrollWidth - containerEl.clientWidth > 1;
        };

        const stopAnimation = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        };

        const animate = () => {
            if (!containerEl) {
                animationId = null;
                return;
            }

            if (isPaused) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            if (!hasScrollableContent()) {
                stopAnimation();
                return;
            }

            const maxScroll = containerEl.scrollWidth - containerEl.clientWidth;
            if (containerEl.scrollLeft >= maxScroll - 1) {
                containerEl.scrollLeft = 0;
                accumulator = 0;
            } else {
                accumulator += speed;
                if (accumulator >= 1) {
                    const pixels = Math.floor(accumulator);
                    containerEl.scrollLeft += pixels;
                    accumulator -= pixels;
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        const start = () => {
            stopAnimation();
            if (startTimer) {
                clearTimeout(startTimer);
                startTimer = null;
            }
            accumulator = 0;
            isPaused = false;

            if (hasScrollableContent()) {
                startTimer = setTimeout(() => {
                    animationId = requestAnimationFrame(animate);
                }, 2000);
            }
        };

        const pause = () => {
            isPaused = true;
            if (startTimer) {
                clearTimeout(startTimer);
                startTimer = null;
            }
            setTimeout(() => {
                isPaused = false;
            }, 5000);
        };

        return { start, pause, hasScrollableContent };
    }

    const tagScroller = createAutoScroller(tagContainer);
    const yearScroller = createAutoScroller(yearContainer);

    // Initialize drag/scroll behaviour for filter containers
    function initializeFilterScroll(containerEl, pauseFn) {
        if (!containerEl) return;

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;
        let hasMoved = false;
        const dragThreshold = 5;
        let clickedButton = null;

        const onDragStart = (event, clientX) => {
            clickedButton = event.target.closest('.filter-button');
            isDragging = true;
            hasMoved = false;
            containerEl.style.cursor = 'grabbing';
            containerEl.style.userSelect = 'none';
            startX = clientX - containerEl.offsetLeft;
            scrollLeft = containerEl.scrollLeft;
        };

        const onDragMove = (event, clientX) => {
            if (!isDragging) return;

            const x = clientX - containerEl.offsetLeft;
            const walk = (x - startX) * 2;

            if (Math.abs(walk) > dragThreshold) {
                hasMoved = true;
                event.preventDefault();
                containerEl.scrollLeft = scrollLeft - walk;
                pauseFn();
            }
        };

        const onDragEnd = event => {
            if (!isDragging) return;

            if (hasMoved && clickedButton) {
                event.preventDefault();
                event.stopPropagation();
            }

            isDragging = false;
            clickedButton = null;
            containerEl.style.cursor = 'grab';
            containerEl.style.userSelect = '';
            setTimeout(() => {
                hasMoved = false;
            }, 100);
        };

        containerEl.addEventListener('mousedown', event => onDragStart(event, event.pageX));
        containerEl.addEventListener('mousemove', event => onDragMove(event, event.pageX));
        containerEl.addEventListener('mouseup', onDragEnd);
        containerEl.addEventListener('mouseleave', onDragEnd);

        containerEl.addEventListener('touchstart', event => onDragStart(event, event.touches[0].pageX), { passive: true });
        containerEl.addEventListener('touchmove', event => onDragMove(event, event.touches[0].pageX), { passive: false });
        containerEl.addEventListener('touchend', onDragEnd, { passive: false });

        containerEl.addEventListener('wheel', event => {
            event.preventDefault();
            containerEl.scrollLeft += event.deltaY;
            pauseFn();
        }, { passive: false });

        containerEl.style.cursor = 'grab';
    }

    function getAllUniqueTags() {
        const all = [...(Array.isArray(baseProjects) ? baseProjects : []), ...(Array.isArray(baseOpenProjects) ? baseOpenProjects : [])];
        const tags = new Set();
        all.forEach(project => project.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }

    function getAllUniqueYears() {
        const all = [...(Array.isArray(baseProjects) ? baseProjects : []), ...(Array.isArray(baseOpenProjects) ? baseOpenProjects : [])];
        const years = new Set();
        all.forEach(project => {
            if (project.startDate) years.add(project.startDate);
        });
        return Array.from(years).sort((a, b) => b.localeCompare(a));
    }

    function createFilterButtons(containerEl, items, type) {
        containerEl.innerHTML = '';
        items.forEach(item => {
            const button = document.createElement('button');
            button.className = `filter-button ${type}-button`;
            button.textContent = item;
            button.dataset[type] = item;
            button.addEventListener('click', () => toggleFilter(type, item));
            containerEl.appendChild(button);
        });
    }

    function createTagButtons() {
        const uniqueTags = getAllUniqueTags();
        createFilterButtons(tagContainer, uniqueTags, 'tag');
        initializeFilterScroll(tagContainer, tagScroller.pause);
        tagScroller.start();
    }

    function createYearButtons() {
        const uniqueYears = getAllUniqueYears();
        createFilterButtons(yearContainer, uniqueYears, 'year');
        initializeFilterScroll(yearContainer, yearScroller.pause);
        yearScroller.start();
    }

    function toggleFilter(type, value) {
        const selectedSet = type === 'tag' ? selectedTags : selectedYears;
        const containerEl = type === 'tag' ? tagContainer : yearContainer;
        const pauseFn = type === 'tag' ? tagScroller.pause : yearScroller.pause;

        if (selectedSet.has(value)) {
            selectedSet.delete(value);
        } else {
            selectedSet.add(value);
        }

        containerEl.querySelectorAll('.filter-button').forEach(button => {
            const isSelected = selectedSet.has(button.dataset[type]);
            button.classList.toggle('selected', isSelected);
        });

        pauseFn();
        filterProjects();
    }

    async function filterProjects() {
        let filtered = allProjectsData;

        if (selectedTags.size > 0) {
            filtered = filtered.filter(project => {
                return Array.from(selectedTags).some(tag => project.tags?.includes(tag));
            });
        }

        if (selectedYears.size > 0) {
            filtered = filtered.filter(project => selectedYears.has(project.year));
        }

        if (filtered.length === 0) {
            container.innerHTML = '<p style="color: white; text-align: center; padding: 50px;">Nessun progetto trovato.</p>';
            return;
        }

        const { numColumns, columnWidth, gap } = getResponsiveSettings();

        try {
            const imagePromises = filtered.map(data => loadImage(data, columnWidth));
            const results = await Promise.allSettled(imagePromises);
            const imageData = results.filter(result => result.status === 'fulfilled').map(result => result.value);

            if (imageData.length === 0) {
                container.innerHTML = '<p style="color: white; text-align: center; padding: 50px;">Nessuna immagine disponibile.</p>';
                return;
            }

            const { columns, columnHeights } = distributeImages(imageData, numColumns, gap);
            renderColumns(columns, columnHeights, columnWidth, gap, true);
        } catch (error) {
            console.error('Errore nel filtraggio:', error);
        }
    }

    function getAllImagesData() {
        const all = [];

        if (typeof baseProjects !== 'undefined' && Array.isArray(baseProjects)) {
            all.push(...baseProjects);
        } else if (typeof projects !== 'undefined' && Array.isArray(projects)) {
            const seen = new Set();
            projects.forEach(project => {
                const key = project.preview || project.name;
                if (!seen.has(key)) {
                    seen.add(key);
                    all.push(project);
                }
            });
        }

        if (typeof baseOpenProjects !== 'undefined' && Array.isArray(baseOpenProjects)) {
            all.push(...baseOpenProjects);
        } else if (typeof openProjects !== 'undefined' && Array.isArray(openProjects)) {
            const seen = new Set();
            openProjects.forEach(project => {
                const key = project.preview || project.name;
                if (!seen.has(key)) {
                    seen.add(key);
                    all.push(project);
                }
            });
        }

        const data = all
            .map(project => ({
                src: adjustPath(project.preview),
                page: adjustPath(project.page || ''),
                tags: project.tags || [],
                year: project.startDate || ''
            }))
            .filter(project => project.src);

        allProjectsData = data;
        return data;
    }

    function getResponsiveSettings() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 576) {
            return { numColumns: 2, columnWidth: (screenWidth - 30) / 2, gap: 10 };
        }
        if (screenWidth <= 992) {
            return { numColumns: 2, columnWidth: (screenWidth - 45) / 2, gap: 15 };
        }
        const numColumns = Math.max(2, Math.min(4, Math.floor((screenWidth - 100) / 320)));
        const gap = 20;
        const columnWidth = (screenWidth - (numColumns - 1) * gap - 40) / numColumns;
        return { numColumns, columnWidth, gap };
    }

    function loadImage(imageData, columnWidth) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.naturalHeight / img.naturalWidth;
                resolve({
                    ...imageData,
                    width: columnWidth,
                    height: columnWidth * aspectRatio,
                    aspectRatio
                });
            };
            img.onerror = reject;
            img.src = imageData.src;
        });
    }

    function distributeImages(imageData, numColumns, gap) {
        const columns = Array.from({ length: numColumns }, () => []);
        const heights = Array(numColumns).fill(0);

        imageData.forEach(data => {
            const columnIndex = heights.indexOf(Math.min(...heights));
            columns[columnIndex].push(data);
            heights[columnIndex] += data.height + (columns[columnIndex].length > 1 ? gap : 0);
        });

        return { columns, columnHeights: heights };
    }

    function renderColumns(columns, columnHeights, columnWidth, gap, shouldAnimate = true) {
        container.innerHTML = '';
        container.style.gap = `${gap}px`;
        const images = [];

        columns.forEach((column, columnIndex) => {
            if (column.length === 0) return;

            const columnElement = document.createElement('div');
            columnElement.className = 'masonry-column';
            columnElement.style.width = `${columnWidth}px`;
            columnElement.style.gap = `${gap}px`;

            column.forEach((data, itemIndex) => {
                const item = document.createElement('div');
                item.className = 'masonry-item';
                item.dataset.columnIndex = String(columnIndex);
                item.dataset.itemIndex = String(itemIndex);

                const image = document.createElement('img');
                image.src = data.src;
                image.alt = '';
                image.loading = 'lazy';
                image.dataset.src = data.src;
                images.push(image);

                if (loadedImages.has(data.src) && shouldAnimate) {
                    item.dataset.alreadyLoaded = 'true';
                }

                let node = image;
                if (data.page) {
                    const link = document.createElement('a');
                    link.href = data.page;
                    link.appendChild(image);
                    node = link;
                }

                item.appendChild(node);
                columnElement.appendChild(item);
            });

            container.appendChild(columnElement);
        });

        if (images.length === 0) return;

        const items = container.querySelectorAll('.masonry-item');
        if (shouldAnimate) {
            items.forEach(item => {
                if (item.dataset.alreadyLoaded === 'true') {
                    item.classList.add('animate');
                    return;
                }
                const colIndex = Number(item.dataset.columnIndex) || 0;
                const itemIndex = Number(item.dataset.itemIndex) || 0;
                const delay = (ANIMATION_BASE_DELAY + colIndex * COLUMN_DELAY + itemIndex * ITEM_DELAY) * 1000;
                setTimeout(() => item.classList.add('animate'), delay);
            });
        } else {
            items.forEach(item => item.classList.add('animate'));
        }

        let loadedCount = 0;
        const markLoaded = () => {
            loadedCount += 1;
            if (loadedCount === images.length) {
                galleryFooter?.classList.add('visible');
            }
        };

        images.forEach(image => {
            if (image.complete) {
                loadedImages.add(image.dataset.src || image.src);
                markLoaded();
            } else {
                image.addEventListener('load', () => {
                    loadedImages.add(image.dataset.src || image.src);
                    markLoaded();
                });
                image.addEventListener('error', markLoaded);
            }
        });
    }

    function waitForRotationCycle() {
        return new Promise(resolve => {
            const animationDuration = 1000;
            const elapsed = performance.now() % animationDuration;
            const timeUntilEnd = animationDuration - elapsed;
            setTimeout(resolve, timeUntilEnd + 50);
        });
    }

    async function createMasonryGrid(shouldAnimate = true) {
        if (isCreatingGrid) return;
        isCreatingGrid = true;

        try {
            // 1. Ottieni i dati delle immagini
            const images = getAllImagesData();
            if (images.length === 0) {
                container.innerHTML = '<p style="color: white; text-align: center; padding: 50px;">Nessuna immagine trovata.</p>';
                isCreatingGrid = false;
                return;
            }

            const { numColumns, columnWidth, gap } = getResponsiveSettings();

            // 2. CARICA TUTTE LE IMMAGINI (il logo sta girando)
            const imagePromises = allProjectsData.map(imgData => loadImage(imgData, columnWidth));
            const results = await Promise.allSettled(imagePromises);
            const imageData = results
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value);

            if (imageData.length === 0) {
                container.innerHTML = '<p style="color: white; text-align: center; padding: 50px;">Nessuna immagine disponibile.</p>';
                isCreatingGrid = false;
                return;
            }

            // 3. IMMAGINI CARICATE. Aspetta la fine del giro del logo.
            await waitForRotationCycle();

            // 4. AVVIA LE ANIMAZIONI DI TRANSIZIONE (Header, Logo, Filtri)
            if (logoCircle) {
                logoCircle.style.animation = 'none';
                void logoCircle.offsetHeight;
                logoCircle.classList.add('loaded');
            }

            document.querySelector('.header')?.classList.add('loaded');
            document.querySelector('.header-rectangle')?.classList.add('loaded');

            setTimeout(() => {
                tagFilterSection?.classList.add('visible', 'loaded');
                createTagButtons();
            }, 500);

            setTimeout(() => {
                yearFilterSection?.classList.add('visible', 'loaded');
                createYearButtons();
            }, 600);

            // 5. Inizializza la fisica SOLO DOPO l'animazione di spostamento
            if (logoCircle) {

                const onAnimationDone = () => {
                    if (logoCircle.dataset.physicsInitialized) return;
                    logoCircle.dataset.physicsInitialized = 'true';
                    initializeCirclePhysics();
                };

                logoCircle.addEventListener(
                    'animationend',
                    e => {
                        if (e.animationName.includes('moveToBottom')) {
                            onAnimationDone();
                        }
                    },
                    { once: true }
                );

                setTimeout(onAnimationDone, 1000);
            }

            // 6. RENDERIZZA LA GRIGLIA (con il suo delay)
            const { columns, columnHeights } = distributeImages(imageData, numColumns, gap);
            const gridDelay = LOGO_ANIMATION_DELAY + 500;

            setTimeout(() => {
                renderColumns(columns, columnHeights, columnWidth, gap, shouldAnimate);
            }, gridDelay);
        } catch (error) {
            console.error('Errore nella creazione della griglia:', error);
        } finally {
            isCreatingGrid = false;
        }
    }

    function initializePage() {
        createMasonryGrid(true);
    }

    function handleResize() {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;
        const widthChange = Math.abs(currentWidth - lastWindowWidth);
        const heightChange = Math.abs(currentHeight - lastWindowHeight);
        const isMobile = currentWidth <= 768;
        const shouldResizeGrid = isMobile
            ? widthChange > RESIZE_THRESHOLD
            : widthChange > RESIZE_THRESHOLD || heightChange > RESIZE_THRESHOLD;

        if (shouldResizeGrid) {
            lastWindowWidth = currentWidth;
            lastWindowHeight = currentHeight;

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                createMasonryGrid(false);
            }, RESIZE_DEBOUNCE);
        }

        clearTimeout(tagResizeTimer);
        tagResizeTimer = setTimeout(() => {
            tagScroller.start();
            yearScroller.start();
        }, 300);
    }

    function handleNavigation() {
        window.addEventListener('popstate', () => {
            setTimeout(() => sessionStorage.removeItem('activeMenuLink'), 0);
        });
        window.addEventListener('pageshow', event => {
            if (event.persisted) {
                sessionStorage.removeItem('activeMenuLink');
            }
        });
    }

    // Logo/menu helpers
    function updateMenuHeightFromCSS() {
        if (!bottomMenu) return;
        const menuHeightStr = getComputedStyle(bottomMenu).getPropertyValue('--menu-height').trim();
        const parsed = parseFloat(menuHeightStr);
        if (!Number.isNaN(parsed)) {
            MENU_HEIGHT = parsed;
            console.log('Altezza menu aggiornata a:', MENU_HEIGHT);
        }
    }

    function isNearPageBottom(threshold = 80) {
        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        return totalHeight - scrollPosition <= threshold;
    }

    function getCircleRestBottom() {
        return window.innerWidth <= 768 ? CIRCLE_REST_BOTTOM_MOBILE : CIRCLE_REST_BOTTOM_DESKTOP;
    }

    function setLogoPosition(left, top) {
        logoCircle.style.animation = 'none';
        logoCircle.style.transition = '';
        logoCircle.style.setProperty('left', `${left}px`, 'important');
        logoCircle.style.setProperty('top', `${top}px`, 'important');
        logoCircle.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
        void logoCircle.offsetHeight;
    }

    function getLogoPosition() {
        const rect = logoCircle.getBoundingClientRect();
        return {
            left: rect.left + rect.width / 2,
            top: rect.top + rect.height / 2
        };
    }

    function updateCircleRestPosition() {
        const restBottom = getCircleRestBottom();
        if (menuOpen) {
            circleRestTop = window.innerHeight / 2;
        } else {
            circleRestTop = window.innerHeight - restBottom - LOGO_SIZE / 2;
        }
        circleRestLeft = window.innerWidth / 2;
    }

    function animateSpringToRest() {
        if (springAnimId) {
            cancelAnimationFrame(springAnimId);
        }

        let posX = currentCircleLeft;
        let posY = currentCircleTop;
        let velX = (currentCircleLeft - dragStartLeft) * 0.3;
        let velY = (currentCircleTop - dragStartTop) * 0.3;
        const targetLeft = circleRestLeft;
        const targetTop = circleRestTop;

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

            setLogoPosition(posX, posY);

            const settled =
                Math.abs(distX) < 0.3 &&
                Math.abs(distY) < 0.3 &&
                Math.abs(velX) < 0.15 &&
                Math.abs(velY) < 0.15;

            if (settled) {
                setLogoPosition(targetLeft, targetTop);
                springAnimId = null;
            } else {
                springAnimId = requestAnimationFrame(step);
            }
        }

        step();
    }

    function updateMenuHeightFromCircle(circleTop) {
        const restBottom = getCircleRestBottom();
        const closedRestTop = window.innerHeight - restBottom - LOGO_SIZE / 2;
        const dragUpDistance = closedRestTop - circleTop;
        const menuHeight = Math.max(0, Math.min(MENU_HEIGHT, dragUpDistance));
        bottomMenu.style.height = `${menuHeight}px`;

        const newMenuOpen = menuHeight > MENU_HEIGHT * 0.5;
        if (newMenuOpen !== menuOpen) {
            menuOpen = newMenuOpen;
            bottomMenu.classList.toggle('open', menuOpen);
        }
    }

    function toggleMenu() {
        menuOpen = !menuOpen;
        updateCircleRestPosition();

        requestAnimationFrame(() => {
            bottomMenu.classList.remove('dragging');
            bottomMenu.style.transition = 'height 0.2s ease-out';
            bottomMenu.style.height = menuOpen ? `${MENU_HEIGHT}px` : '0px';
            bottomMenu.classList.toggle('open', menuOpen);

            logoCircle.style.transition = 'top 0.2s ease-out, left 0.2s ease-out';
            setLogoPosition(circleRestLeft, circleRestTop);

            setTimeout(() => {
                logoCircle.style.transition = '';
            }, 200);
        });
    }

    function handleLogoDragStart(clientX, clientY) {
        if (springAnimId) {
            cancelAnimationFrame(springAnimId);
            springAnimId = null;
        }

        logoCircle.style.transition = 'none';
        bottomMenu.classList.add('dragging');

        isDraggingLogo = true;
        hasMovedLogo = false;
        totalDragDistance = 0;
        dragStartX = clientX;
        dragStartY = clientY;

        const pos = getLogoPosition();
        dragStartLeft = pos.left;
        dragStartTop = pos.top;
        currentCircleLeft = dragStartLeft;
        currentCircleTop = dragStartTop;

        logoCircle.classList.add('dragging');
    }

    function handleLogoDragMove(clientX, clientY) {
        if (!isDraggingLogo) return;

        const deltaX = clientX - dragStartX;
        const deltaY = clientY - dragStartY;

        totalDragDistance = Math.hypot(deltaX, deltaY);
        if (Math.abs(deltaX) > MOVE_THRESHOLD || Math.abs(deltaY) > MOVE_THRESHOLD) {
            hasMovedLogo = true;
        }

        currentCircleLeft = dragStartLeft + deltaX * DRAG_MOVE_RATIO;
        currentCircleTop = dragStartTop + deltaY * DRAG_MOVE_RATIO;

        const minLeft = LOGO_SIZE / 2;
        const maxLeft = window.innerWidth - LOGO_SIZE / 2;
        const minTop = LOGO_SIZE / 2;
        const maxTop = window.innerHeight - LOGO_SIZE / 2;

        currentCircleLeft = Math.max(minLeft, Math.min(maxLeft, currentCircleLeft));
        currentCircleTop = Math.max(minTop, Math.min(maxTop, currentCircleTop));

        setLogoPosition(currentCircleLeft, currentCircleTop);
        updateMenuHeightFromCircle(currentCircleTop);
    }

    function handleLogoDragEnd() {
        if (!isDraggingLogo) return;

        isDraggingLogo = false;
        logoCircle.classList.remove('dragging');
        bottomMenu.classList.remove('dragging');

        if (totalDragDistance < CLICK_TOLERANCE && !hasMovedLogo) {
            toggleMenu();
        } else {
            const finalMenuHeight = parseFloat(bottomMenu.style.height) || 0;
            menuOpen = finalMenuHeight > MENU_HEIGHT * 0.5;

            bottomMenu.style.transition = 'height 0.2s ease-out';
            bottomMenu.style.height = menuOpen ? `${MENU_HEIGHT}px` : '0px';
            bottomMenu.classList.toggle('open', menuOpen);

            updateCircleRestPosition();
            animateSpringToRest();
        }

        setTimeout(() => {
            hasMovedLogo = false;
            totalDragDistance = 0;
        }, 100);
    }

    function initializeCirclePhysics() {
        updateMenuHeightFromCSS();
        updateCircleRestPosition();
        setLogoPosition(circleRestLeft, circleRestTop);

        logoCircle.addEventListener('mousedown', event => {
            event.preventDefault();
            event.stopPropagation();
            handleLogoDragStart(event.clientX, event.clientY);
        });

        document.addEventListener('mousemove', event => handleLogoDragMove(event.clientX, event.clientY));
        document.addEventListener('mouseup', handleLogoDragEnd);

        logoCircle.addEventListener('touchstart', event => {
            event.preventDefault();
            event.stopPropagation();
            const touch = event.touches[0];
            handleLogoDragStart(touch.clientX, touch.clientY);
        }, { passive: false });

        document.addEventListener('touchmove', event => {
            if (!isDraggingLogo) return;
            event.preventDefault();
            const touch = event.touches[0];
            handleLogoDragMove(touch.clientX, touch.clientY);
        }, { passive: false });

        document.addEventListener('touchend', handleLogoDragEnd);

        window.addEventListener('scroll', () => {
            const nearBottom = isNearPageBottom();

            if (!menuOpen && nearBottom) {
                toggleMenu();
                return;
            }

            if (menuOpen && !isDraggingLogo && !nearBottom) {
                toggleMenu();
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            updateCircleRestPosition();
            if (!isDraggingLogo && !springAnimId) {
                setLogoPosition(circleRestLeft, circleRestTop);
            }
        });
    }

    // Init
    initHeaderClick();
    initializePage();
    handleNavigation();
    window.addEventListener('resize', () => {
        handleResize();
        if (!isDraggingLogo && !springAnimId) {
            updateMenuHeightFromCSS();
            updateCircleRestPosition();
            setLogoPosition(circleRestLeft, circleRestTop);
        }
    });
})();
