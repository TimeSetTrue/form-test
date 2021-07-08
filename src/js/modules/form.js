
const form = () => {
	const renderPrice = document.querySelector('.render__price');
	const formInfo = document.querySelectorAll('.info .form');

	const loaded = './assets/img/loaded.gif';

	async function postData(url, data) {
		renderPrice.textContent = '';
		renderPrice.innerHTML = `<img src="${loaded}">`;
		let res = await fetch(url, {
			method: "POST",
			body: data,
		})
		return await res.text();
	}

	formInfo.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const formWrappLabel = document.querySelectorAll('.form__wrapp_label input');
			const formData = new FormData();

			formWrappLabel.forEach(item => {
				formData.set(item.id, item.value);
			})

			postData('server.php', formData)
				.then(res => {
					window.location.href = 'paymentsuccess.html';
				})
				.catch(error => {
					window.location.href = 'paymenterror.html';
				})
		})
	})
}

export default form;