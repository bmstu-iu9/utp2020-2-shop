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