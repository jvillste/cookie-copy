// --- Configuration ---
const TARGET_COOKIE_NAME = "foo"; // <--- CONFIGURE COOKIE NAME HERE
// ---------------------

// Function to be injected into the active tab to perform the copy operation
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log(`Cookie value for "${TARGET_COOKIE_NAME}" copied to clipboard successfully!`);
    })
    .catch(err => {
      console.error(`Failed to copy cookie value for "${TARGET_COOKIE_NAME}" to clipboard: `, err);
    });
}

// Listener for when the extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
  // Ensure the tab has a URL and it's http/https
  if (!tab.url || !tab.url.startsWith("http")) {
    console.log("Cannot get cookies for this tab:", tab.url);
    const originalTitle = `Copy '${TARGET_COOKIE_NAME}' cookie`;
    chrome.action.setTitle({ tabId: tab.id, title: "Cannot access cookies for this page." });
    setTimeout(() => {
        chrome.action.setTitle({ tabId: tab.id, title: originalTitle });
    }, 3000);
    return;
  }

  console.log(`Trying to get '${TARGET_COOKIE_NAME}' cookie for URL:`, tab.url);

  try {
    const cookie = await chrome.cookies.get({
      url: tab.url,
      name: TARGET_COOKIE_NAME // Use the configured variable
    });

    if (cookie) {
      console.log(`Found cookie '${TARGET_COOKIE_NAME}':`, cookie.value);

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: copyToClipboard,
        args: [cookie.value]
      });

      // Optional: Provide visual feedback by briefly changing the icon or badge text
      chrome.action.setBadgeText({ text: 'Copied!', tabId: tab.id });
      chrome.action.setBadgeBackgroundColor({ color: '#4CAF50', tabId: tab.id }); // Green
      setTimeout(() => {
          chrome.action.setBadgeText({ text: '', tabId: tab.id });
      }, 2000); // Clear badge after 2 seconds

    } else {
      console.log(`Cookie '${TARGET_COOKIE_NAME}' not found on this domain.`);
      const originalTitle = `Copy '${TARGET_COOKIE_NAME}' cookie`;
      chrome.action.setTitle({ tabId: tab.id, title: `Cookie '${TARGET_COOKIE_NAME}' not found!` });
      chrome.action.setBadgeText({ text: 'N/A', tabId: tab.id });
      chrome.action.setBadgeBackgroundColor({ color: '#FF0000', tabId: tab.id }); // Red
      setTimeout(() => {
           chrome.action.setTitle({ tabId: tab.id, title: originalTitle });
           chrome.action.setBadgeText({ text: '', tabId: tab.id });
      }, 3000);
    }
  } catch (error) {
    console.error("Error getting cookie or executing script:", error);
    const originalTitle = `Copy '${TARGET_COOKIE_NAME}' cookie`;
    chrome.action.setTitle({ tabId: tab.id, title: `Error: ${error.message.substring(0, 30)}...` }); // Truncate long error messages
    chrome.action.setBadgeText({ text: 'ERR', tabId: tab.id });
    chrome.action.setBadgeBackgroundColor({ color: '#FFA500', tabId: tab.id }); // Orange
     setTimeout(() => {
           chrome.action.setTitle({ tabId: tab.id, title: originalTitle });
           chrome.action.setBadgeText({ text: '', tabId: tab.id });
     }, 5000);
  }
});

// Set the initial title based on the configured cookie name
// This runs once when the service worker starts
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setTitle({ title: `Copy '${TARGET_COOKIE_NAME}' cookie` });
});
chrome.runtime.onStartup.addListener(() => { // Also on browser startup
  chrome.action.setTitle({ title: `Copy '${TARGET_COOKIE_NAME}' cookie` });
});
