const selectElement = document.querySelector("[data_select]");

selectElement.addEventListener("click", function(event){
	if (event.target.hasAttribute("data_select_item")) {
		const itemTitle = event.target.getAttribute("data_select_item");
		console.log(itemTitle);
		event.target.closest("[data_select]").querySelector("[data_select_title]").textContent = itemTitle;
		event.target.closest("[data_select]").querySelector(".header_select_dropdown").classList.toggle("hidden");
	}
	else {
		this.querySelector(".header_select_dropdown").classList.toggle("hidden");
	}
})

function add_PlaystationP() {
	number_of_purchases++;
	alert("Товар добавлен в корзину.");
}

function rename_it(){
	if (number_of_purchases==0)
	alert("Ваша корзина пуста. Перед отправкой заказа добавьте в корзину хотя бы один товар.");
	else {
		alert("Ok.");
	}
}

var number_of_purchases = 0;
