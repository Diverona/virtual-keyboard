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
    const text1 = document.createElement("p");
    const text2 = document.createElement("p");
    text1.innerHTML = "Клавиатура создана в операционной системе Windows";
    text2.innerHTML = "Для переключения языка комбинация: ctrl + alt";

    container.appendChild(title);
    container.appendChild(this.container);
    this.container.appendChild(this.textarea);
    this.container.appendChild(this.rowsContainer);
    main.appendChild(container);
    document.body.appendChild(main);
    container.append(text1);
    container.append(text2);

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
        { key: "delete", value: "Del", wide: true },
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
        { key: "up-arr", value: "↑" },
        { key: "shift-right", value: "Shift", wide: true },
      ],
      [
        { key: "ctrl-left", value: "Ctrl", wide: true },
        { key: "window", value: "Win", wide: true },
        { key: "alt-left", value: "Alt", wide: true },
        { key: "space", value: "Space", wide: true },
        { key: "alt-right", value: "Alt", wide: true },
        { key: "left-arr", value: "←" },
        { key: "down-arr", value: "↓" },
        { key: "right-arr", value: "→" },
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

        // Добавить ключ в массив keys
        this.keys.push(keyElement);

        keyElement.addEventListener("click", () => {
          // Handling button click event
          if (
            [
              "ctrl-left",
              "ctrl-right",
              "alt-left",
              "alt-right",
              "shift-left",
              "shift-right",
              "window",
            ].includes(keyData.key)
          ) {
            // Do nothing for these special keys
            return;
          }

          // Handling button click event
          if (
            [
              "backspace",
              "tab",
              "delete",
              "caps-lock",
              "enter",
              "space",
            ].includes(keyData.key)
          ) {
            const startPosition = this.textarea.selectionStart;
            const endPosition = this.textarea.selectionEnd;
            switch (keyData.key) {
              case "space":
                this.textarea.value =
                  this.textarea.value.slice(0, startPosition) +
                  " " +
                  this.textarea.value.slice(endPosition);
                this.textarea.setSelectionRange(
                  startPosition + 1,
                  startPosition + 1
                ); // Set cursor position after the space
                break;

              case "backspace":
                if (startPosition !== endPosition) {
                  this.textarea.value =
                    this.textarea.value.slice(0, startPosition) +
                    this.textarea.value.slice(endPosition);
                  this.textarea.setSelectionRange(startPosition, startPosition); // Set cursor position after deletion
                } else if (startPosition > 0) {
                  this.textarea.value =
                    this.textarea.value.slice(0, startPosition - 1) +
                    this.textarea.value.slice(startPosition);
                  this.textarea.setSelectionRange(
                    startPosition - 1,
                    startPosition - 1
                  ); // Set cursor position after deletion
                }
                break;

              case "tab":
                this.textarea.value =
                  this.textarea.value.slice(0, startPosition) +
                  "\t" +
                  this.textarea.value.slice(endPosition);
                this.textarea.setSelectionRange(
                  startPosition + 1,
                  startPosition + 1
                );
                break;

              case "delete":
                if (startPosition !== endPosition) {
                  this.textarea.value =
                    this.textarea.value.slice(0, startPosition) +
                    this.textarea.value.slice(endPosition);
                } else if (startPosition < this.textarea.value.length) {
                  this.textarea.value =
                    this.textarea.value.slice(0, startPosition) +
                    this.textarea.value.slice(startPosition + 1);
                }
                this.textarea.setSelectionRange(startPosition, startPosition); // Set cursor position after deletion
                break;

              case "caps-lock":
                this.toggleCapsLock(); // Implement caps lock behavior here
                break;

              case "enter":
                this.textarea.value =
                  this.textarea.value.slice(0, startPosition) +
                  "\n" +
                  this.textarea.value.slice(endPosition);
                this.textarea.setSelectionRange(
                  startPosition + 1,
                  startPosition + 1
                ); // Set cursor position after the new line
                break;
            }
          } else {
            // Append the character value to the textarea
            this.textarea.value += this.capsLock
              ? keyData.value.toUpperCase()
              : keyData.value;
          }

          this.textarea.focus(); // Set the focus back to the textarea after appending the character
        });

        rowElement.appendChild(keyElement);
      });
    });
  }

  toggleCapsLock() {
    this.capsLock = !this.capsLock;
    const capsLockKey = document.querySelector(
      '.keyboard__key[data-key="caps-lock"]'
    );
    capsLockKey.classList.toggle("keyboard__key--active");

    this.keys.forEach((key) => {
      const keyValue = key.innerHTML;
      if (keyValue.length === 1 && keyValue.match(/[a-zа-яё]/i)) {
        key.innerHTML = this.capsLock
          ? keyValue.toUpperCase()
          : keyValue.toLowerCase();
      }
    });
  }

  addPhysicalKeyboardListener() {
    window.addEventListener("keydown", (event) => {
      let key = event.code.toLowerCase();
      if (key === "space") key = "space";
      if (key === "metaleft" || key === "metaright") key = "window";
      if (key.startsWith("key")) key = key.slice(3);
      if (key.startsWith("digit")) key = key.slice(5);
      if (key === "arrowleft") key = "left-arr";
      if (key === "arrowright") key = "right-arr";
      if (key === "arrowup") key = "up-arr";
      if (key === "arrowdown") key = "down-arr";
      // Обработка события Caps Lock
      if (event.code.toLowerCase() === "capslock") {
        this.toggleCapsLock();
        event.stopPropagation();
        event.preventDefault();
      }

      const keyElement = document.querySelector(
        `.keyboard__key[data-key="${key}"]`
      );

      if (keyElement) {
        event.stopPropagation();
        event.preventDefault(); // Prevent default behavior

        // Highlight the corresponding button on the virtual keyboard
        keyElement.classList.add("keyboard__key--active");

        // Handle special keys
        const startPosition = this.textarea.selectionStart;
        const endPosition = this.textarea.selectionEnd;

        if (["backspace", "tab", "enter", "delete"].includes(key)) {
          switch (key) {
            case "backspace":
              if (startPosition !== endPosition) {
                this.textarea.value =
                  this.textarea.value.slice(0, startPosition) +
                  this.textarea.value.slice(endPosition);
                this.textarea.setSelectionRange(startPosition, startPosition);
              } else if (startPosition > 0) {
                this.textarea.value =
                  this.textarea.value.slice(0, startPosition - 1) +
                  this.textarea.value.slice(startPosition);
                this.textarea.setSelectionRange(
                  startPosition - 1,
                  startPosition - 1
                );
              }
              break;
            case "tab":
              this.textarea.value =
                this.textarea.value.slice(0, startPosition) +
                "\t" +
                this.textarea.value.slice(endPosition);
              this.textarea.setSelectionRange(
                startPosition + 1,
                startPosition + 1
              );
              break;
            case "enter":
              this.textarea.value =
                this.textarea.value.slice(0, startPosition) +
                "\n" +
                this.textarea.value.slice(endPosition);
              this.textarea.setSelectionRange(
                startPosition + 1,
                startPosition + 1
              );
              break;
            case "delete":
              if (startPosition !== endPosition) {
                this.textarea.value =
                  this.textarea.value.slice(0, startPosition) +
                  this.textarea.value.slice(endPosition);
              } else if (startPosition < this.textarea.value.length) {
                this.textarea.value =
                  this.textarea.value.slice(0, startPosition) +
                  this.textarea.value.slice(startPosition + 1);
              }
              this.textarea.setSelectionRange(startPosition, startPosition);
              break;
          }
        } else {
          // Append the character value to the textarea for non-special keys
          this.textarea.value += event.key;
        }

        // Remove highlight after a short delay
        setTimeout(() => {
          keyElement.classList.remove("keyboard__key--active");
        }, 200);

        this.textarea.focus();
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const keyboard = new Keyboard();
});
