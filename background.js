chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(sender)
  if (msg.action === "setMute") {
    const tabId = sender.tab?.id;
    const shouldMute = msg.mute;

    if (!tabId) {
      console.warn("No tab ID provided.");
      sendResponse({ success: false });
      return;
    }

    chrome.tabs.update(tabId, { muted: shouldMute }, () => {
      console.log(`Tab ${tabId} is now ${shouldMute ? "muted" : "unmuted"}`);
      sendResponse({ success: true });
    });

    return true; 
  }
});