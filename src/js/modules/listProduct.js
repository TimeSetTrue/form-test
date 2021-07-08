const listProduct = () => {
	const addingProducts = document.querySelector('.adding-products');
	const infoForm = document.querySelector('.info');
	const addProducts = document.querySelector('.form__add-product');
	const blockLabel = document.querySelector('.form-adding__block');

	addProducts.addEventListener('click', (e) => {
		e.preventDefault();
	
		infoForm.style.display = 'none';
		addingProducts.style.display = 'flex';
	});

	const productPrice = {
		fiveProduct: {
			fullPrice: 80,
			onePrice: 16,
			saveMoney: 36,
			id: 5,
		},
		fourProduct: {
			fullPrice: 72,
			onePrice: 18,
			saveMoney: 28,
			id: 4,

		},
		threeProduct: {
			fullPrice: 60,
			onePrice: 20,
			saveMoney: 20,
			id: 3,
		},
		twoProduct: {
			fullPrice: 44,
			onePrice: 22,
			saveMoney: 12,
			id: 2,
		},
		oneProduct: {
			fullPrice: 24.99,
			id: 1,
		},
	};

	const {
		fiveProduct,
		fourProduct,
		threeProduct,
		twoProduct,
		oneProduct} = productPrice;

	function setPriceProduct() {
		const lengthObj = Object.keys(productPrice).length;

		for(let i = lengthObj; i >= 1; i--) {
			let fullProducts = 0;
			let classFirstList = '';

			let id, fullPrice, onePrice, saveMoney;
			
			switch(i) {
				case 1: 
					fullProducts = 1;
					id = oneProduct.id;
					fullPrice = oneProduct.fullPrice;
					classFirstList = 'block_label_radius-last';
					break;
				case 2: 
					fullProducts = 2;
					id = twoProduct.id;
					fullPrice = twoProduct.fullPrice;
					onePrice = twoProduct.onePrice;
					saveMoney = twoProduct.saveMoney; 
					break;
				case 3: 
					fullProducts = 3;
					id = threeProduct.id;
					fullPrice = threeProduct.fullPrice;
					onePrice = threeProduct.onePrice;
					saveMoney = threeProduct.saveMoney; 
					break;
				case 4: 
					fullProducts = 4;
					id = fourProduct.id;
					fullPrice = fourProduct.fullPrice;
					onePrice = fourProduct.onePrice;
					saveMoney = fourProduct.saveMoney; 
					break;
				case 5: 
					fullProducts = 5;
					id = fiveProduct.id;
					fullPrice = fiveProduct.fullPrice;
					onePrice = fiveProduct.onePrice;
					saveMoney = fiveProduct.saveMoney; 
					classFirstList = 'block_label_radius-first';
					break;
			}

			let writeBlock, fullBlock;

			if( i === 1) {
				writeBlock = `
					<div class="label__block_text">
						<p class="label__block_text-first">1 product for ${fullPrice} usd</p>
					</div>
				`;
			} else {
				writeBlock = `
					<div class="label__block_text">
						<p class="label__block_text-first">${fullProducts} products for ${fullPrice} usd / ${onePrice}$ for each</p>
						<p class="label__block_text-last">You safe ${saveMoney}% on each patent check</p>
					</div>
				`;
			}

			fullBlock= `
					<li class="form-adding__block_label ${classFirstList}">
						<label for="product${id}" class="label__block">
							<input id="product${id}" type="radio" name="pick">
							${writeBlock}
						</label>
					</li>
				`;

			blockLabel.innerHTML += fullBlock;
		}
	}

	setPriceProduct()
}

export default listProduct;