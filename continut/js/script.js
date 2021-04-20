function laIncarcare() {
    getURL();
    getNavigator();
    getDate();
}




/*
    Sectiunea 1
*/

// refresh local date 
setInterval(getDate, 1000);
function getDate() {
    if (document.getElementById("showDate") != null) {
        document.getElementById("showDate").innerHTML = "Date= " + new Date().toLocaleString();
    }
}

// show URL
function getURL() {
    if (document.getElementById("showURL") != null) {
        document.getElementById("showURL").innerHTML = "URL= " + window.location;
    }
}

// show Navigator
function getNavigator() {
    // browser name
    if (document.getElementById("showBrowser") != null) {
        document.getElementById("showBrowser").innerHTML = "Browser= " + navigator.userAgent;
    }

    // operating system
    if (document.getElementById("showOperatingSystem") != null) {
        document.getElementById("showOperatingSystem").innerHTML = "Operating system= " + navigator.platform;
    }

    // current location
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);
    } else { 
        alert("4");
    }
}

function getCoordinates(position) {
    var currentLatitude = position.coords.latitude;
    var currentLongitude = position.coords.longitude;
    
    if (document.getElementById("showLocation") != null) {
        document.getElementById("showLocation").innerHTML = "Location: Latitude= " + currentLatitude + " Longitude= " + currentLongitude;
    }
}




/*
    Sectiunea 2
*/

function displayLotoNumbers() {
    var arrayOfLotoNumbers = []
    var displayLotoNumbersElement = document.getElementById("displayLotoNumbers");
    var displayHowManyNumbersMatchElement = document.getElementById("displayHowManyNumbersMatch");

    let i;
    for (i=0;i<8;i++) {
        arrayOfLotoNumbers[i] = (Math.floor(Math.random() * 255)).toString(16).padStart(2, "0").toUpperCase();
    }

    if (displayLotoNumbersElement != null) {
        displayLotoNumbersElement.innerHTML ="Numerele extrase sunt: ";

        for (i=0;i<8;i++) {
            if (i == 7) {
                displayLotoNumbersElement.innerHTML += arrayOfLotoNumbers[i] + ".";
            } else {
                displayLotoNumbersElement.innerHTML += arrayOfLotoNumbers[i] + ", ";
            }
        }
    }

    displayHowManyNumbersMatch(arrayOfLotoNumbers);
}

function displayHowManyNumbersMatch(arrayOfLotoNumbers) {
    var displayLotoNumbersElement = document.getElementById("displayLotoNumbers");
    var displayHowManyNumbersMatchElement = document.getElementById("displayHowManyNumbersMatch");

    let i;
    let j;
    let temp;   // punem valoarea din input dat de utilizator
    let counter=0;  // cate numere fac match

    for (i=0;i<8;i++) {
        temp = document.getElementById((i+1) + "-input");
        let tempHex = temp.value.toString(16).toUpperCase();
        for (j=0;j<8;j++) {
            if (tempHex == arrayOfLotoNumbers[j]) {
                counter++;
                arrayOfLotoNumbers[j] = "change value";
                break;
            }
        }
    }

    if (displayHowManyNumbersMatchElement != null) {
        displayHowManyNumbersMatchElement.innerHTML= "Numere nimerite: " + counter;
    }
}




/*
    Sectiunea 3
*/
function Draw() {
    let numberOfClicks=0;

    const canvasElement = document.getElementById("canvas");
    const context = canvasElement.getContext("2d");

    let x;
    let y;
    let xprim;
    let yprim;
    canvasElement.addEventListener("click", (e) => {
        if (numberOfClicks == 0) {
            x = e.offsetX;
            y = e.offsetY;
            numberOfClicks = 1;

            console.log("merge")
        } else {
            xprim = e.offsetX;
            yprim = e.offsetY;

            console.log(x + " " + y + " " + xprim + " " + yprim);
            context.beginPath();
            context.strokeStyle = document.getElementById("contur").value;
            context.fillStyle = document.getElementById("umplere").value;

            context.strokeRect(x,y,xprim-x, yprim-x);
            context.fillRect(x,y,xprim-x, yprim-x);

            context.stroke();

            numberOfClicks=0;
        }
    });
}


/*
    Sectiunea 4
*/


// Laborator 7
function schimbaContinut(resursa, jsFisier, jsFunctie) {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("continut").innerHTML = xmlhttp.responseText;
                
                // laborator 7, punctul 2
                if (jsFisier) {
                    var elementScript = document.createElement('script');
                    elementScript.onload = function () {
                        console.log("hello");
                        if (jsFunctie) {
                            window[jsFunctie]();
                        }
                    };
                    elementScript.src = jsFisier;
                    document.head.appendChild(elementScript);
                } else {
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                }
            }
        }
    }

    console.log(xmlhttp.responseText);

    xmlhttp.open("GET", resursa + ".html", true);
    xmlhttp.send();
}