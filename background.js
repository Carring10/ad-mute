chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getTab") {
    const tabId = sender.tab?.id;

    if (!tabId) {
      console.warn("No tab ID received from sender.");
      sendResponse({ success: false });
      return;
    }

    console.log("Received tab ID:", tabId);

    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.error("Error getting tab:", chrome.runtime.lastError);
        sendResponse({ success: false });
        return;
      }

      const muted = !tab.mutedInfo.muted;
      chrome.tabs.update(tabId, { muted }, () => {
        console.log(`Tab ${tab.id} is now ${muted ? "muted" : "unmuted"}`);
        sendResponse({ success: true, tabId, muted });
      });
    });

    return true;
  }
});