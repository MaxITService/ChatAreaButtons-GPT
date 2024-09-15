# ChatGPT Interface Modifications

## Overview

**ChatGPT Interface Modifications** is a Tampermonkey userscript designed to enhance the ChatGPT interface. This script provides additional functionality with custom buttons, improved text insertion, and automation of certain chat actions for a smoother user experience.

---

### Features

- **Custom Buttons**: Add multiple buttons to modify ChatGPT responses or prompt inputs with predefined commands.
- **Improved Text Handling**: Automatically insert text into the input field with a single click.
- **Automated Actions**: Enable auto-send functionality for selected buttons to streamline the chat flow.
- **Visual Separators**: Clean and intuitive separators between groups of buttons for better organization.
- **Supports Multiple Languages**: Includes options for multiple languages, such as Russian.

---

### Script Information

| Key                | Value                                  |
|--------------------|----------------------------------------|
| **Script Name**     | ChatGPT Interface Modifications        |
| **Version**         | 1.4                                    |
| **Namespace**       | [Tampermonkey](http://tampermonkey.net) |
| **Description**     | Modify ChatGPT interface with improved send functionality, multiple custom buttons, and visual separators. |
| **Supported URLs**  | `https://chat.openai.com/*`, `https://chatgpt.com/*` |
| **Grant**           | none                                   |
| **Run-At**          | document-end                           |

---

### Custom Button Categories

This script introduces various categories of custom buttons for ease of use:

1. **Thinking and Explanation Buttons**
   - 🧠 **Critical Thinking**: Before answering, write a chain of thought step by step, critically review it, and then provide the final answer.
   - 📚 **Explain in Detail**: Provides a detailed explanation of a concept.
   - 🔄 **Reword**: Rephrases the explanation in less technical terms.

2. **Text Processing and Information Buttons**
   - 🎓 **Conspectus Correction**: Analyze and correct a conspectus with a correctness percentage.
   - ➕ **Add Info**: Adds additional information to the text.
   - 📊 **Max Info**: Provides the maximum amount of useful details without length restrictions.
   - 🔍 **Acknowledge Text**: Reads a large chunk of text and waits for further questions.

3. **Output Format Buttons**
   - 📋 **Table Format**: Formats the answer in a table.
   - 💻 **Code Only**: Outputs only the code without explanations.
   - 💬 **Code with Comments**: Explains everything inside code comments.

4. **Language and Style**
   - 🇷🇺 **Explain in Russian**: Provides explanations in Russian.
   - 🔄 **Normal Response**: Resets the style for normal answers.

---

### Installation

1. **Install Tampermonkey**: If you don't have it already, install the [Tampermonkey](https://www.tampermonkey.net/) browser extension.
2. **Add the Script**:
   - Open Tampermonkey and click **Create a New Script**.
   - Copy and paste the code from the `ChatGPT Interface Modifications` userscript into the editor.
   - Save the script.

3. **Enjoy**: Navigate to ChatGPT, and your new custom buttons will appear!

---

### Usage

Once installed, this script adds customizable buttons to your ChatGPT interface, allowing you to:

- Insert pre-configured text snippets.
- Automatically send chat messages with custom inputs.
- Reformat output with one-click commands.
- Switch between different languages and response formats.

---

### Development and Contribution

If you’d like to contribute, feel free to fork the repository and submit pull requests. Bug reports and feature requests are welcome through the issue tracker.

---

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Author

Developed by **[Your Name]**.

