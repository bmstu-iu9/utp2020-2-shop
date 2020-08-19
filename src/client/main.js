"use strict"

const selectElement = document.querySelector("[data_select]");

selectElement.addEventListener("click", function(event) {
    if (event.target.hasAttribute("data_select_item")) {
        const itemTitle = event.target.getAttribute("data_select_item");
        console.log(itemTitle);
        event.target.closest("[data_select]").querySelector("[data_select_title]").textContent = itemTitle;
        event.target.closest("[data_select]").querySelector(".header_select_dropdown").classList.toggle("hidden");
    } else {
        this.querySelector(".header_select_dropdown").classList.toggle("hidden");
    }
})

var config = {
    apiKey: "AIzaSyC3IZYPlLM7MyK2eT4CWQm-lrgqiqTxmiQ",
    authDomain: "feedback-form-6fbbd.firebaseapp.com",
    databaseURL: "https://feedback-form-6fbbd.firebaseio.com",
    projectId: "feedback-form-6fbbd",
    storageBucket: "feedback-form-6fbbd.appspot.com",
    messagingSenderId: "708240577694",
    appId: "1:708240577694:web:69e46bef22623999ed178f",
    measurementId: "G-CGGRTB89WG"
};

firebase.initializeApp(config);

var messagesRef = firebase.database().ref('messages');

var feedback_form_el = document.getElementById('feedback_form');

if (feedback_form_el) {
    feedback_form_el.addEventListener('submit', submitForm);
}

let cart = new Map();

