"use strict"

function showInformation (goodInformation) {
    let modal = document.getElementById("myModal");
    let btn = document.getElementById(goodInformation["name_of_product"]);
    let span = document.getElementsByClassName("close")[0];

    function informationOutput() {
        if (!document.getElementById(goodInformation["name_of_product"] + " name")) {
            let nameOfProduct = goodInformation["name_of_product"];
            let descriptionOfProduct = goodInformation["description"];
            let urlOfProduct = goodInformation["url"];

            let contentHtml = '<p id="' + nameOfProduct + ' name"><strong>Информация о товаре:</strong> ' + nameOfProduct + '</p>' +
                '<p id="' + nameOfProduct + ' description"><strong>Описание: </strong>' + descriptionOfProduct + '</p>';
            let imgHtml = '<img id="' + nameOfProduct + ' url" src="' + urlOfProduct + '" alt="image of product" />';

            let modalContent = document.getElementById("modalContent");
            let imgContent = document.getElementById("imgProduct");

            modalContent.insertAdjacentHTML('beforeend', contentHtml);
            imgContent.insertAdjacentHTML('beforeend', imgHtml);

            let imageInInformationWindow = document.getElementById(nameOfProduct + " url");
            imageInInformationWindow.setAttribute("class", "imageInInformationWindow");
        }
        else {
            changeDisplay("block");
        }
    }

    function onclick() {
        modal.style.display = "none";
        changeDisplay("none");
    }

    btn.onclick = function() {
        modal.style.display = "block";
        informationOutput();
    }

    span.onclick = function() {
        onclick();
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            onclick();
        }
    }

    function changeDisplay(displayValue) {
        let nameOfProductCur = document.getElementById(goodInformation["name_of_product"] + " name");
        let descriptionOfProductCur =  document.getElementById(goodInformation["name_of_product"] + " description");
        let urlOfProductCur = document.getElementById(goodInformation["name_of_product"] + " url");

        nameOfProductCur.style.display = displayValue;
        descriptionOfProductCur.style.display = displayValue;
        urlOfProductCur.style.display = displayValue;
    }
}