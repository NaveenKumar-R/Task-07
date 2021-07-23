let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');

let apiKey = 'b150b69c-90ac-4aef-a9be-2fc985b4659e';
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let loading = document.querySelector('.loading');

searchBtn.addEventListener('click', function(e) {
	e.preventDefault();

	// clear data
	notFound.innerText = '';
	defBox.innerText = '';

	// Get input data
	let word = input.value;
	// call API get data
	if (word === '') {
		alert('Word is required');
		return;
	}

	getData(word);
});
async function getData(word) {
	loading.style.display = 'block';
	// Ajax call
	const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${apiKey}`);
	const data = await response.json();
	console.log(data);
	// if empty result
	if (!data.length) {
		loading.style.display = 'none';
		notFound.innerText = ' No result found';
		return;
	}

	// If result is suggetions
	if (typeof data[0] === 'string') {
		loading.style.display = 'none';
		let heading = document.createElement('h3');
		heading.innerText = 'Did you mean?';
		notFound.appendChild(heading);
		data.forEach((element) => {
			let suggetion = document.createElement('span');
			suggetion.classList.add('suggested');
			suggetion.innerText = element;
			notFound.appendChild(suggetion);
		});
		return;
	}

	// Result found
	loading.style.display = 'none';
	let defination = data[0].shortdef[0];
	defBox.innerText = defination;

}