function submitForm(e) {
    if (cart.size === 0) {
        alert("Ваша корзина пуста. Перед отправкой заказа добавьте в корзину хотя бы один товар.");
        e.preventDefault();
    } else {
        alert("Ваша заявка отправлена.");
        e.preventDefault();

        let data_submit_form = [];
        let data_of_user = ['telephone', 'address', 'comment', 'contact_person', 'email'];
        let list_of_del = ['del-1', 'del-2', 'del-3', 'del-4', 'del-5'];
        let type_of_delivery = ["Самовывоз (г. Москва)", "Доставка СДЭК", "Доставка ЕМС",
            "Доставка Почтой России", "Доставка курьером (г. Москва)"];
        let del = [];
        let delivery;
        let list_of_products = [];
        for (let i = 0; i < data_of_user.length; i++) {
            data_submit_form.push(getInputVal(data_of_user[i]));
        }
        for (let i = 0; i < list_of_del.length; i++) {
            del.push(document.getElementById(list_of_del[i]));
        }
        for (let i = 0; i < type_of_delivery.length; i++) {
            if (del[i].checked) {
                delivery = type_of_delivery[i];
                break;
            }
        }
        data_submit_form.push(delivery);
        for (let item of cart.values()) {
            let i = item["object"]["name_of_product"];
            list_of_products.push(i);
        }
        data_submit_form.push(list_of_products);
        let sum = total + " ₽";
        data_submit_form.push(sum);

        saveMessage(data_submit_form);
    }
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

function saveMessage(data_submit_form) {
    let newMessageRef = messagesRef.push();
    newMessageRef.set({
        telephone: data_submit_form[0],
        address: data_submit_form[1],
        comment: data_submit_form[2],
        contact_person: data_submit_form[3],
        email: data_submit_form[4],
        delivery: data_submit_form[5],
        list_of_products: data_submit_form[6],
        sum: data_submit_form[7]
    });
}

function isEmptyObject(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

function setAttributes(elem, obj) {
    for (var prop in obj) {
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
        element.innerHTML = attributesList[2];

    return element;
}

function addOnePurchase (goodInformation) {
    let id = goodInformation["id"];
    let res = cart.get(id);
    if (res === undefined) {
        if (goodInformation["count_of_product"] > 0) {
            cart.set(id, {"count": 0,"object": goodInformation});
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

    let goodAttribute = ["div", "product"]
    let good = createElementWithAttributes(goodAttribute);

    let innerElementsInformation = [
        ["div", "productImg"],
        ["div", "productName", goodInformation["name_of_product"]],
        ["div", "productState"],
        ["div", "productCost", goodInformation["price"] + " руб"],
        ["button", "addPurchase", "Добавить в корзину"],
    ]

    let goodInnerElements = [];

    for (let i = 0; i < innerElementsInformation.length; ++i){
        let elementAttribute = innerElementsInformation[i];
        let element = createElementWithAttributes(elementAttribute);
        goodInnerElements.push(element);
    }

    let photoAttribute = [goodInformation["url"], "product photo", "220",  "220"];
    let goodPhoto = createImageWithAttributes (photoAttribute);
    goodInnerElements[0].append(goodPhoto);

    let iconAttribute = ["div", "availabilityIcon"]
    let goodIcon = createElementWithAttributes(iconAttribute);

        let iconUrl;
        if (goodInformation["state"] == "В наличии")
            iconUrl = "img/icons/confirmation-icon.png";
        else
            iconUrl = "img/icons/exclamation-icon.png";

        let iconImgAttribute = [iconUrl, "availabilityIcon", "15",  "15"];
        let iconImg = createImageWithAttributes (iconImgAttribute);
        goodIcon.append(iconImg);
        goodInnerElements[2].append(goodIcon);

    let stateAttribute = ["div", "productStateText", goodInformation["state"]];
    let goodState = createElementWithAttributes(stateAttribute);
    goodInnerElements[2].append(goodState);


    let addPurchase = "addOnePurchase("+JSON.stringify(goodInformation)+")";
    goodInnerElements[4].setAttribute("onclick", addPurchase);


    good.append(...goodInnerElements);

    return good;
}

function getListContent(dataCategory) {
  let goodsList = document.createElement("div");
  goodsList.setAttribute("class","productCategory");
  for (var key in dataCategory) {
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
            if (isEmptyObject(dataGoods[ind]) == false ){
                let goodsCategoryName = document.createElement("div");
                goodsCategoryName.setAttribute("class","categoryName");
                goodsCategoryName.innerHTML = categoryNames[k];

                document.getElementById(id).append(goodsCategoryName);
                document.getElementById(id).append(getListContent(dataGoods[ind]));
            }
        }
    }
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

const renderCart = () => {
    let out = '<table> <tr> <th>Наименование</th> <th>Цена, руб</th>';
    out+='<th>Кол-во, шт</th> <th>Стоимость, руб</th> <th> </th> </tr>';
    for (let item of cart) {
        out+='<tr>'
        out+='<td>'+item[1]['object']['name_of_product'] + '</td>';
        out+='<td>'+item[1]['object']['price']+'</td>';
        out+='<td width="150">'+'<button class="button minus" data-id="'+item[0]+'"> </button>';
        out+=item[1]['count'];
        out+='<button class="button plus" data-id="'+item[0]+'"> </button>'+'</td>';
        out+='<td>'+item[1]['object']['price'] * item[1]['count']+'</td>';
        out+='<td> <button class="button delete" data-id="'+item[0]+'"> </button> </td>';
        out+='</tr>';
    };
    out+='</table> <div class="total">ИТОГО: <span class="total_num">' + total + ' руб.</span> </div>';
    document.getElementById('list_of_items').innerHTML = out;
    document.getElementById('empty_cart').style.display = 'none';
    document.getElementById('clean_cart').style.visibility = 'visible';
}

const emptyCart = () => {
    document.getElementById('empty_cart').style.display = 'block';
    document.getElementById('clean_cart').style.visibility = 'hidden';
    document.getElementById('list_of_items').innerHTML = '';
}

emptyCart();

document.onclick = event => {
    if (event.target.classList.contains('plus')) {
        increaseNumberOfProducts(event.target.dataset.id);
    } else
    if (event.target.classList.contains('minus')) {
        reduceNumberOfProducts(event.target.dataset.id);
    } else
    if (event.target.classList.contains('delete')) {
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
    if (cart.get(id)['object']['count_of_product'] == cart.get(id)['count']) {
        document.getElementById('modal_notice_text').textContent =
            'Извините! Количество данного товара ограничено. Невозможно добавить товар.';
        modalID = 'modal_notice'
        modalShow(document.getElementById(modalID));
        timeoutID = setTimeout(modalCloseInTime, 3000);
    } else {
        cart.get(id)['count']++;
        total += cart.get(id)['object']['price'];
        numberOfPurchases++;
        showNumberOfPurchases();
        document.getElementById('modal_notice_text').textContent =
            'Товар добавлен в корзину.';
        modalID = 'modal_notice';
        modalShow(document.getElementById(modalID));
        timeoutID = setTimeout(modalCloseInTime, 1000);
    }
    renderCart();
}

const reduceNumberOfProducts = id => {
    id = Number(id);
    if (cart.get(id)['count']-1 == 0) {
        removeProductFromCart(id);
    } else {
        cart.get(id)['count']--;
        total -= cart.get(id)['object']['price'];
        numberOfPurchases--;
        showNumberOfPurchases();
        renderCart();
    }
}

const removeProductFromCart = id => {
    id = Number(id);
    if (cart.size == 1) {
        cleanCart();
        return;
    }
    total -= cart.get(id)['count'] * cart.get(id)['object']['price'];
    numberOfPurchases -= cart.get(id)['count'];
    showNumberOfPurchases();
    cart.delete(id);
    renderCart();
}

const cleanCart = () => {
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

function status (response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}

function json (response) {
    return response.json()
}

function getJsonData (func) {
    fetch("./../res/db.json")
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
    getJsonData(showGoods);
})
