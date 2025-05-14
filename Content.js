chrome.runtime.sendMessage({ action: "getTab" }, (response) => {
  if (chrome.runtime.lastError) {
    console.error("Message error:", chrome.runtime.lastError);
    return;
  }

  if (response?.success) {
    console.log(`Tab ${response.tabId} is now ${response.muted ? "muted" : "unmuted"}`);
  } else {
    console.warn("Failed to mute/unmute tab.");
  }
});