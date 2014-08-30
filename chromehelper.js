var chromehelper = (function() {

  var privateTabId = null;

  function publicGetTabId(callback) {
    if (!chrome.tabs) {
      if (privateTabId) {
        callback(privateTabId);
      }
      else {
        chrome.runtime.sendMessage('get_tab_id', function(response) {
          callback(response);
        });
      }
    }
    else {
      console.warn("ERROR, getTabId should not be called from the background page");
    }
  }

  function privateRegisterListener() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message === 'get_tab_id') {
        sendResponse(sender.tab.id);
      }
    });
  }

  privateRegisterListener();

  return {
    getTabId: publicGetTabId
  };
}());
