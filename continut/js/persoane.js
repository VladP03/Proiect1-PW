function incarcaPersoane () {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
            let parser;
            let xmlDoc;
            let pers;
            
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let toShow = 
                    "<table class='persoaneTable'>" +
                        "<tr>" +
                            "<th>ID: </th>" +
                            "<th>Nume: </th>" +
                            "<th>Prenume: </th>" +
                            "<th>Vârstă: </th>" +
                            "<th>Strada: </th>" +
                            "<th>Numar: </th>" +
                            "<th>Localitate: </th>" +
                            "<th>Judet: </th>" +
                            "<th>Tara: </th>" +
                        "</tr>"

                parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");
                pers = xmlDoc.getElementsByTagName("persoana");
                for (let i = 0; i < pers.length; i++) {
                    toShow += 
                        <tr> +
                            <td>${pers[i].attributes[0].value}</td> +
                            <td>${pers[i].children[0].innerHTML}</td> +
                            <td>${pers[i].children[1].innerHTML}</td> +
                            <td>${pers[i].children[2].innerHTML}</td> +
                            <td>${pers[i].children[3].innerHTML}</td> +
                            <td>${pers[i].children[4].innerHTML}</td> +
                            <td>${pers[i].children[5].innerHTML}</td> +
                            <td>${pers[i].children[6].innerHTML}</td> +
                            <td>${pers[i].children[7].innerHTML}</td> +
                        </tr>
                }

                toShow += "</table>"
                document.getElementById("persoane").innerHTML = toShow
            }
        }

    xmlhttp.open('GET', 'resurse/persoane.xml', true);
    xmlhttp.send();
}