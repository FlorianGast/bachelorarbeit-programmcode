

chrome.runtime.sendMessage({
  todo: "onRightPage",

});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

  //console.log(msg.dataTap);







//einglenden der Allgemeinen Daten
var divInfo = document.createElement("div");
var woher = document.createElement("p");
var wieLange = document.createElement("p");
var btnNav = document.createElement("BUTTON");
var btnKlickBtn = document.createElement("BUTTON");
var btnScroll = document.createElement("BUTTON");

divInfo.setAttribute("class", "infoBox");
btnNav.setAttribute("class", "button");
btnKlickBtn.setAttribute("class", "button");
btnScroll.setAttribute("class", "button");

woher.innerHTML = "Besucher kamen am häufigsten von: " + msg.dataTap[0].woher;
wieLange.innerHTML = "Besucher waren durchschnittlich auf dieser Seite: " + msg.dataTap[0].zeit;
btnNav.innerHTML = "NavBar Info";
btnKlickBtn.innerHTML = "Button Klick Info";
btnScroll.innerHTML = "Scrolltiefe Info";

divInfo.appendChild(woher);
divInfo.appendChild(wieLange);
divInfo.appendChild(btnNav);
divInfo.appendChild(btnKlickBtn);
divInfo.appendChild(btnScroll);

document.querySelector("footer").appendChild(divInfo);

