# Copy Cookie to Clipboard Chrome Extension

This Chrome extension allows you to quickly copy the value of a **configurable** cookie from the current website's domain to your clipboard. Simply click the extension's icon in your Chrome toolbar.

## Features

*   Copies the value of a cookie (configurable in `background.js`).
*   Works on the active tab's domain.
*   Single-click operation via the extension icon.
*   Provides visual feedback on the icon (badge text) and tooltip if the cookie is found, not found, or an error occurs.
*   Built with Manifest V3.

## Configuration

You can easily change the name of the cookie this extension targets:

1.  Open the `background.js` file in a text editor.
2.  Near the top of the file, find the line:
    ```javascript
    const TARGET_COOKIE_NAME = "foo"; // <--- CONFIGURE COOKIE NAME HERE
    ```
3.  Change `"foo"` to the desired cookie name (e.g., `"session_id"`, `"user_token"`).
4.  Save the `background.js` file.
5.  **Reload the extension in Chrome:**
    *   Go to `chrome://extensions`.
    *   Find the "Copy Cookie to Clipboard" extension.
    *   Click the reload icon (a circular arrow).

The extension will now target the new cookie name you specified. The icon's tooltip will also update to reflect the new target cookie name.

## Files

The extension consists of the following files:

*   `manifest.json`: The manifest file that describes the extension and its permissions.
*   `background.js`: The service worker script that handles the logic for retrieving the cookie and copying it to the clipboard. **This is where you configure the target cookie name.**

## Installation

Since this extension is not (yet) on the Chrome Web Store, you'll need to load it as an unpacked extension:

1.  **Download or Clone:**
    *   If you have the files in a ZIP archive, extract them to a folder on your computer (e.g., `copy-cookie-extension`).
    *   If you're cloning a Git repository, clone it to a local directory.

2.  **Open Chrome Extensions:**
    *   Open Google Chrome.
    *   Navigate to `chrome://extensions` by typing it into the address bar and pressing Enter.

3.  **Enable Developer Mode:**
    *   In the top-right corner of the Extensions page, toggle the "Developer mode" switch to the **ON** position.

4.  **Load Unpacked:**
    *   Click the "Load unpacked" button that appears (usually on the top-left).
    *   In the file dialog, navigate to and select the folder where you saved/extracted the extension files (e.g., the `copy-cookie-extension` folder itself, not any file inside it). Click "Select Folder".

5.  **Pin the Extension (Optional but Recommended):**
    *   The "Copy Cookie to Clipboard" extension icon should now appear in your Chrome toolbar. The tooltip will reflect the currently configured `TARGET_COOKIE_NAME`.
    *   If it doesn't, click the puzzle piece icon (Extensions) in the toolbar, find "Copy Cookie to Clipboard" in the list, and click the pin icon next to it to keep it visible.

## How to Use

1.  **Configure (if needed):** Ensure the `TARGET_COOKIE_NAME` in `background.js` is set to the cookie you want to copy (see "Configuration" section above). Reload the extension if you make changes.
2.  **Navigate to a Website:** Go to any website where you expect the configured cookie to be set for that domain.
    *   To test, you can manually set the target cookie using your browser's developer tools:
        *   Open Developer Tools (F12 or Right-click -> Inspect).
        *   Go to the "Application" tab.
        *   Under "Storage" -> "Cookies", select the current domain.
        *   Click the "+" or "Add new cookie" button and set:
            *   **Name:** (your configured `TARGET_COOKIE_NAME`)
            *   **Value:** `your_test_value_here`

3.  **Click the Extension Icon:** Click the extension icon in your Chrome toolbar.

4.  **Paste:** The value of the configured cookie (if found) will be copied to your clipboard. You can now paste it (Ctrl+V or Cmd+V) into any text field, editor, or application.

5.  **Feedback:**
    *   **Icon Badge:**
        *   `Copied!`: Cookie found and copied (green badge).
        *   `N/A`: Cookie not found (red badge).
        *   `ERR`: An error occurred (orange badge).
    *   **Tooltip:** The icon's tooltip will also briefly change to indicate the status.
    *   **Console:** Detailed logs are available in the extension's service worker console. To view it:
        *   Go to `chrome://extensions`.
        *   Find the "Copy Cookie to Clipboard" extension.
        *   Click the "Service worker" link.

---

Enjoy quickly copying your configured cookies!
