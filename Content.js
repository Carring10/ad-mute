function checkForAdAndNotify() {
  const isAd = document.querySelector('.CoreText-sc-1txzju1-0.ckwzla') !== null;

  console.log("Ad?", isAd);
  console.log(document.querySelector('.CoreText-sc-1txzju1-0.ckwzla'))

  chrome.runtime.sendMessage({ action: "setMute", mute: isAd }, (response) => {
    console.log(`Mute toggle sent. Ad is ${isAd}. Response:`, response);
  });
}

const container = document.querySelector('.Layout-sc-1xcs6mc-0.SugpE') || document.body;
const observer = new MutationObserver(() => {
  checkForAdAndNotify();
});

observer.observe(container, {
  childList: true,
  subtree: true
});