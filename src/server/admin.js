"use strict";

const RETURN_BACK = -1;
const CORRECT = true;
const UNCORRECT = false;

const PLAYSTATION = 0;
const NINTENDO_SWITCH = 1;
const XBOX = 2;

const GAME_CONSOLES = 0;
const GAMES = 1;
const ACCESSORIES = 2;

const fs = require("fs");
const readline = require("readline-sync");

const instruction = () => {
    console.log("Выберите номер команды.");
}

let jsonFile;

const getJSON = () => {
    jsonFile = JSON.parse(fs.readFileSync('../../res/db.json', 'utf-8'));
}

const saveChanges = () => {
    fs.writeFileSync("../../res/db.json", JSON.stringify(jsonFile, null, '\t'));
}

const selectCompanyName = () => {
    let correctCompanyName;
    do {
        console.log("\nВыберите компанию:");
        let companyName = readline.question(
            "0. Вернуться назад\n" +
            "1. Playstation\n" +
            "2. Nintendo Switch\n" +
            "3. Xbox\n" +
            "Номер команды: ");
        
        correctCompanyName = CORRECT;
        switch (companyName) {
            case "0":
                return RETURN_BACK;
                break;
            case "1":
                return PLAYSTATION;
                break;
            case "2":
                return NINTENDO_SWITCH;
                break;
            case "3":
                return XBOX;
                break;
            default:
                console.log("\nВы ввели некорректное значение, попробуйте еще раз.");
                correctCompanyName = UNCORRECT;
                break;
        }
    } while (!correctCompanyName);
}

const selectCategory = () => {
    let correctCategory;
    do {
        console.log("\nВыберите категорию:");
        let category = readline.question(
            "0. Вернуться назад\n" +
            "1. Игровые приставки\n" +
            "2. Игры\n" +
            "3. Аксессуары\n" +
            "Номер команды: ");
        
        correctCategory = CORRECT;
        switch (category) {
            case "0":
                return RETURN_BACK;
                break;
            case "1":
                return GAME_CONSOLES;
                break;
            case "2":
                return GAMES;
                break;
            case "3":
                return ACCESSORIES;
                break;
            default:
                console.log("\nВы ввели некорректное значение, попробуйте еще раз.");
                correctCategory = UNCORRECT;
                break;
        }
    } while (!correctCategory);
} 

const showOneItem = (numberOfCategory, id) => {
    console.log("\nID: " + jsonFile[numberOfCategory][id]["id"] + 
                   "\nНазвание: " + jsonFile[numberOfCategory][id]["name_of_product"] +
                   "\nЦена: " + jsonFile[numberOfCategory][id]["price"] + 
                   "\nКоличество на складе: " + jsonFile[numberOfCategory][id]["count_of_product"] +
                   "\nПуть к изображению: " + jsonFile[numberOfCategory][id]["url"]);
}

const showItems = () => {
    let nameOfCompany = selectCompanyName();
    if (nameOfCompany === RETURN_BACK) {
        return -1;
    }
    
    let category = selectCategory();
    if (category === RETURN_BACK) {
        return -1;
    }
    
    let numberOfCategory = nameOfCompany * 3 + category;
    let selectedItems = jsonFile[numberOfCategory];
    
    if (Object.keys(selectedItems).length === 0) {
        console.log("\nВ данной категории нет товаров");
    }
    
    for (let key in selectedItems) {
        showOneItem(numberOfCategory, key);
    }
    
    return numberOfCategory;
}

const changeItem = () => {
    let numberOfCategory = showItems();
    if (numberOfCategory === -1 || Object.keys(jsonFile[numberOfCategory]).length === 0) {
        return;
    }
    
    let idOfItem = readline.question("\nВведите из списка ID товара, который хотите изменить: ");
    
    do {
        console.log("\nID изменяемого товара: " + idOfItem);
        let changeAction = readline.question("0. Вернуться. Несохраненные изменения будут утеряны\n" +
                "1. Изменить цену\n" + 
                "2. Изменить количество на складе\n" + 
                "3. Изменить изображение\n" +
                "4. Сохранить все изменения\n" +
                "5. Отменить все несохраненные изменения\n" +
                "Номер команды: ");
        
        switch (changeAction) {
            case "0": 
                getJSON();
                return;
                break;
            case "1":
                jsonFile[numberOfCategory][idOfItem]["price"] = 
                    Number(readline.question("\nВведите цену: "));
                showOneItem(numberOfCategory, idOfItem);
                break;
            case "2":
                let newCount = Number(readline.question("\nВведите количество товаров на складе: "));
                jsonFile[numberOfCategory][idOfItem]["state"] = 
                    (newCount) ? "В наличии" : "Ожидается поступление";
                jsonFile[numberOfCategory][idOfItem]["count_of_product"] = newCount;
                showOneItem(numberOfCategory, idOfItem);
                break;
            case "3":
                console.log("\nИзмените изображение под тем же названием по данному пути: " +
                           jsonFile[numberOfCategory][idOfItem]["url"]);
                showOneItem(numberOfCategory, idOfItem);
                break;
            case "4":
                saveChanges();
                break;
            case "5":
                getJSON();
                break;
            default:
                console.log("\nВы ввели некорректное значение, попробуйте еще раз.");
                break;
        }
    } while (true);
}

