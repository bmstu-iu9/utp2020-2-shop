"use strict"

let cart = new Map();
let pathToJsonWithGoods = "./../res/db.json";
let tabsHeight = [];

function isEmptyObject(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

function setAttributes(elem, obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop))
            elem[prop] = obj[prop];
    }
}

function createImageWithAttributes (attributesList){
    let keys = ['src', 'alt', 'height', 'width'];
    let obj = {};

    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = attributesList[i];
    }

    let img = document.createElement("img");
    setAttributes(img,obj);

    return img;
}

function createElementWithAttributes (attributesList){
    let element = document.createElement(attributesList[0]);
    element.setAttribute("class", attributesList[1]);
    if (attributesList.length === 3)
        element.textContent = attributesList[2];

    return element;
}

function addOnePurchase (goodInformation) {
    let id = goodInformation["id"];
    let res = cart.get(id);
    if (res === undefined) {
        if (goodInformation["count_of_product"] > 0) {
            if (cart.size === 0) {
                renderCart();
            }
            cart.set(id, {"count": 0,"object": goodInformation});
            createProductInCart(id);
            increaseNumberOfProducts(id);
        }
        else {
            document.getElementById('modal_notice_text').textContent =
                'Товара нет в наличии.';
            modalID = 'modal_notice';
            modalShow(document.getElementById(modalID));
            timeoutID = setTimeout(modalCloseInTime, 3000);
        }
    } else {
        increaseNumberOfProducts(id);
    }
}

function createItem(goodInformation){

    let goodAttributes = ["div", "product"]
    let good = createElementWithAttributes(goodAttributes);

    let innerElementsInformation = [
        ["div", "productImg"],
        ["div", "productName", goodInformation["name_of_product"]],
        ["div", "productState"],
        ["div", "productCost", goodInformation["price"] + " руб"],
        ["button", "addPurchase", "Добавить в корзину"],
    ]

    let goodInnerElements = [];

    for (let i = 0; i < innerElementsInformation.length; ++i){
        let elementAttributes = innerElementsInformation[i];
        let element = createElementWithAttributes(elementAttributes);
        goodInnerElements.push(element);
    }

    let informationButtonAttributes = ["button","informationButton"];
    let informationButton = createElementWithAttributes(informationButtonAttributes);

    let showInformation = "showInformation("+JSON.stringify(goodInformation)+")";
    informationButton.setAttribute("onclick", showInformation);
    informationButton.setAttribute('data-title', goodInformation["name_of_product"]);
    informationButton.setAttribute('data-content', goodInformation["description"]);
    informationButton.setAttribute('id', goodInformation["name_of_product"]);
    informationButton.setAttribute('counter', 0);
    informationButton.setAttribute('data-tooltip', 'Просмотреть информацию о товаре');
    goodInnerElements[0].append(informationButton);

    let photoAttribute = [goodInformation["url"], "product photo", "220",  "220"];
    let goodPhoto = createImageWithAttributes (photoAttribute);
    informationButton.append(goodPhoto);

    let iconAttributes = ["div", "availabilityIcon"]
    let goodIcon = createElementWithAttributes(iconAttributes);

    let iconUrl;
    if (goodInformation["state"] === "В наличии")
        iconUrl = "img/icons/confirmation-icon.png";
    else
        iconUrl = "img/icons/exclamation-icon.png";

    let iconImgAttributes = [iconUrl, "availabilityIcon", "15",  "15"];
    let iconImg = createImageWithAttributes (iconImgAttributes);
    goodIcon.append(iconImg);
    goodInnerElements[2].append(goodIcon);

    let stateAttributes = ["div", "productStateText", goodInformation["state"]];
    let goodState = createElementWithAttributes(stateAttributes);
    goodInnerElements[2].append(goodState);


    let addPurchase = "addOnePurchase("+JSON.stringify(goodInformation)+")";
    goodInnerElements[4].setAttribute("onclick", addPurchase);


    good.append(...goodInnerElements);

    return good;
}

