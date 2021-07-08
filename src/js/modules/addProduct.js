const addProduct = () => {
	const formDddingBlockLabel = document.querySelectorAll('.form-adding__block_label');
	const formWrappLabel = document.querySelector('.form__product_wrapp');
	const addingProducts = document.querySelector('.adding-products');
	const infoForm = document.querySelector('.info');
	const formAddingProducts = document.querySelector('.form-adding-products');
	const renderPrice = document.querySelector('.render__price');

	function removeProductToArr(arr, list) {
		arr[list--].remove()
		arr.pop();
	}

	function switchPriceProduct(listPrice) {
		let fullPrice;
		switch(listPrice) {
			case 1: 
				fullPrice = 24.99;
				break;
			case 2:
				fullPrice = 44;
				break;
			case 3:
				fullPrice = 60;
				break;
			case 4:
				fullPrice = 72;
				break;
			case 5:
				fullPrice = 80;
				break;
		}
		return fullPrice;
	}

	let text;
	formDddingBlockLabel.forEach(item => {
		item.addEventListener('click', () => {
			text = item.innerText;
			text = +text[0];
		})
	})

	formAddingProducts.addEventListener('submit', (e) => {
		e.preventDefault();
		let postText, spanDelete, buttonDelete;

		//Set total price
		renderPrice.innerText=`Submit and Pay ${switchPriceProduct(text)} USD`;

		//Delete old products
		const formProduct = document.querySelectorAll('.product');
		formProduct.forEach(item => {item.remove()});

		for(let i = 1; i <= text; i++) {
			let randomId = Math.random();

			spanDelete = `<i class="bi bi-plus-lg delete add"></i>`;
			buttonDelete = `
				<button type="button" class="product__delete_click">
					${i === 1 ? '' : spanDelete}
				</button>`;

			postText = `<div class="form__wrapp_label product new">
							<div class="product__delete">
								<h3>Product ${i}</h3>
								${i === 1 ? '' : buttonDelete}
							</div>
							<label for="form-product-add${randomId + 1}">
								Enter main keyword for the product 
								<input id="form-product-add${randomId + 1}" type="text" placeholder="for example, sylicon wine cup">
							</label>
							<label for="form-link-add${randomId * 5}">
								Enter link to the similar product as a reference
								<input type="text" id="form-link-add${randomId * 5}" placeholder="https://...">
							</label>
						</div>`;

			formWrappLabel.innerHTML += postText;
			addingProducts.style.display = 'none';
			infoForm.style.display = 'flex';
		}
	
		const arrProduct = [];
		const addPrice = [];

		const formProductAdding = document.querySelectorAll('.product');
		addPrice.push(...formProductAdding);

		const formProductNew = document.querySelectorAll('.form__wrapp_label button');
		arrProduct.push(...formProductNew);

		arrProduct.forEach(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				let listProduct = arrProduct.length-1;
				let listPrice = addPrice.length-1;

				renderPrice.innerText=`Submit and Pay ${switchPriceProduct(listPrice)} USD`;

				removeProductToArr(addPrice, listPrice)
				removeProductToArr(arrProduct, listProduct)
			});
		});
	});
}

export default addProduct;