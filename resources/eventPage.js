chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.todo == "onRightPage") {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }
});

fetch('url') //nur Daten auslesen URL muss noch erstellt werden für Test lockale JSON Datei verwenden
.then((res) => {
  if (res.ok) {  // Error handling wenn daten nicht übertragen
    console.log('Success')
  } else {
    console.log('Error loading Data')
  }
})
.then((data) => {
  console.log(data);// später Message mit dem daten zu content js damit die Daten eingearbeitet werden können.
  // chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  //   if (req.todo == "analyticsData") {
  //     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  //       chrome.pageAction.show(tabs[0].id);
  //     });
  //   }
  // }); // villeicht erst die Daten im Background (eventPage.js) verarbeitene??
})
.catch(error => console.log('Error')); // Error handling wenn daten nicht übertragen
