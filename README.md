
# Leads Tracker Chrome Extension

## Overview
Leads Tracker is a Chrome Extension that helps users save URLs and text leads for easy access and organization. With simple controls for saving input, saving the current tab, and deleting all saved leads, this tool is ideal for anyone looking to streamline their workflow.

## Features
- **Save Input:** Save a user-entered lead or text input.
- **Save Current Tab:** Quickly save the URL of the active tab in the browser.
- **Delete All Leads:** Clear all saved leads with a single click.
- **Persistence:** Uses `localStorage` to save data, ensuring leads persist even after the browser is closed.

## Installation
1. Clone or download the repository to your local system.
2. Navigate to `chrome://extensions` in your browser.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing this project.
5. The extension will now appear in your browser's extensions bar.

## Files and Directories
- **`manifest.json`**: Defines the configuration for the Chrome extension.
- **`index.html`**: The main UI of the extension, containing input fields and buttons.
- **`index.css`**: Styles for the extension's interface.
- **`index.js`**: JavaScript file handling functionality like saving and rendering leads.

## How It Works
1. **Save Input:** Enter text in the input field and click **SAVE**. This adds the text to the list of leads displayed below.
2. **Save Tab:** Click **SAVE TAB** to save the URL of the currently active tab.
3. **Delete All:** Click **DELETE** to remove all saved leads after confirming the action.

## Code Highlights
1. **Save Input:**  
   Captures text from the input field and adds it to an array of leads stored in `localStorage`.

   ```javascript
   save.addEventListener("click", function () {
       const input = input_box.value;
       if (input) {
           Lead.push(input);
           input_box.value = "";
           localStorage.setItem("Leads", JSON.stringify(Lead));
           renderLeads();
       } else {
           alert("Please enter a valid lead!");
       }
   });
   ```

2. **Save Current Tab:**  
   Fetches the active tab's URL using `chrome.tabs.query` and stores it in `localStorage`.

   ```javascript
   savetab.addEventListener("click", function () {
       chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
           const activeTabUrl = tabs[0].url;
           Lead.push(activeTabUrl);
           localStorage.setItem("Leads", JSON.stringify(Lead));
           renderLeads();
       });
   });
   ```

3. **Delete All:**  
   Clears all leads from the list and `localStorage` after user confirmation.

   ```javascript
   del.addEventListener("click", function () {
       const confirmDelete = confirm("Are you sure you want to delete all your leads?");
       if (confirmDelete) {
           localStorage.clear();
           Lead = [];
           renderLeads();
       }
   });
   ```
