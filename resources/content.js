

chrome.runtime.sendMessage({
  todo: "onRightPage",

});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

  //console.log(msg.dataTap);




  var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      document.head.appendChild(link);


//einblenden der Allgemeinen Daten
var divInfoContainer = document.createElement("div");
var divInfo = document.createElement("div");
var woher = document.createElement("p");
var wieLange = document.createElement("p");
var btnNav = document.createElement("label");
var btnNavInput = document.createElement("input");
var btnNavSpan = document.createElement("span");
var btnOnPageKlick = document.createElement("label");
var btnOnPageKlickInput = document.createElement("input");
var btnOnPageKlickSpan = document.createElement("span");
var btnScroll = document.createElement("label");
var btnScrollInput = document.createElement("input");
var btnScrollSpan = document.createElement("span");

divInfoContainer.setAttribute("class", "infoBoxContainer");
divInfoContainer.setAttribute("id", "infoBoxContainerClick");
divInfo.setAttribute("class", "infoBox");

btnNav.setAttribute("class", "switch");
btnNavInput.setAttribute("id", "btn-Nav");
btnNavInput.setAttribute("type", "checkbox");
btnNavSpan.setAttribute("class", "slider");

btnOnPageKlick.setAttribute("class", "switch");
btnOnPageKlickInput.setAttribute("id", "btn-onPage");
btnOnPageKlickInput.setAttribute("type", "checkbox");
btnOnPageKlickSpan.setAttribute("class", "slider");

btnScroll.setAttribute("class", "switch");
btnScrollInput.setAttribute("id", "btn-scroll");
btnScrollInput.setAttribute("type", "checkbox");
btnScrollSpan.setAttribute("class", "slider");


divInfoContainer.innerHTML = "click here for more analytics information and settings";
woher.innerHTML = "häufigste Besucher Herkunft: " + msg.dataTap[0].woher;
wieLange.innerHTML = "Durchschnittlich Besuchszeit in s: " + msg.dataTap[0].zeit;
btnNav.innerHTML = "NavBar";
btnOnPageKlick.innerHTML = "Button Klick";
btnScroll.innerHTML = "Scrolltiefe";

divInfoContainer.appendChild(divInfo);

btnNav.appendChild(btnNavInput);
btnNav.appendChild(btnNavSpan);

btnOnPageKlick.appendChild(btnOnPageKlickInput);
btnOnPageKlick.appendChild(btnOnPageKlickSpan);

btnScroll.appendChild(btnScrollInput);
btnScroll.appendChild(btnScrollSpan);

divInfo.appendChild(woher);
divInfo.appendChild(wieLange);
divInfo.appendChild(btnNav);
divInfo.appendChild(btnOnPageKlick);
divInfo.appendChild(btnScroll);

document.body.insertBefore(divInfoContainer, document.body.firstChild);

document.getElementById("infoBoxContainerClick").addEventListener("click", function () {
  document.getElementsByClassName("infoBox")[0].classList.toggle("showInfoBox");
});

document.getElementById("btn-Nav").checked = true;
document.getElementById("btn-onPage").checked = true;
document.getElementById("btn-scroll").checked = true;

// Button Tracking für NavBar Aktivierne/deaktivieren

document.getElementById("btn-Nav").addEventListener("click", function () {

  var check = document.getElementById("btn-Nav");
  var aktuelElements = document.getElementsByClassName("nav-tracking");


  if (check.checked == true) {
    for (var i = 0; i < aktuelElements.length; i++) {
      aktuelElements[i].style.display = "block";
    }
  } else {
    for (var i = 0; i < aktuelElements.length; i++) {
      aktuelElements[i].style.display = "none";
    }
  }
});

// Button Tracking für onPage Buttons Aktivierne/deaktivieren
document.getElementById("btn-onPage").addEventListener("click", function () {

  var check = document.getElementById("btn-onPage");
  var aktuelElements = document.getElementsByClassName("btnOnPage-tracking");

  if (check.checked == true) {
    for (var i = 0; i < aktuelElements.length; i++) {
      aktuelElements[i].style.display = "block";
    }
  } else {
    for (var i = 0; i < aktuelElements.length; i++) {
      aktuelElements[i].style.display = "none";
    }
  }
});