function getListContent(dataCategory) {
    let goodsList = document.createElement("div");
    goodsList.setAttribute("class","productCategory");
    for (let key in dataCategory) {
        goodsList.append(createItem(dataCategory[key]));
    }
    return goodsList;

}

function clearCategoryTabs() {
    for (let i = 0; i < 4; ++i){
        let id = 'tab-'+(i);
        let catagoryTab = document.getElementById(id);
        if (catagoryTab !== null)
            catagoryTab.innerHTML = '';
    }
}

function showGoods(dataGoods) {
    let categoryNames = ["Приставки", "Игры", "Аксессуары"];
    clearCategoryTabs();

    for (let i = 0; i < 3; ++i){
        let id = 'tab-'+(i+1);

        for (let k = 0; k < 3; ++k){
            let ind = i*3 + k;
            if (isEmptyObject(dataGoods[ind]) === false ){
                let goodsCategoryNameAttributes = ["div","categoryName",categoryNames[k]];
                let goodsCategoryName = createElementWithAttributes(goodsCategoryNameAttributes);

                document.getElementById(id).append(goodsCategoryName);
                document.getElementById(id).append(getListContent(dataGoods[ind]));
            }
        }
    }

    for (let i = 1; i < 5; i++){
        let tabId = 'tab-' + i;
        let tab = document.getElementById(tabId);
        tabsHeight.push (tab.offsetHeight);
    }

    sectionLengthChange (1);
}

let total = 0;
let numberOfPurchases = 0;

let timeoutID = null,
    modalID = null;

function showNumberOfPurchases () {
    if (numberOfPurchases > 0)
        document.getElementById('basketPurchases').textContent = numberOfPurchases;
    else
        document.getElementById('basketPurchases').textContent = '';
}

const createProductInCart = id => {
    let value = cart.get(id);

    let productString = document.createElement('tr');
    productString.id = id;
    let colNameOfProduct = document.createElement('td');
    colNameOfProduct.append(value['object']['name_of_product']);

    let colPrice = document.createElement('td');
    colPrice.append(value['object']['price']);

    let colNumberOfGoods = document.createElement('td');
    colNumberOfGoods.setAttribute('width', '150');

    let minusButton = document.createElement('button');
    minusButton.className = 'cart_button button_minus';
    minusButton.setAttribute('data-id', id);

    let numberOfGoods = document.createElement('span');
    numberOfGoods.id = 'number_of_goods' + id;

    let plusButton = document.createElement('button');
    plusButton.className = 'cart_button button_plus';
    plusButton.setAttribute('data-id', id);

    colNumberOfGoods.append(minusButton, numberOfGoods, plusButton);

    let colTotalPrice = document.createElement('td');
    let totalPrice = document.createElement('span');
    totalPrice.id = 'total_price' + id;
    colTotalPrice.append(totalPrice);

    let colDeleteButton = document.createElement('td');
    let deleteButton = document.createElement('td');
    deleteButton.className = 'cart_button button_delete';
    deleteButton.setAttribute('data-id', id);
    colDeleteButton.append(deleteButton);

    productString.append(colNameOfProduct, colPrice, colNumberOfGoods,
        colTotalPrice, colDeleteButton);

    document.getElementById('table_view').append(productString);
}

const renderCart = () => {
    document.getElementById('empty_cart').style.display = 'none';
    document.getElementById('clean_cart').style.visibility = 'visible';
    document.getElementById('table_view').style.visibility = 'visible';
    document.getElementById('total').style.visibility = 'visible';
}

const emptyCart = () => {
    document.getElementById('empty_cart').style.display = 'block';
    document.getElementById('clean_cart').style.visibility = 'hidden';
    document.getElementById('table_view').style.visibility = 'hidden';
    document.getElementById('total').style.visibility = 'hidden';
}

