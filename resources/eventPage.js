var dataExample = [
    {
      "Seite": "/index.php",
      "Ereignisaktion": "Nav Bar Click",
      "EreignisseGesamt": 23,
      "Nutzer": 1
    },
     {
      "Seite": "/index.php",
      "Ereignisaktion": "Nav Bar Click",
      "EreignisseGesamt": 48,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "100%",
      "EreignisseGesamt": 2,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "25%",
      "EreignisseGesamt": 20,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "50%",
      "EreignisseGesamt": 10,
      "Nutzer": 1
    },
    {
      "Seite": "/index.php",
      "Ereignisaktion": "75%",
      "EreignisseGesamt": 5,
      "Nutzer": 1
    }
    ];


var dataExampleIndex = [
    {
      "woher": "Suchmaschienen",
      "zeit": "180 sec"
    },
    {
      "Ereignisaktion": "Nav Bar Click",
      "Ereignislabel": "/produkte.php",
      "EreignisseGesamt": 20,
      "Nutzer": 1
    },
    {
      "Ereignisaktion": "Nav Bar Click",
      "Ereignislabel": "/unternehmen.php",
      "EreignisseGesamt": 5,
      "Nutzer": 1
    },
    {
      "Ereignisaktion": "Button click",
      "Ereignislabel": "/unternehmen.php",
      "EreignisseGesamt": 13,
      "Nutzer": 1
    },
    {
      "Ereignisaktion": "Button click",
      "Ereignislabel": "/interpack-2020.php",
      "EreignisseGesamt": 48,
      "Nutzer": 1
    },
    {
      "Ereignisaktion": "Button click",
      "Ereignislabel": "/karriere.php",
      "EreignisseGesamt": 4,
      "Nutzer": 1
    },
    {
      "Ereignisaktion": "25%",
      "Ereignislabel": "",
      "EreignisseGesamt": 50,
      "Nutzer": 1
    },
    {
      "Ereignisaktion": "50%",
      "Ereignislabel": "",
      "EreignisseGesamt": 30,
      "Nutzer": 1
    },
    {
      "Ereignisaktion": "75%",
      "Ereignislabel": "",
      "EreignisseGesamt": 20,
      "Nutzer": 1
    },
    {
      "Ereignisaktion": "100%",
      "Ereignislabel": "",
      "EreignisseGesamt": 14,
      "Nutzer": 1
    }
    ];

 var myURL = '';
 var aktuelleURL = '';


chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  // Aktuelle Seiten URL Auslesen
   var aktuelleURL = '';
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    console.log(tabs[0].url);
    let aktuelleURL = tabs[0].url;

    if (aktuelleURL.includes("index")) {

      chrome.tabs.sendMessage(tabs[0].id, {
        dataTap: dataExampleIndex
      }, function(response) {

      });

    } else if (aktuelleURL.includes("produkte")) {

    }

         //   for (var i = 0; i < dataExample.length; i++) {
         //    if (aktuelleURL.includes(dataExample[i].Seite)) {
         //      console.log();
         //      if (dataExample[i].Ereignisaktion == "Nav Bar Click") {
         //        //7console.log("ENTHALTEN");
         //        chrome.tabs.sendMessage(tabs[0].id, {
         //          navClick: dataExample[i].EreignisseGesamt
         //        }, function(response) {
         //
         //        });
         //      }
         //
         //      if (dataExample[i].Ereignisaktion == "100%") {
         //        console.log("ENTHALTEN Schroll Data");
         //        chrome.tabs.sendMessage(tabs[0].id, {
         //          scroll: dataExample[i].EreignisseGesamt
         //        }, function(response) {
         //
         //        });
         //      }
         //
         //    }
         // }
  });

  //Überprüfen ob auf Krones Seite
  if (req.todo == "onRightPage") {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }


  console.log("ULR:" + aktuelleURL);
});






//
fetch('https://florian-gast.de/JSON/test.json', {
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((response) => {
    console.log(response);
    return response;
    console.log(response);
  })
  .then((data) => {
    myURL = data.class;
      console.log('test' + myURL);
        //console.log(myURL);
  });


//     fetch(url, {
//     mode: 'cors', // no-cors, *cors, same-origin
//
//   });
//
// fetch('http://florian-gast.de/JSON/test.json', {mode: 'no-cors'}) //nur Daten auslesen URL muss noch erstellt werden für Test lockale JSON Datei verwenden
// .then((res) => {
//   if (res.ok) {  // Error handling wenn daten nicht übertragen
//     console.log('Success')
//   } else {
//     console.log('Error loading Data')
//   }
// })
// .then((data) => {
//
//   document.getElementById("test1").innerHTML = data.students;
//   console.log(data);// später Message mit dem daten zu content js damit die Daten eingearbeitet werden können.
//   // chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
//   //   if (req.todo == "analyticsData") {
//   //     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//   //       chrome.pageAction.show(tabs[0].id);
//   //     });
  //   }
  // }); // villeicht erst die Daten im Background (eventPage.js) verarbeitene??
// })
//.catch(error => console.log('Error')); // Error handling wenn daten nicht übertragen
