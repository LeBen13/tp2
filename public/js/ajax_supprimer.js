supprimer();

function supprimer() {


    let aoBtnSupprimer = document.getElementsByClassName('supprimer');


    for (let i = 0; i < aoBtnSupprimer.length; i++) {
        aoBtnSupprimer[i].addEventListener('click', () => {
            xhr = new XMLHttpRequest();
            xhr.open('POST', "supprimer_ajax", true);


            let tr = aoBtnSupprimer[i].parentNode.parentNode;
            let id = tr.children[0].children[0].innerHTML;


            data = {
                "_id": id
            }

            sData = JSON.stringify(data);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(sData);
            xhr.addEventListener("readystatechange", traiterRequestSup, false);
        })
    }


} //Fin fonction supprimer

function traiterRequestSup(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let maReponse = JSON.parse(xhr.responseText);


        let oTab = document.getElementsByClassName('tableau')[0];
        let aTr = oTab.querySelectorAll('tr');


        for (let i = 1; i < aTr.length; i++) {

            if (aTr[i].children[0].children[0].innerHTML == maReponse['_id']) {
                oTab.children[0].removeChild(oTab.children[0].children[i]);
            }

        }

    }
}