// Button Tracking für NavBar Aktivierne/deaktivieren
document.getElementById("btn-scroll").addEventListener("click", function () {

  var check = document.getElementById("btn-scroll");
  var aktuelElements = document.getElementsByClassName("tooltipScroll");

  if (check.checked == true) {
    for (var i = 0; i < aktuelElements.length; i++) {
      aktuelElements[i].style.display = "block";
    }
  } else {
    for (var i = 0; i < aktuelElements.length; i++) {
      aktuelElements[i].style.display = "none";
    }
  }
});


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
         var icon = document.createElement("i");
         //var text = document.createTextNode(msg.dataTap[i].EreignisseGesamt);
         divPopUp.setAttribute("class", "tooltip nav-tracking");
         popUp.setAttribute("class", "tooltiptext");
         icon.setAttribute("class", "material-icons");
         //para.innerHTML = "Click-Rate";
         popUp.innerHTML = "Click-Rate: " + msg.dataTap[i].EreignisseGesamt;
         icon.innerHTML = "info";
         divPopUp.appendChild(popUp);
         divPopUp.appendChild(icon);
         document.querySelector(".bare-list--horizontal").children[j].appendChild(divPopUp);
       }
     }
  }


  //Verarbeiten der Button Klicks auf der content Seite
  if (msg.dataTap[i].Ereignisaktion == "Button click") {
    for (var k = 0; k < buttonSize; k++) {

      //console.log("Button Link before " + document.getElementsByClassName("btn-hollow")[k].href);
      if (document.getElementsByClassName("btn-hollow")[k].href !== undefined) {


        //console.log("Button Link after " + document.getElementsByClassName("btn-hollow")[k].href);

        if (document.getElementsByClassName("btn-hollow")[k].href.includes(linkeUrl)) {
          var divPopUpButton = document.createElement("div");
          var popUpButton = document.createElement("span");
          var icon = document.createElement("i");
          //var text = document.createTextNode(msg.dataTap[i].EreignisseGesamt);
          divPopUpButton.setAttribute("class", "tooltip btnOnPage-tracking");
          popUpButton.setAttribute("class", "tooltiptext");
          icon.setAttribute("class", "material-icons");
          //para.innerHTML = "Click-Rate";
          popUpButton.innerHTML = "Click-Rate: " + msg.dataTap[i].EreignisseGesamt;
          icon.innerHTML = "info";
          divPopUpButton.appendChild(popUpButton);
          divPopUpButton.appendChild(icon);
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
    // scroll.style.opacity= msg.dataTap[i].EreignisseGesamt / scrollGesamt;
    scroll.style.backgroundColor = "rgba(252,68,69," + msg.dataTap[i].EreignisseGesamt / scrollGesamt; +")";
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
    // scroll.style.opacity= msg.dataTap[i].EreignisseGesamt / scrollGesamt;
    scroll.style.backgroundColor = "rgba(252,68,69," + msg.dataTap[i].EreignisseGesamt / scrollGesamt; +")";
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
    // scroll.style.opacity= msg.dataTap[i].EreignisseGesamt / scrollGesamt;
    scroll.style.backgroundColor = "rgba(252,68,69," + msg.dataTap[i].EreignisseGesamt / scrollGesamt; +")";
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
    // scroll.style.opacity= msg.dataTap[i].EreignisseGesamt / scrollGesamt;
    scroll.style.backgroundColor = "rgba(252,68,69," + msg.dataTap[i].EreignisseGesamt / scrollGesamt; +")";
    scrollPopUp.innerHTML = "Scroll-Rate bis 25%: " + scrollInProzent.toFixed(2) + "% der Nutzer";

    scroll.appendChild(scrollPopUp);

    var content = document.getElementById("content");
    content.insertBefore(scroll, content.firstChild);

    }
  }



});
