var dataExample = [
    {
      "Seite": "/produkte.php",
      "Ereignisaktion": "Nav Bar Click",
      "Ereignisse gesamt": 10,
      "Nutzer": 1
    },
    {
      "Seite": "/produkte.php",
      "Ereignisaktion": "Button click",
      "Ereignisse gesamt": 3,
      "Nutzer": 1
    },
    {
      "Seite": "/produkte.php",
      "Ereignisaktion": "100%",
      "Ereignisse gesamt": 7,
      "Nutzer": 1
    },
    {
      "Seite": "/produkte.php",
      "Ereignisaktion": "25%",
      "Ereignisse gesamt": 7,
      "Nutzer": 1
    },
    {
      "Seite": "/produkte.php",
      "Ereignisaktion": "50%",
      "Ereignisse gesamt": 7,
      "Nutzer": 1
    },
    {
      "Seite": "/produkte.php",
      "Ereignisaktion": "75%",
      "Ereignisse gesamt": 7,
      "Nutzer": 1
    },
    {
      "Seite": "/produkte.php",
      "Ereignisaktion": "Button click",
      "Ereignisse gesamt": 3,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "Nav Bar Click",
      "Ereignisse gesamt": 1,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "100%",
      "Ereignisse gesamt": 5,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "25%",
      "Ereignisse gesamt": 5,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "50%",
      "Ereignisse gesamt": 5,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "75%",
      "Ereignisse gesamt": 5,
      "Nutzer": 1
    }
    ];


 var myURL = '';
 var aktuelleURL = '';


chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  // Aktuelle Seiten URL Auslesen
   var aktuelleURL = '';
  chrome.tabs.query({currentWindow: true, lastFocusedWindow: true}, tabs => {
    console.log(tabs[0]);
      let aktuelleURL = tabs[0].url;
      var test = [];
           for (var i = 0; i < dataExample.length; i++) {
            if (aktuelleURL.includes(dataExample[i].Seite)) {
              console.log();
              if (dataExample[i].Ereignisaktion == "Nav Bar Click") {
                console.log("ENTHALTEN");
                chrome.tabs.sendMessage(tabs[0].id, {
                  action: "open_dialog_box"
                }, function(response) {

                });
              }
            }
         }
  });

  //Überprüfen ob auf Krones Seite
  if (req.todo == "onRightPage") {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }


  console.log("ULR:" + aktuelleURL);
});







  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      myURL = data.title;
        //console.log('test' + myURL);
          //console.log(myURL);
    });

// fetch('http://florian-gast.de/JSON/test.json') //nur Daten auslesen URL muss noch erstellt werden für Test lockale JSON Datei verwenden
// .then((res) => {
//   if (res.ok) {  // Error handling wenn daten nicht übertragen
//     console.log('Success')
//   } else {
//     console.log('Error loading Data')
//   }
// })https://jsonplaceholder.typicode.com/todos/1
// .then((data) => {
//
//   document.getElementById("test1").innerHTML = data.students;
//   console.log(data);// später Message mit dem daten zu content js damit die Daten eingearbeitet werden können.
//   // chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
//   //   if (req.todo == "analyticsData") {
//   //     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//   //       chrome.pageAction.show(tabs[0].id);
//   //     });
//   //   }
//   // }); // villeicht erst die Daten im Background (eventPage.js) verarbeitene??
// })
//.catch(error => console.log('Error')); // Error handling wenn daten nicht übertragen
