class Produs {
    //static idCounter=0;

    constructor(name, cantity) {
        //this.id = ++idCounter;
        this.name = name;
        this.cantity = cantity;
    }
}

function Adauga() {
    let produs = new Produs(document.getElementById("nume").value, document.getElementById("cantitate").value);

    console.log("Numele: " + produs.name + " Cantitate: " + produs.cantity);
}