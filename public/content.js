let isEnabled = false;

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

async function pasteClipboardContent(input) {
    try {
        const text = await navigator.clipboard.readText();
        input.value = text;
    } catch (error) {
        console.error('Erro ao acessar a área de transferência:', error);
    }
}

function addPasteButton(input) {
    if (input.nextElementSibling && input.nextElementSibling.classList.contains('paste-button-container')) {
        return;
    }

    const container = document.createElement('div');
    container.classList.add('paste-button-container'); // Adiciona uma classe para identificação
    container.style.position = 'relative';
    container.style.display = 'inline-block';

    input.parentNode.insertBefore(container, input);
    container.appendChild(input);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.right = '10px';
    buttonContainer.style.top = '5px';
    buttonContainer.style.zIndex = '10px';
    const shadow = buttonContainer.attachShadow({ mode: 'open' });

    const pasteButton = document.createElement('button');
    pasteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"/>
      </svg>
    `;

    const style = document.createElement('style');
    style.textContent = `
      button {
        padding: 2px 5px 0px 5px;
        margin: 0px;
        background-color: #222e50;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        box-sizing: border-box;
        outline: none;
        line-height: normal;
        vertical-align: baseline;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(pasteButton);

    container.appendChild(buttonContainer);

    pasteButton.addEventListener('click', () => {
        pasteClipboardContent(input);
    });
}

function removePasteButtons() {
    const containers = document.querySelectorAll('.paste-button-container');
    containers.forEach(container => {
        const input = container.querySelector('input, textarea');
        if (input) {
            container.parentNode.insertBefore(input, container);
        }
        container.remove();
    });
}

chrome.runtime.onMessage.addListener((message) => {
    isEnabled = message.enabled;

    if (isEnabled) {
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="tel"], input[type="url"], input[type="search"]');
        inputs.forEach(input => {
            if (isElementVisible(input)) {
                addPasteButton(input);
            }
        });
    } else {
        removePasteButtons();
    }
});