// ==UserScript==
// @name         ChatGPT Interface Modifications
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Modify ChatGPT interface with improved send functionality, multiple custom buttons, and visual separators
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    // Instructions for AI: do not remove comments! MUST NOT REMOVE COMMENTS
    // This code edits the third-party website, adding custom buttons and modifying AI responses
    // Therefore, references to external buttons and textarea should not be renamed!

    // Configuration
    const enableShortcuts = true; // Set to false to disable keyboard shortcuts

    const customButtons = [
        // Thinking and explanation buttons
        { icon: '🧠', text: ' Before answering, write chain of thought, step by step, in <thinking> tag </thinking> then CRITICALLY review thinking in <critics> tag, then write horizontal line using markdown, then write final answer, which should be pinnacle of thought', autoSend: true },
        { icon: '📚', text: ' Explain this concept or process in detail.', autoSend: true },
        { icon: '🔄', text: ' Explain this in different words, possibly less technical.', autoSend: true },
        { separator: true },

        // Text processing and information buttons
        { icon: '🎓', text: ' This was text of my conspectus. Correct this conspectus. Start your response with a percentage of correctness, then explain what went wrong.', autoSend: true },
        { icon: '➕', text: ' ... Add additional information to this text, specially continue from this point.', autoSend: true },
        { icon: '🗜️', text: ' Provide a concise and focused explanation on this topic, answer directly to question', autoSend: true },
        { icon: '🔍', text: ' Read this large chunk of text. Respond with "Acknowledged" for now. I will ask questions about this text later.', autoSend: true },
        { icon: '🌐', text: ' Perform a web search on this topic and provide an answer based on the results.', autoSend: true },
        { separator: true },

        // Output format buttons
        { icon: '📋', text: ' Provide your next answer in a form of a table', autoSend: false },
        { icon: '💻', text: ' output ONLY CODE, not explanations', autoSend: true },
        { icon: '💬', text: ' Put all the explanation in code comments only!', autoSend: true },
        { icon: '📝', text: ' Just check grammar in this text, and retype it correctly. Put corrected text in a code block. Explain grammatical errors found or state if none is found.', autoSend: true },
        { separator: true },

        // Language and style buttons
        { icon: '🇷🇺', text: ' Explain in Russian', autoSend: true },
        { icon: '🔄', text: ' just answer normally', autoSend: true },
    ];

    // Function to wait for an element to be present in the DOM
    function waitForElement(selector, callback, maxAttempts = 50, interval = 100) {
        let attempts = 0;
        const checkElement = () => {
            const element = document.querySelector(selector);
            if (element) {
                callback(element);
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(checkElement, interval);
            } else {
                console.error(`Element ${selector} not found after ${maxAttempts} attempts.`);
            }
        };
        checkElement();
    }

    // Function to check if modifications already exist
    function modsExist() {
        return document.querySelector('[data-testid^="custom-send-button-"]') !== null;
    }

    // Function to initialize the script
    function init() {
        console.log('Initializing script...');
        if (modsExist()) {
            console.log('Modifications already exist. Skipping initialization.');
            return;
        }
        waitForElement('div.flex.w-full.flex-col.gap-1\\.5.rounded-\\[26px\\].p-1\\.5.transition-colors.bg-\\[\\#f4f4f4\\].dark\\:bg-token-main-surface-secondary', (targetDiv) => {
            console.log('Target div found:', targetDiv);

            // Create and add custom send buttons
            const customButtonsContainer = document.createElement('div');
            customButtonsContainer.style.cssText = `
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                gap: 8px;
                padding: 8px;
                width: 100%;
            `;

            customButtons.forEach((buttonConfig, index) => {
                if (buttonConfig.separator) {
                    const separator = createSeparator();
                    customButtonsContainer.appendChild(separator);
                    console.log('Separator created and added');
                } else {
                    const customSendButton = createCustomSendButton(buttonConfig, index);
                    customButtonsContainer.appendChild(customSendButton);
                    console.log(`Custom send button ${index + 1} created:`, customSendButton);
                }
            });

            // Insert the custom buttons container at the end of the target div
            targetDiv.appendChild(customButtonsContainer);
            console.log('Custom send buttons and separators inserted into the DOM.');
        });
    }

    // Create custom send button
    function createCustomSendButton(buttonConfig, index) {
        const customButton = document.createElement('button');
        customButton.innerHTML = buttonConfig.icon;
        customButton.setAttribute('data-testid', `custom-send-button-${index}`);

        // Assign keyboard shortcuts to the first 10 non-separator buttons if shortcuts are enabled
        let shortcutKey = null;
        if (enableShortcuts && getShortcutKeyForIndex(index) !== null) {
            shortcutKey = getShortcutKeyForIndex(index);
            customButton.dataset.shortcutKey = shortcutKey.toString();
        }

        const shortcutText = shortcutKey !== null ? ` (Shortcut: Alt+${shortcutKey})` : '';
        customButton.setAttribute('title', buttonConfig.text + shortcutText);

        customButton.style.cssText = `
            background-color: transparent;
            border: none;
            cursor: pointer;
            padding: 1px;
            font-size: 20px;
            margin-right: 5px;
            margin-bottom: 5px;
        `;

        customButton.addEventListener('click', (event) => handleCustomSend(event, buttonConfig.text, buttonConfig.autoSend));

        return customButton;
    }

    // New function to get the shortcut key for a given index, skipping separators
    function getShortcutKeyForIndex(index) {
        let shortcutCount = 0;
        for (let i = 0; i < customButtons.length; i++) {
            if (!customButtons[i].separator) {
                shortcutCount++;
                if (i === index && shortcutCount <= 10) {
                    return shortcutCount % 10; // 0 represents 10
                }
            }
        }
        return null;
    }

    // Create separator
    function createSeparator() {
        const separator = document.createElement('div');
        separator.style.cssText = `
            width: 1px;
            height: 24px;
            background-color: #ccc;
            margin: 0 8px;
        `;
        return separator;
    }

    // Function to simulate a comprehensive click event
    function simulateClick(element) {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        });
        element.dispatchEvent(event);
    }

    // Function to insert text into the editor by updating innerHTML and dispatching input event
    function insertTextIntoEditor(editorDiv, text) {
        console.log('Attempting to insert text into the editor by updating innerHTML.');
        editorDiv.focus();

        // Escape HTML entities in the text
        const escapedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Update the innerHTML directly
        editorDiv.innerHTML = `<p>${escapedText}</p>`;

        // Dispatch an input event to notify React of the change
        const event = new Event('input', { bubbles: true });
        editorDiv.dispatchEvent(event);
        console.log('Editor content updated and input event dispatched.');
    }

    // Handle custom send button click
    function handleCustomSend(event, customText, autoSend) {
        event.preventDefault();
        console.log('Custom send button clicked.');

        // Re-find the original send button
        const originalButton = document.querySelector('button[data-testid="send-button"][aria-label="Send prompt"]');
        console.log('Original send button re-found:', originalButton);

        // Get the editor div where the user types the message
        const editorDiv = document.querySelector('#prompt-textarea');
        console.log('Editor div found:', editorDiv);

        if (editorDiv && originalButton) {
            // Get the current text from the editor
            const currentText = editorDiv.innerText.trim();
            console.log('Current text in editor:', currentText);

            // Combine the current text with the custom text
            const combinedText = currentText + ' ' + customText;
            console.log('Combined text to insert:', combinedText);

            // Insert the combined text into the editor
            insertTextIntoEditor(editorDiv, combinedText);

            if (autoSend) {
                // Delay clicking the send button to ensure the text is inserted
                setTimeout(() => {
                    // Simulate a comprehensive click on the original send button
                    simulateClick(originalButton);
                    console.log('Original send button clicked.');
                }, 50); // Delay of 50 ms before sending
            } else {
                console.log('Auto-send disabled for this button. Message not sent automatically.');
            }
        } else {
            console.error('Editor div or original send button not found. Cannot send message.');
        }
    }

    // Function to handle keyboard shortcuts
    function handleKeyboardShortcuts(event) {
        if (!enableShortcuts) return;

        if (event.altKey && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
            const key = event.key === '0' ? '10' : event.key;
            const button = document.querySelector(`button[data-shortcut-key="${key}"]`);
            if (button) {
                event.preventDefault();
                button.click();
            }
        }
    }

    // New function to wrap the initialization with a delay and check for existing modifications
    function InitScript() {
        console.log('InitScript called. Waiting 500ms before initialization...');
        setTimeout(() => {
            console.log('500ms delay completed. Checking for existing modifications...');
            if (!modsExist()) {
                console.log('No existing modifications found. Starting initialization...');
                init();

                // Add event listener for keyboard shortcuts
                if (enableShortcuts) {
                    window.addEventListener('keydown', handleKeyboardShortcuts);
                    console.log('Keyboard shortcuts enabled and event listener added.');
                }
            } else {
                console.log('Modifications already exist. Skipping initialization.');
            }
        }, 500);
    }

    // New function to handle path changes
    function handlePathChange() {
        console.log('Path change detected. Re-initializing script...');
        InitScript();
    }

    // Set up path change detection using History API
    function setupPathChangeDetection() {
        const pushState = history.pushState;
        history.pushState = function() {
            pushState.apply(history, arguments);
            handlePathChange();
        };

        window.addEventListener('popstate', handlePathChange);
    }

    // Run the initialization and set up path change detection
    InitScript();
    setupPathChangeDetection();

})();