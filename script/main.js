/* global headers and footers */
document.getElementById('top-bar-placeholder').innerHTML = load_file('html/top-bar.html');
document.getElementById('footer-placeholder').innerHTML = load_file('html/footer.html');

/* top bar stuff https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
	if (currentScrollPos < 40) {
		document.getElementById("top-bar").style.top = "-" + currentScrollPos + "px";
	} else if (prevScrollpos > currentScrollPos) {
		document.getElementById("top-bar").style.top = "0";
	} else {
		document.getElementById("top-bar").style.top = "-80px";
	}
	prevScrollpos = currentScrollPos;
} 

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
