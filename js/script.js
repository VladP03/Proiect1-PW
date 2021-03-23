/*
var x; // document.getElementById("p1");

function laIncarcare() {
    x = document.getElementById("p1");
    x.innerHTML="Eduard";
    x.style.backgroundColor="red";
}
*/

function laIncarcare() {
    getURL();
    getNavigator();
    getDate();
}

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
    getLocation();
}

// get current location
var currentLatitude;
var currentLongitude;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);
    } else { 
        alert("4");
    }
}

function getCoordinates(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
    
    document.getElementById("showLocation").innerHTML = "Location: Latitude= " + currentLatitude + " Longitude= " + currentLongitude;

    // now latitude and longitude are available
    //alert(currentLongitude+" and "+currentLatitude);
}

// ********************* sectiunea 2

