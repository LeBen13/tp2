let oBtnAjouter = document.getElementById('ajouter');
let oBtnAddForm = document.getElementById('btnAddForm');


oBtnAjouter.addEventListener('click', () => {
    xhr = new XMLHttpRequest();
    xhr.open('POST', "ajouter_ajax", true);

    data = {
        "nom": "",
        "prenom": "",
        "telephone": "",
        "courriel": ""
    }

    sData = JSON.stringify(data);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(sData);
    xhr.addEventListener("readystatechange", traiterRequest, false);
})

oBtnAddForm.addEventListener('click', () => {
    xhr = new XMLHttpRequest();
    xhr.open('POST', "ajouter_ajax", true);

    let oForm = document.getElementById('formAdd');
    let aInfosInputs = oForm.querySelectorAll('input[type="text"]');


    data = {
        "nom": aInfosInputs[0].value,
        "prenom": aInfosInputs[1].value,
        "telephone": aInfosInputs[2].value,
        "courriel": aInfosInputs[3].value
    }

    sData = JSON.stringify(data);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(sData);
    xhr.addEventListener("readystatechange", traiterRequest, false);
})


function traiterRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        //let  maReponse = JSON.parse(xhr.responseText);
        let oNouvMembre = JSON.parse(xhr.responseText);


        let aMembre = [oNouvMembre['_id'], oNouvMembre['prenom'], oNouvMembre['nom'], oNouvMembre['telephone'], oNouvMembre['courriel']];
        let oTab = document.getElementsByClassName('tableau')[0];


        let oTr = document.createElement("tr");

        for (elm of aMembre) {
            let oTd = document.createElement("td");

            if (aMembre.indexOf(elm) != 0) {
                oTd.innerHTML = elm;
                oTd.setAttribute('contenteditable', true);
            } else {
                oTd.innerHTML = '<a href="/afficher/<%= elm._id %>">' + elm + '</a>';
            }
            oTr.appendChild(oTd);
        }
        oTr.innerHTML += "<td><a href='#'' class='modifier'> <%= __('modifier') %></a></td><td><a class='supprimer' ><%= __('supprimer') %></a></td>";

        oTr.style.backgroundColor = '#62bdce';


        oTab.children[0].appendChild(oTr);

        modifier();
        supprimer();


    }
}
