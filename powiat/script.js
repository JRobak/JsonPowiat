const selector = '<select id="wojewodztwa" onchange="loadDoc(filterByWoj, \'powiaty.json\', this.value)"> <option value="Wszystkie">Wszystkie</option><option value="Lubelskie">Lubelskie</option><option value="Mazowieckie">Mazowieckie</option><option value="Świętokrzyskie">Świętokrzyskie</option><option value="Dolnośląskie">Dolnośląskie</option><option value="Kujawsko-pomorskie">Kujawsko-pomorskie</option><option value="Łódzkie">Łódzkie</option><option value="Małopolski">Małopolski</option><option value="Opolskie">Opolskie</option><option value="Podkarpackie">Podkarpackie</option><option value="Podlaskie">Podlaskie</option><option value="Pomorskie">Pomorskie</option><option value="Wielkopolskie">Wielkopolskie</option><option value="Śląskie">Śląskie</option><option value="Lubuskie">Lubuskie</option> <option value="Warmińsko-mazurskie">Warmińsko-mazurskie</option><option value="Zachodnio-pomorskie">Zachodnio-pomorskie</option> </select>'

function loadDoc(func, url, parametr) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        if (parametr) {
            func(this, parametr);
        } else {
            func(this);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getPowiats(xmlhttp) {
    const jsonText = JSON.parse(xmlhttp.responseText);
    var text = "<tr><th>Województwo" + selector + "</th><th>Powiat</th><th>Tablica</th>";
    for (x in jsonText) {
        text += "<tr><td>" + jsonText[x].woj + "</td><td>" + x + "</td><td>" + jsonText[x].tablica + "</td></tr>";
    }
    document.getElementById("table").innerHTML = text;
    var select = document.getElementById('wojewodztwa');
    select.value = "Wszystkie";
}

function filterByWoj(xmlhttp, woj) {
    if (woj == "Wszystkie") {
        getPowiats(xmlhttp);
    } else {
        const jsonText = JSON.parse(xmlhttp.responseText);
        var text = "<tr><th>Województwo" + selector + "</th><th>Powiat</th><th>Tablica</th>";
        for (x in jsonText) {
            if (jsonText[x].woj == woj){
                text += "<tr><td>" + jsonText[x].woj + "</td><td>" + x + "</td><td>" + jsonText[x].tablica + "</td></tr>";
            }
        }
        document.getElementById("table").innerHTML = text;
        var select = document.getElementById('wojewodztwa');
        select.value = woj;
    }    
}