document.onclick = event => {
    if (event.target.classList.contains('button_plus')) {
        increaseNumberOfProducts(event.target.dataset.id);
    } else
    if (event.target.classList.contains('button_minus')) {
        reduceNumberOfProducts(event.target.dataset.id);
    } else
    if (event.target.classList.contains('button_delete')) {
        removeProductFromCart(event.target.dataset.id);
    } else
    if (event.target.classList.contains('button_clean_cart')) {
        modalID = 'modal_confirmation';
        modalShow(document.getElementById(modalID));
    } else
    if (event.target.classList.contains('button_modal_yes')) {
        modalClose(Event, document.getElementById(modalID));
        cleanCart();
    } else
    if (event.target.classList.contains('button_modal_no')) {
        modalClose(Event, document.getElementById(modalID));
    }
}

const increaseNumberOfProducts = id => {
    id = Number(id);

    if (cart.get(id)['object']['count_of_product'] === cart.get(id)['count']) {
        document.getElementById('modal_notice_text').textContent =
            'Извините! Количество данного товара ограничено. Невозможно добавить товар.';
        modalID = 'modal_notice'
        modalShow(document.getElementById(modalID));
        timeoutID = setTimeout(modalCloseInTime, 3000);
    } else {
        let newCount = ++cart.get(id)['count'];
        document.getElementById('number_of_goods' + id).textContent = newCount;
        document.getElementById('total_price' + id).textContent =
            newCount * cart.get(id)['object']['price'];

        total += cart.get(id)['object']['price'];
        document.getElementById('total_num').textContent = total + ' руб.';

        numberOfPurchases++;
        showNumberOfPurchases();

        document.getElementById('modal_notice_text').textContent =
            'Товар добавлен в корзину.';
        modalID = 'modal_notice';
        modalShow(document.getElementById(modalID));
        timeoutID = setTimeout(modalCloseInTime, 1000);
    }
}

const reduceNumberOfProducts = id => {
    id = Number(id);

    if (cart.get(id)['count']-1 === 0) {
        removeProductFromCart(id);
    } else {
        let newCount = --cart.get(id)['count'];
        document.getElementById('number_of_goods' + id).textContent = newCount;
        document.getElementById('total_price' + id).textContent =
            newCount * cart.get(id)['object']['price'];
        total -= cart.get(id)['object']['price'];
        document.getElementById('total_num').textContent = total + ' руб.';

        numberOfPurchases--;
        showNumberOfPurchases();
    }
}

const removeProductFromCart = id => {
    id = Number(id);

    let product = document.getElementById(id);
    product.parentNode.removeChild(product);

    total -= cart.get(id)['count'] * cart.get(id)['object']['price'];
    document.getElementById('total_num').textContent = total + ' руб.';
    numberOfPurchases -= cart.get(id)['count'];
    showNumberOfPurchases();
    cart.delete(id);

    if (cart.size === 0) {
        emptyCart();
    }
}

const cleanCart = () => {
    for (let id of cart.keys()) {
        let product = document.getElementById(id);
        product.parentNode.removeChild(product);
    }

    cart.clear();
    total = 0;
    numberOfPurchases = 0;
    showNumberOfPurchases();
    emptyCart();
}

let modalOverlay = document.querySelector('.modal_overlay'),
    mStatus	= false;

const modalCloseInTime = event => {
    if (mStatus) {
        modalClose(event, document.getElementById(modalID));
    }
}

const modalCloseOnClick = event => {
    if (mStatus && (modalID === 'modal_notice') &&
        (!event.keyCode || event.keyCode === 27)) {
        modalClose(event, document.getElementById(modalID));
    }
}

let	mClose	= document.querySelectorAll('[data-close]');
[].forEach.call(mClose, function(el) {
    el.addEventListener('click', modalCloseOnClick);
});

document.addEventListener('keydown', modalCloseOnClick);

const modalShow = modal => {
    modalOverlay.classList.remove('fadeOut');
    modalOverlay.classList.add('fadeIn');
    modal.classList.remove('fadeOut');
    modal.classList.add('fadeIn');
    mStatus = true;
}

