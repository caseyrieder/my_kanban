module.exports = function () {
	var topper = document.createElement('div');
	var header = document.createElement('h1');
	topper.appendChild(header);
	header.innerHTML = 'Hello world';
	return topper;
};