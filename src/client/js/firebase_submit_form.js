"use strict"

const config = {
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

let messagesRef = firebase.database().ref('messages');

let feedback_form_el = document.getElementById('feedback_form');

if (feedback_form_el) {
    feedback_form_el.addEventListener('submit', submitForm);
}

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

        ChangeAmountOfGoods();
    }
}

function ChangeAmountOfGoods() {
    getJsonData(pathToJsonWithGoods, JsonFileChange);
}

async function JsonFileChange(dataGoods) {
    dataGoods = ChangeCountOfProduct(dataGoods);
    dataGoods = ChangeState(dataGoods);

    let response = await fetch('/order-confirmed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataGoods)
    });
}

function ChangeCountOfProduct(dataGoods) {
    for (let item of cart.keys()) {
        if (dataGoods[Math.floor(item / 100) - 1][String(item)]["count_of_product"] > 0) {
            dataGoods[Math.floor(item / 100) - 1][String(item)]["count_of_product"]--;
        }
    }
    return dataGoods;
}

function ChangeState(dataGoods) {
    for (let item of cart.keys()) {
        if (dataGoods[Math.floor(item / 100) - 1][String(item)]["count_of_product"] === 0) {
            dataGoods[Math.floor(item / 100) - 1][String(item)]["state"] = "Ожидается поступление";
        }
    }
    return dataGoods;
}

function saveMessage(data_submit_form) {
    let newMessageRef = messagesRef.push(undefined, undefined);
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

function getInputVal(id) {
    return document.getElementById(id).value;
}