
// always waits the document to be loaded when shown
document.addEventListener('DOMContentLoaded', function() {

    // opens a communication between scripts
    var port = chrome.runtime.connect();
    var bg = chrome.extension.getBackgroundPage();
    var myURL = bg.myURL;
    // listens to the click of the button into the popup content
  document.getElementById("id1").innerHTML = myURL;
});
