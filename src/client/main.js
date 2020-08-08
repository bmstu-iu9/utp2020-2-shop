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

function add_PlaystationP() {
    number_of_purchases++;
    alert("Товар добавлен в корзину.");
}




//Функция-предупреждение для пустой корзины
function rename_it() {
    if (number_of_purchases == 0)
        alert("Ваша корзина пуста. Перед отправкой заказа добавьте в корзину хотя бы один товар.");
    else {
        alert("Ok.");
    }
}

var number_of_purchases = 0;




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