const stampa = () => {
    let elenco = JSON.parse( localStorage.getItem('bacchette_ol') );
 
    let stringaTab = '';
    for(let [idx, item] of elenco.entries()){
        stringaTab += `
            <tr>
                <td>${idx + 1}</td>
                <td>${item.cod}</td>
                <td>${item.mat}</td>
                <td>${item.nucl}</td>
                <td>${item.lung}</td>
                <td>${item.res}</td>
                <td>${item.prop}</td>
                <td>${item.cas}</td>
                <td class="text-right">
                    <button class="btn btn-outline-warning" onclick="modifica(${idx})">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="elimina(${idx})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }
 
    document.getElementById("corpo-tabella").innerHTML = stringaTab;
}
 
const salva = () => {
    let cod = document.getElementById("input-codice").value;
    let mat = document.getElementById("input-materiale").value;
    let nucl = document.getElementById("input-nucleo").value;
    let lung = document.getElementById("input-lunghezza").value;
    let res = document.getElementById("input-resistenza").value;
    let prop = document.getElementById("input-proprietario").value;
    let cas = document.getElementById("select-casata").value;
 
    let bacc = {
        cod,
        mat,
        nucl,
        lung,
        res,
        prop,
        cas,
    }
 
    let elenco = JSON.parse( localStorage.getItem('bacchette_ol') ); //Prendo il vecchio elenco decodificato sotto forma di oggetto
    elenco.push(bacc);                                               //Aggiungo l'elemento al vecchio elenco
    localStorage.setItem('bacchette_ol', JSON.stringify(elenco));    //Ricodifico l'elenco (sotto forma di stringa) per poterlo salvare nel Local Storage
 
    document.getElementById("input-codice").value = "";
    document.getElementById("input-materiale").value = "";
    document.getElementById("input-nucleo").value = "";
    document.getElementById("input-lunghezza").value = "";
    document.getElementById("input-resistenza").value = "";
    document.getElementById("input-proprietario").value = "";
    document.getElementById("select-casata").value = "";
 
    stampa();
 
    $("#modaleInserimento").modal("hide");
}
 
const elimina = (indice) => {
    let elenco = JSON.parse( localStorage.getItem('bacchette_ol') );
    elenco.splice(indice, 1);
    localStorage.setItem('bacchette_ol', JSON.stringify(elenco));
 
    stampa();
}
 
const modifica = (indice) => {
 
    let elenco = JSON.parse( localStorage.getItem('bacchette_ol') );
    console.log(elenco[indice])
 
    document.getElementById("update-codice").value = elenco[indice].cod;
    document.getElementById("update-materiale").value = elenco[indice].mat;
    document.getElementById("update-nucleo").value = elenco[indice].nucl;
    document.getElementById("update-lunghezza").value = elenco[indice].lung;
    document.getElementById("update-resistenza").value = elenco[indice].res;
    document.getElementById("update-proprietario").value = elenco[indice].prop;
    document.getElementById("update-casata").value = elenco[indice].cas;
 
    $("#modaleModifica").data("identificativo", indice)
 
    $("#modaleModifica").modal("show");
}
 
const update = () => {
    let cod = document.getElementById("update-codice").value;
    let mat = document.getElementById("update-materiale").value;
    let nucl = document.getElementById("update-nucleo").value;
    let lung = document.getElementById("update-lunghezza").value;
    let res = document.getElementById("update-resistenza").value;
    let prop = document.getElementById("update-proprietario").value;
    let cas = document.getElementById("update-casata").value;
 
    let bacc = {
        cod,
        mat,
        nucl,
        lung,
        res,
        prop,
        cas,
    }
 
    let indice = $("#modaleModifica").data("identificativo")
 
    let elenco = JSON.parse( localStorage.getItem('bacchette_ol') );
    elenco[indice] = bacc;
    localStorage.setItem('bacchette_ol', JSON.stringify(elenco));
 
    $("#modaleModifica").modal("hide");
}
 
 
//Creazione elenco se non esiste
let elencoString = localStorage.getItem('bacchette_ol');
if(!elencoString)
    localStorage.setItem('bacchette_ol', JSON.stringify([]) );
 
setInterval(() => {
    stampa();
}, 1000);
 
stampa();