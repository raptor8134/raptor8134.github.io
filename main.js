document.getElementById('top-bar-template').innerHTML = load_file('top-bar.html')
console.log(load_file('top-bar.html'))

/* https://stackoverflow.com/questions/36921947/read-a-server-side-file-using-javascript */
function load_file (path) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", path, false);
	xmlhttp.send();
	if (xmlhttp.status==200) {
		  result = xmlhttp.responseText;
	}
	return result;
}