// funktion zum ermittel der gesamt Scrolls
  var scrollGesamt = 0;

  for (var i = 0; i < msg.dataTap.length; i++) {

    if (msg.dataTap[i].Ereignisaktion == "100%" || msg.dataTap[i].Ereignisaktion == "75%" || msg.dataTap[i].Ereignisaktion == "50%" || msg.dataTap[i].Ereignisaktion == "25%") {

      scrollGesamt = scrollGesamt + msg.dataTap[i].EreignisseGesamt;
      //console.log("GESMANT: " + scrollGesamt);

    }
  }


  //auswerten der erhaltenen Daten
  var navBarSize = document.querySelector(".bare-list--horizontal").childElementCount;
  var buttonSize = document.getElementsByClassName("btn-hollow").length

  for (var i = 0; i < msg.dataTap.length; i++) {
    //console.log(msg.dataTap[i].Ereignislabel);

    var linkeUrl = msg.dataTap[i].Ereignislabel;

  //Verarbeiten der Klicks an der Naviagtions Bar
    if (msg.dataTap[i].Ereignisaktion == "Nav Bar Click") {

       for (var j = 0; j < navBarSize; j++) {
//         console.log(j);
       if (document.querySelector(".bare-list--horizontal").children[j].firstElementChild.href.includes(linkeUrl)) {
         var divPopUp = document.createElement("div");
         var popUp = document.createElement("span");
         //var text = document.createTextNode(msg.dataTap[i].EreignisseGesamt);
         divPopUp.setAttribute("class", "tooltip");
         popUp.setAttribute("class", "tooltiptext");
         //para.innerHTML = "Click-Rate";
         popUp.innerHTML = "Click-Rate: " + msg.dataTap[i].EreignisseGesamt;
         divPopUp.appendChild(popUp);
         document.querySelector(".bare-list--horizontal").children[j].appendChild(divPopUp);
       }
     }


  }

  if (msg.dataTap[i].Ereignisaktion == "Button click") {
    for (var k = 0; k < buttonSize; k++) {

      console.log("Button Link before " + document.getElementsByClassName("btn-hollow")[k].href);
      if (document.getElementsByClassName("btn-hollow")[k].href !== undefined) {


        console.log("Button Link after " + document.getElementsByClassName("btn-hollow")[k].href);

        if (document.getElementsByClassName("btn-hollow")[k].href.includes(linkeUrl)) {
          var divPopUpButton = document.createElement("div");
          var popUpButton = document.createElement("span");
          //var text = document.createTextNode(msg.dataTap[i].EreignisseGesamt);
          divPopUpButton.setAttribute("class", "tooltip");
          popUpButton.setAttribute("class", "tooltiptext");
          //para.innerHTML = "Click-Rate";
          popUpButton.innerHTML = "Click-Rate: " + msg.dataTap[i].EreignisseGesamt;
          divPopUpButton.appendChild(popUpButton);
          document.getElementsByClassName("btn-hollow")[k].appendChild(divPopUpButton);
        }
      }
  }

  }



  //Auswerten und verarbeiten der einzelnen scrolltiefen
  var scrollInProzent = msg.dataTap[i].EreignisseGesamt * 100 / scrollGesamt;

  if (msg.dataTap[i].Ereignisaktion == "100%") {
      //console.log("GESMANT: " + scrollGesamt);
    var scroll = document.createElement("div");
    var scrollPopUp = document.createElement("span");

    scroll.setAttribute("id", "scroll100");
    scroll.setAttribute("class", "tooltipScroll");
    scrollPopUp.setAttribute("class", "tooltiptext");

    scroll.innerText = "";
    scroll.style.opacity= msg.dataTap[i].EreignisseGesamt / scrollGesamt;
    scrollPopUp.innerHTML = "Scroll-Rate bis 100%: " + scrollInProzent.toFixed(2) + "% der Nutzer";

    scroll.appendChild(scrollPopUp);

    var content = document.getElementById("content");
    content.insertBefore(scroll, content.firstChild);

  }

  if (msg.dataTap[i].Ereignisaktion == "75%") {

    var scroll = document.createElement("div");
    var scrollPopUp = document.createElement("span");

    scroll.setAttribute("id", "scroll75");
    scroll.setAttribute("class", "tooltipScroll");
    scrollPopUp.setAttribute("class", "tooltiptext");

    scroll.innerText = "";
    scroll.style.opacity= msg.dataTap[i].EreignisseGesamt / scrollGesamt;
    scrollPopUp.innerHTML = "Scroll-Rate bis 75%: " + scrollInProzent.toFixed(2) + "% der Nutzer";

    scroll.appendChild(scrollPopUp);

    var content = document.getElementById("content");
    content.insertBefore(scroll, content.firstChild);

  }

  if (msg.dataTap[i].Ereignisaktion == "50%") {

    var scroll = document.createElement("div");
    var scrollPopUp = document.createElement("span");


    scroll.setAttribute("id", "scroll50");
    scroll.setAttribute("class", "tooltipScroll");
    scrollPopUp.setAttribute("class", "tooltiptext");

    scroll.innerText = "";
    scroll.style.opacity= msg.dataTap[i].EreignisseGesamt / scrollGesamt;
    scrollPopUp.innerHTML = "Scroll-Rate bis 50%: " + scrollInProzent.toFixed(2) + "% der Nutzer";

    scroll.appendChild(scrollPopUp);

    var content = document.getElementById("content");
    content.insertBefore(scroll, content.firstChild);

  }

  if (msg.dataTap[i].Ereignisaktion == "25%") {

    var scroll = document.createElement("div");
    var scrollPopUp = document.createElement("span");

    scroll.setAttribute("id", "scroll25");
    scroll.setAttribute("class", "tooltipScroll");
    scrollPopUp.setAttribute("class", "tooltiptext");


    scroll.innerText = "";
    scroll.style.opacity= msg.dataTap[i].EreignisseGesamt / scrollGesamt;
    scrollPopUp.innerHTML = "Scroll-Rate bis 25%: " + scrollInProzent.toFixed(2) + "% der Nutzer";

    scroll.appendChild(scrollPopUp);

    var content = document.getElementById("content");
    content.insertBefore(scroll, content.firstChild);

    }
  }


  // if (msg.navClick !== '') {
  // //  alert(msg.navClick);
  //
  //
  //
  //
  //   // var h1 = document.createElement("h1");
  //   // h1.innerText = "test1234523452345";
  //   // document.body.insertBefore(h1, document.body.firstChild);
  //
  // }
  //
  // if (msg.scroll !== '') {
  //   //alert(msg.navClick);
  //
  //
  //   // var div=document.createElement("h1");
  //   // document.body.appendChild(div);
  //   // div.innerText="test123";
  //
  //   var h1 = document.createElement("h1");
  //   h1.innerText = msg.scroll;
  //   document.body.insertBefore(h1, document.body.firstChild);
  //
  // }
});
//chrome.runtime.sendMessage({todo: "analyticsData"});
//navClick: dataExample[i].EreignisseGesamt
