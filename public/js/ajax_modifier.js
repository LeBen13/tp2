modifier();

function modifier() {
    let aoBtnModifier = document.querySelectorAll('.modifier');

    for (let i = 0; i < aoBtnModifier.length; i++) {
        aoBtnModifier[i].addEventListener('click', () => {
            xhr = new XMLHttpRequest();
            xhr.open('POST', "modifier_ajax", true);


            let tr = aoBtnModifier[i].parentNode.parentNode;
            let id = tr.children[0].children[0].innerHTML;
            let prenom = tr.children[1].innerHTML;
            let nom = tr.children[2].innerHTML;
            let telephone = tr.children[3].innerHTML;
            let courriel = tr.children[4].innerHTML;

            data = {
                "nom": nom,
                "prenom": prenom,
                "telephone": telephone,
                "courriel": courriel,
                "_id": id
            }

            sData = JSON.stringify(data);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(sData);
            xhr.addEventListener("readystatechange", traiterRequestMod, false);
        })
    }


    function traiterRequestMod(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let maReponse = JSON.parse(xhr.responseText);


            let oTab = document.getElementsByClassName('tableau')[0];
            let aTr = oTab.querySelectorAll('tr');


            for (elm of aTr) {
                let sId = elm.querySelector('td');
                if (sId != null && sId.innerHTML == maReponse['_id']) {
                    if (elm.style.backgroundColor == 'rgb(98, 189, 206)') {
                        elm.style.backgroundColor = '#7dd2e2';
                    } else {
                        elm.style.backgroundColor = '#62bdce';
                    }

                }
            }


        }
    }

} //Fin fonction modifier