const modalClose = (event, modal)  => {
    clearTimeout(timeoutID);
    modal.classList.remove('fadeIn');
    modal.classList.add('fadeOut');

    modalOverlay.classList.remove('fadeIn');
    modalOverlay.classList.add('fadeOut');
    mStatus = false;
}

let searchGoodsButton = document.getElementById('header_search');

searchGoodsButton.addEventListener('submit',function(e){
    e.preventDefault();

    let searchCategory = selectedSearchCategory.textContent;
    if (searchCategory === "Категория")
        alert ("Выберете категорию для поиска.");
    else
        getJsonData(pathToJsonWithGoods, searchAndShowGoods);
});

function makeBigram (word, bigram){
    if (word.length === 1){
        bigram.push(word);
    }
    else {
        length = word.length -1;
        for (let i = 0; i < length; i++){
            bigram.push(word.substr(i,2));
        }
    }
}

function bigramSearchGoods (searchResults, searchAdditionalResults, dataGoods) {
    let searchCategory = selectedSearchCategory.textContent;
    let searchInput = document.getElementById("header_search_input").value;

    let categoryNumbers = {
        "Playstation": 0,
        "Nintendo Switch": 1,
        "Xbox": 2
    }
    let categoryInputNumber = categoryNumbers[searchCategory];

    for (let i = 0; i < 3; i++){
        let index = categoryInputNumber*3 + i;
        let dataCategory = dataGoods[index];

        for (var key in dataCategory) {
            let goodName = dataCategory[key]["name_of_product"];
            if (searchInput === goodName)
                searchResults[key] = dataCategory[key];
        }
    }
}

function searchAndShowGoods (dataGoods) {
    let id = "tab-5";
    let searchTab = document.getElementById(id);
    searchTab.innerHTML = '';

    let searchTabNav = document.getElementById("tab-nav-5");
    searchTabNav.checked = true;

    let resultTitle;
    let searchResults = {};
    let searchAdditionalResults = {};

    bigramSearchGoods(searchResults, searchAdditionalResults, dataGoods);


    if (isEmptyObject(searchResults) === true) {
        resultTitle = "Ничего не найдено.";
    }
    else {
        resultTitle = "Результаты поиска";
    }

    let searchResultTitleAttributes = ["div","categoryName", resultTitle];
    let searchResultTitle = createElementWithAttributes(searchResultTitleAttributes);

    searchTab.append(searchResultTitle);
    searchTab.append(getListContent(searchResults));


    if (isEmptyObject(searchAdditionalResults) === false) {
        let additionalResultTitleAttributes = ["div","categoryName", "Похожие результаты"];
        let additionalResultTitle = createElementWithAttributes(additionalResultTitleAttributes);

        searchTab.append(additionalResultTitle);
        searchTab.append(getListContent(searchAdditionalResults));
    }

    let tab = document.getElementById(id);
    tab.style.height = "auto";
    tabsHeight[4] = tab.offsetHeight;

    sectionLengthChange (5);
}

function sectionLengthChange (idNumber) {
    let tabsContainer = document.getElementById("main");
    tabsContainer.style.height = tabsHeight[idNumber - 1] + 60 + "px";

    for (let i = 1; i < 6; i++) {
        let tabId = 'tab-' + i;
        let tab = document.getElementById(tabId);
        if (idNumber !== i) {
            tab.style.overflow = "hidden";
            tab.style.height = 0;
        }
        else {
            tab.style.overflow = "visible";
        }
    }
}

function status (response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}

function json (response) {
    return response.json()
}

function getJsonData (path, func) {
    fetch(path)
        .then(status)
        .then(json)
        .then(function (dataGoods) {
            func(dataGoods);
        })
        .catch(function (error) {
            console.log('error', error);
        })
}

document.addEventListener('DOMContentLoaded', function(){
    getJsonData(pathToJsonWithGoods, showGoods);
})
