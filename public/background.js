chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openTab") {
        chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
      chrome.action.openPopup();
    }
  });