function checkForAdAndNotify() {
  const isAd = document.querySelector('.CoreText-sc-1txzju1-0 ckwzla') !== null;
  console.log("Ad?", isAd);

  chrome.runtime.sendMessage({ action: "setMute", mute: isAd }, (response) => {
    console.log(`Mute toggle sent. Ad is ${isAd}. Response:`, response);
  });
}

const observer = new MutationObserver(() => {
  checkForAdAndNotify();
});

// Start observing the body class list
observer.observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});