const createID = (numberOfCategory) => {
    let idOfItemNumber;
    
    let keys = Object.keys(jsonFile[numberOfCategory]);
    if (keys.length != 0) {
        idOfItemNumber = Number(keys[keys.length - 1]) + 1;
    } else {
        idOfItemNumber = (numberOfCategory + 1) * 100;
    }
    let idOfItemString = idOfItemNumber + "";
    
    while (keys.indexOf(idOfItemString) != -1) {
        idOfItemNumber++;
        idOfItemString = idOfItemNumber + "";
        if (idOfItemNumber % 100 === 0) {
            idOfItemNumber -= 100;
            idOfItemString = idOfItemNumber + "";
        }
    }
    
    return idOfItemString;
}

const addItem = () => {
    let nameOfCompany = selectCompanyName();
    if (nameOfCompany === RETURN_BACK) {
        return;
    }
    
    let category = selectCategory();
    if (category === RETURN_BACK) {
        return;
    }
    
    let numberOfCategory = nameOfCompany * 3 + category;
    let idOfItem = createID(numberOfCategory);
    
    jsonFile[numberOfCategory][idOfItem] = {
        "id": Number(idOfItem),
        "url": "img/photo-products/"
    }
    
    let newItem = jsonFile[numberOfCategory][idOfItem];
    
    switch (nameOfCompany) {
        case 0:
            newItem["section"] = "Playstation";
            newItem["url"] += "Playstation/";
            break;
        case 1:
            newItem["section"] = "Nintendo Switch";
            newItem["url"] += "Nintendo-Switch/";
            break;
        case 2:
            newItem["section"] = "Xbox";
            newItem["url"] += "Xbox/";
            break;
    }
    
    switch (category) {
        case 0:
            newItem["category"] = "Приставки";
            newItem["url"] += "Console/";
            break;
        case 1:
            newItem["category"] = "Игры";
            newItem["url"] += "Game/";
            break;
        case 2:
            newItem["category"] = "Аксессуары";
            newItem["url"] += "Accessory/";
            break;
    }
    
    newItem["name_of_product"] = readline.question("Введите название товара: ");
    newItem["price"] = Number(readline.question("Введите цену товара: "));
    newItem["count_of_product"] = Number(readline.question("Введите количество товара на складе: "));
    
    switch(newItem["count_of_product"]) {
        case 0: 
            newItem["state"] = "Ожидается поступление";
            break;
        default:
            newItem["state"] = "В наличии";
            break;
    }
    
    let picture = readline.question("Введите название изображения: ");
    console.log("\nПоместите изображение в данную папку: " + newItem["url"]);
    newItem["url"] += picture;
    
    let correctAddResponse;
    do {
        console.log("\nВы уверены, что хотите добавить товар?");
        showOneItem(numberOfCategory, idOfItem);
        let addResponse = readline.question("\nИзменения будут сохранены\n" +
                                          "1. Да\n" +
                                          "2. Нет\n" +
                                          "Номер команды: ");
        
        correctAddResponse = CORRECT;
        switch (addResponse) {
            case "1":
                saveChanges();
                break;
            case "2":
                delete jsonFile[numberOfCategory][idOfItem];
                break;
            default:
                console.log("Вы ввели некорректное значение, попробуйте еще раз.");
                correctAddResponse = UNCORRECT;
                break;
        }
    } while (!correctAddResponse);
}

const deleteItem = () => {
    let correctDeleteResponse;
    let numberOfCategory = showItems();
    if (numberOfCategory === -1 || Object.keys(jsonFile[numberOfCategory]).length === 0) {
        return;
    }
    
    let idOfItem = readline.question("\nВведите из списка ID товара, который хотите удалить: ");
    
    do {
        console.log("\nВы уверены, что хотите удалить товар?");
        showOneItem(numberOfCategory, idOfItem);
        let deleteResponse = readline.question("\nИзменения будут сохранены\n" +
                                          "1. Да\n" +
                                          "2. Нет\n" +
                                          "Номер команды: ");
        
        correctDeleteResponse = CORRECT;
        switch (deleteResponse) {
            case "1":
                delete jsonFile[numberOfCategory][idOfItem];
                saveChanges();
                break;
            case "2":
                break;
            default:
                console.log("\nВы ввели некорректное значение, попробуйте еще раз.");
                correctDeleteResponse = UNCORRECT;
                break;
        }
    } while (!correctDeleteResponse);
}

(function () {
    instruction();
    getJSON();
    
    do {
        let primaryAction = readline.question(
            "\n1. Посмотреть информацию о товаре\n" +
            "2. Изменить товар\n" + 
            "3. Добавить товар\n" + 
            "4. Удалить товар\n" +
            "5. Завершить выполнение программы\n" +
            "Номер команды: ");
        
        switch (primaryAction) {
            case "1":
                showItems();
                break;
            case "2":
                changeItem();
                break;
            case "3":
                addItem();
                break;
            case "4":
                deleteItem();
                break;
            case "5":
                return 0;
                break;
            default:
                console.log("\nВы ввели некорректное значение, попробуйте еще раз.");
                break;
        }
    } while (true);
})();