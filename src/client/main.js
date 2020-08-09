"use strict"
//Выпадающий список для поиска в шапке
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

//Initialize Firebase
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

//Reference messages collection
var messagesRef = firebase.database().ref('messages');

//Listen for form submit
var feedback_form_el = document.getElementById('feedback_form');

if (feedback_form_el) {
    feedback_form_el.addEventListener('submit', submitForm);
}

//Submit form
function submitForm(e) {
    e.preventDefault();

    //Get values
    var telephone = getInputVal('telephone');
    var address = getInputVal('address');
    var comment = getInputVal('comment');
    var contact_person = getInputVal('contact_person');
    var email = getInputVal('email');
    var delivery;
    var del1 = document.getElementById('del-1');
    var del2 = document.getElementById('del-2');
    var del3 = document.getElementById('del-3');
    var del4 = document.getElementById('del-4');
    var del5 = document.getElementById('del-5');

    if (del1.checked) delivery = "Самовывоз (г. Москва)";
    else if (del2.checked) delivery = "Доставка СДЭК";
    else if (del3.checked) delivery = "Доставка ЕМС";
    else if (del4.checked) delivery = "Доставка Почтой России";
    else delivery = "Доставка курьером (г. Москва)";

    //Save message
    saveMessage(telephone, address, comment, delivery, contact_person, email);
}

//Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

//Save message to Firebase
function saveMessage(telephone, address, comment, delivery, contact_person, email) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        telephone: telephone,
        address: address,
        comment: comment,
        delivery: delivery,
        contact_person: contact_person,
        email: email
    });
}

//Проверка объекта на пустоту
function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

//Запись атрибутов
function setAttributes(elem, obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
        elem[prop] = obj[prop];
    }
}

let cart = new Map();

// //Добавление товара
function addOnePurchase (item) {
    let id = item["id"];
    let res = cart.get(id);
    if (res === undefined) {
        if (item["count_of_product"] > 0) {
            cart.set(id, {"count": 0,"object": item});
            plusFunction(id);
        }
        else alert ("Товара нет в наличии.");
    } else {
        plusFunction(id);
    }
}

//Сооздание единицы товара
function createItem(item){
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class","product");


    let itemImg = document.createElement("div");
    itemImg.setAttribute("class","productImg");
    let img = document.createElement("img");

     setAttributes(img, {
        src: item["url"],
        alt: "product photo",
        height: "220",
        width: "220"
    });


    let itemName = document.createElement("div");
    itemName.setAttribute("class","productName");
     itemName.innerHTML = item["name_of_product"];

    let itemAvailability = document.createElement("div");
    itemAvailability.setAttribute("class","productAvailability");

    let itemIcon = document.createElement("div");
    itemIcon.setAttribute("class","availabilityIcon");
    let imgIcon = document.createElement("img");

    let urlIcon;
    if (item["state"] == "В наличии")
        urlIcon = "img/icons/confirmation-icon.png";
    else
        urlIcon = "img/icons/exclamation-icon.png";

     setAttributes(imgIcon, {
        src: urlIcon,
        alt: "availabilityIcon",
        height: "15",
        width: "15"
    });

    let itemState = document.createElement("div");
    itemState.setAttribute("class","productState");
    itemState.innerHTML = item["state"];


    let itemCost = document.createElement("div");
    itemCost.setAttribute("class","productCost");
    itemCost.innerHTML = item["price"] + " руб";

    let func = "addOnePurchase("+JSON.stringify(item)+")";

    let addPurchase = document.createElement("button");
    addPurchase.setAttribute("class","addPurchase");
    addPurchase.setAttribute("onclick", func);
    addPurchase.innerHTML = "Добавить в корзину";

    itemImg.append(img);
    newDiv.append(itemImg);
    newDiv.append(itemName);
    itemIcon.append(imgIcon);
    itemAvailability.append(itemIcon);
    itemAvailability.append(itemState);
    newDiv.append(itemAvailability);
    newDiv.append(itemCost);
    newDiv.append(addPurchase);

    return newDiv;
}

//Создание блока товаров
function getListContent(data) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class","product-catagory");
  for (var key in data) {
      newDiv.append(createItem(data[key]));
  }

  return newDiv;

}

//Вывод всех товаров
function showGoods(data){
    let category = ["Приставки", "Игры", "Аксессуары"];

    for (let i = 0; i < 3; ++i){
        let id = 'tab-'+(i+1);

        for (let k = 0; k < 3; ++k){
            if (isEmptyObject(data[i*3+k]) == false ){
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class","category-name");
                newDiv.innerHTML = category[k];

                document.getElementById(id).append(newDiv);
                document.getElementById(id).append(getListContent(data[i*3+k]));
            }
        }
    }
}


var status = function (response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}
var json = function (response) {
    return response.json()
}

//Получение данных из файла
document.addEventListener('DOMContentLoaded', function(){
    fetch("./db.json")
        .then(status)
        .then(json)
        .then(function (data_goods) {
            console.log('data', data_goods);
            showGoods(data_goods);
        })
        .catch(function (error) {
            console.log('error', error)
        })
})
