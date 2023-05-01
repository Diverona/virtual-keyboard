class Keyboard {
  constructor() {
    // Create textarea
    this.textarea = document.createElement("textarea");
    this.textarea.id = "input-area";
    this.textarea.cols = "30";
    this.textarea.rows = "10";
    this.textarea.className = "keyboard__textarea";
    this.textarea.placeholder = "Type something...";

    // Create keyboard
    this.container = document.createElement("div");
    this.container.className = "keyboard__container";

    // Create keyboard rows container
    this.rowsContainer = document.createElement("div");
    this.rowsContainer.className = "keyboard__rows";

    // Add rows to rows container
    for (let i = 0; i < 5; i++) {
      const rowElement = document.createElement("div");
      rowElement.className = "keyboard__row";
      this.rowsContainer.appendChild(rowElement);
    }

    // Add title, textarea and keyboard to a common container
    const main = document.createElement("main");
    main.className = "main";
    const container = document.createElement("div");
    container.className = "container";
    const title = document.createElement("h1");
    title.className = "title";
    title.innerHTML = "Virtual Keyboard";
    container.appendChild(title);
    container.appendChild(this.container);
    this.container.appendChild(this.textarea);
    this.container.appendChild(this.rowsContainer);
    main.appendChild(container);
    document.body.appendChild(main);

    this.keys = [];
    this.currentLanguage = "english";
    this.shifted = false;
    this.capsLock = false;
    this.createKeys();
    this.addPhysicalKeyboardListener();
  }

  createKeys() {
    const keyLayouts = [
      [
        { key: "backtick", value: "`" },
        { key: "1", value: "1" },
        { key: "2", value: "2" },
        { key: "3", value: "3" },
        { key: "4", value: "4" },
        { key: "5", value: "5" },
        { key: "6", value: "6" },
        { key: "7", value: "7" },
        { key: "8", value: "8" },
        { key: "9", value: "9" },
        { key: "0", value: "0" },
        { key: "minus", value: "-" },
        { key: "equals", value: "=" },
        { key: "backspace", value: "Backspace", wide: true },
      ],
      [
        { key: "tab", value: "Tab", wide: true },
        { key: "q", value: "q" },
        { key: "w", value: "w" },
        { key: "e", value: "e" },
        { key: "r", value: "r" },
        { key: "t", value: "t" },
        { key: "y", value: "y" },
        { key: "u", value: "u" },
        { key: "i", value: "i" },
        { key: "o", value: "o" },
        { key: "p", value: "p" },
        { key: "bracket-left", value: "[" },
        { key: "bracket-right", value: "]" },
        { key: "backslash", value: "\\" },
      ],
      [
        { key: "caps-lock", value: "Caps Lock", wide: true },
        { key: "a", value: "a" },
        { key: "s", value: "s" },
        { key: "d", value: "d" },
        { key: "f", value: "f" },
        { key: "g", value: "g" },
        { key: "h", value: "h" },
        { key: "j", value: "j" },
        { key: "k", value: "k" },
        { key: "l", value: "l" },
        { key: "semicolon", value: ";" },
        { key: "quote", value: "'" },
        { key: "enter", value: "Enter", wide: true },
      ],
      [
        { key: "shift-left", value: "Shift", wide: true },
        { key: "z", value: "z" },
        { key: "x", value: "x" },
        { key: "c", value: "c" },
        { key: "v", value: "v" },
        { key: "b", value: "b" },
        { key: "n", value: "n" },
        { key: "m", value: "m" },
        { key: "comma", value: "," },
        { key: "dot", value: "." },
        { key: "up-arr", value: "&uarr;" },
        { key: "shift-right", value: "Shift", wide: true },
      ],
      [
        { key: "ctrl-left", value: "Ctrl", wide: true },
        { key: "window", value: "Win", wide: true },
        { key: "alt-left", value: "Alt", wide: true },
        { key: "space", value: "Space", wide: true },
        { key: "alt-right", value: "Alt", wide: true },
        { key: "left-arr", value: "&larr;" },
        { key: "down-arr", value: "&darr;" },
        { key: "right-arr", value: "&rarr;" },
        { key: "ctrl-right", value: "Ctrl", wide: true },
      ],
    ];

    keyLayouts.forEach((rowKeys, rowIndex) => {
      const rowElement = this.rowsContainer.children[rowIndex];

      rowKeys.forEach((keyData) => {
        const keyElement = document.createElement("button");
        keyElement.setAttribute("type", "button");
        keyElement.className = `keyboard__key ${
          keyData.wide ? "keyboard__key--wide" : ""
        }`;
        keyElement.dataset.key = keyData.key;
        keyElement.innerHTML = keyData.value;

        keyElement.addEventListener("click", () => {
          // Handling button click event
          if (
            keyData.key === "backspace" ||
            keyData.key === "tab" ||
            keyData.key === "caps-lock" ||
            keyData.key === "enter" ||
            keyData.key === "shift-left" ||
            keyData.key === "shift-right" ||
            keyData.key === "ctrl-left" ||
            keyData.key === "window" ||
            keyData.key === "alt-left" ||
            keyData.key === "alt-right" ||
            keyData.key === "ctrl-right"
          ) {
            // Handle special keys here
          } else {
            // Append the character value to the textarea
            this.textarea.value += keyData.value;
            this.textarea.focus(); // Set the focus back to the textarea after appending the character
          }
        });

        rowElement.appendChild(keyElement);
      });
    });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const keyboard = new Keyboard();
});
