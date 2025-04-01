let pasteButtons = new Map();

function isElementVisible(element) {
    const style = window.getComputedStyle(element);
    return (
        style.opacity !== '0' &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0
    );
}

function addPasteButton(input) {
    if (!isElementVisible(input)) return;
    if (pasteButtons.has(input)) return;

    const button = document.createElement('button');
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"/>
        </svg>
    `;

    Object.assign(button.style, {
        position: 'absolute',
        zIndex: '9999',
        width: '24px',
        height: '24px',
        padding: '3px',
        backgroundColor: '#222e50',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto'
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.pointerEvents = 'none';
    buttonContainer.appendChild(button);

    document.body.appendChild(buttonContainer);

    function positionButton() {
        const rect = input.getBoundingClientRect();
        buttonContainer.style.left = `${rect.right - 30}px`;
        buttonContainer.style.top = `${rect.top + (rect.height - 24) / 2}px`;
    }

    const scrollHandler = () => positionButton();
    const resizeHandler = () => positionButton();
    
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            buttonContainer.style.display = entry.isIntersecting ? 'block' : 'none';
        });
    }, { threshold: 0.1 });

    intersectionObserver.observe(input);

    positionButton();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.readText()
            .then(text => { input.value = text; })
            .catch(err => console.error('Falha ao ler área de transferência:', err));
    });

    pasteButtons.set(input, { 
        buttonContainer,
        handlers: [scrollHandler, resizeHandler],
        observer: intersectionObserver
    });
}

function removePasteButtons() {
    for (const [input, { buttonContainer, handlers, observer }] of pasteButtons) {
        handlers.forEach(handler => {
            window.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        });
        observer.disconnect();
        buttonContainer.remove();
    }
    pasteButtons.clear();
}

const mutationObserver = new MutationObserver(() => {
    pasteButtons.forEach((_, input) => {
        if (!document.body.contains(input)) {
            const data = pasteButtons.get(input);
            data.handlers.forEach(handler => {
                window.removeEventListener('scroll', handler);
                window.removeEventListener('resize', handler);
            });
            data.observer.disconnect();
            data.buttonContainer.remove();
            pasteButtons.delete(input);
        }
    });
});

mutationObserver.observe(document.body, { 
    childList: true,
    subtree: true
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.enabled) {
        document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
            if (isElementVisible(input)) {
                addPasteButton(input);
            }
        });
    } else {
        removePasteButtons();
    }
    return true;
});