// get url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function replaceSpace(input) {
	let changedInput = input.replace(/\s/g, '%2B')
	return changedInput
}

function replaceEmail(input) {
	let changedInput = input.replace('@', '%40')
	return changedInput
}

if (urlParams.has('n')) {

	const name = replaceSpace(urlParams.get('n'));
	const gender = urlParams.get('gender');
	const email = replaceEmail(urlParams.get('email'));
	const phone = urlParams.get('phone');
	const uid = urlParams.get('uid');
    let source = 'KT';

    if (urlParams.has('source')) {
        source = urlParams.get('source');
    }

	// is loop 2 times as it has 2 href with the same link that needs to be overwrite.
	let anchorTagLinks = document.querySelectorAll('a[href="https://cashku.page.link/kt"]');

	for(i = 0; i < anchorTagLinks.length; i++) {
		if (anchorTagLinks[i]) {
			// set anchortag with params taken from url
			anchorTagLinks[i].setAttribute('href', `https://cashkustaging.page.link/?link=https%3A//cashkustaging.page.link/kt?name%3D${name}%26gender%3D${gender}%26email%3D${email}%26phone%3D${phone}%26uid%3D${uid}%26source%3D${source}&apn=com.advisonomics.demo&isi=123456789&ibi=com.advisonomics.demo`)
		}
	}
}
