function laIncarcare() {
    getURL();
    getNavigator();
    getDate();
    submitForm();
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
var arrayOfLotoNumbers = {}

function displayLotoNumbers() {
    var x = document.getElementById("displayLotoNumbers");

    let i;
    for (i=0;i<8;i++) {
        arrayOfLotoNumbers[i] = [(Math.floor(Math.random() * 255)).toString(16).toUpperCase()];
    }

    x.innerHTML="Numerele extrase sunt: ";
    for (i=0;i<8;i++) {
        if (i == 7) {
            x.innerHTML += arrayOfLotoNumbers[i] + ".";
        } else {
            x.innerHTML += arrayOfLotoNumbers[i] + ", ";
        }
    }
}

function displayHowManyNumbersMatch() {
    var x = document.getElementById("displayHowManyNumbersMatch");
    x.innerHTML="Numere nimerite: 0";

    let i;
    let j;
    let counter=0;
    for (i=0;i<8;i++) {
        let temp = document.getElementById(i);
        for (j=0;j<8;j++) {
            console.log(Nuber(temp))
            if (Number(temp) == arrayOfLotoNumbers[i]) {
                counter++;
            }
        }
    }

    console.log(counter);

    x.innerHTML="Numere nimerite: " + counter;
}

function submitForm() {
    var data = new FormData();
    data.append("KEY", document.getElementById("FIELD"));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.send(data); 
}




/*
    Sectiunea 3
*/

