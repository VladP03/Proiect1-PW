function laIncarcare() {
    getURL();
    getNavigator();
    getDate();
}

/*
    Sectiunea 1
*/

// refresh local date 
var timerDate = setInterval(getDate, 1000);
function getDate() {
    document.getElementById("showDate").innerHTML = "Date= " + new Date().toLocaleString();
}

// show URL
function getURL() {
    document.getElementById("showURL").innerHTML = "URL= " + window.location;
}

// show Navigator
function getNavigator() {
    // browser name
    document.getElementById("showBrowser").innerHTML = "Browser= " + navigator.userAgent;

    // operating system
    document.getElementById("showOperatingSystem").innerHTML = "Operating system= " + navigator.platform;

    // current location
    //getLocation();
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
    
    document.getElementById("showLocation").innerHTML = "Location: Latitude= " + currentLatitude + " Longitude= " + currentLongitude;
}


/*
    Sectiunea 2
*/
var arrayOfLotoNumbers = []
var displayLotoNumbersElement = document.getElementById("displayLotoNumbers");
var displayHowManyNumbersMatchElement = document.getElementById("displayHowManyNumbersMatch");

function displayLotoNumbers() {
    let i;
    for (i=0;i<8;i++) {
        arrayOfLotoNumbers[i] = (Math.floor(Math.random() * 2)).toString(16).toUpperCase();
    }

    displayLotoNumbersElement.innerHTML="Numerele extrase sunt: ";
    for (i=0;i<8;i++) {
        if (i == 7) {
            displayLotoNumbersElement.innerHTML += arrayOfLotoNumbers[i] + ".";
        } else {
            displayLotoNumbersElement.innerHTML += arrayOfLotoNumbers[i] + ", ";
        }
    }
}

function displayHowManyNumbersMatch() {
    let i;
    let j;
    let temp;   // punem valoarea din input dat de utilizator
    let counter=0;  // cate numere fac match

    for (i=0;i<8;i++) {
        temp = document.getElementById((i+1) + "-input");
        console.log(temp);
        for (j=0;j<8;j++) {
            if (temp.toString(16).toUpperCase().localeCompare(arrayOfLotoNumbers[j])) {
                counter++;
                console.log(arrayOfLotoNumbers[j]);
                arrayOfLotoNumbers[j] = "change value";
                break;
            }
        }
    }

    displayHowManyNumbersMatchElement.innerHTML= "Numere nimerite: " + counter;
}




/*
    Sectiunea 3
*/

