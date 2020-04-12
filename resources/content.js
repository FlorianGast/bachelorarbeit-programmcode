

chrome.runtime.sendMessage({
  todo: "onRightPage",

});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.action == 'open_dialog_box') {
    alert("Message recieved!");
  }
});
//chrome.runtime.sendMessage({todo: "analyticsData"});
