/* global headers and footers */
var basePath = window.location.pathname.replace(/[^\/]+$/, '').replace(/(projects\/)?$/, '');
document.getElementById('top-bar-placeholder').innerHTML = load_file(basePath + 'html/top-bar.html');
document.getElementById('footer-placeholder').innerHTML = load_file(basePath + 'html/footer.html');

/* top bar stuff https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
	if (currentScrollPos < 40) {
		document.getElementById("top-bar").style.top = "-" + currentScrollPos/2 + "px";
	} else if (prevScrollpos > currentScrollPos) {
		document.getElementById("top-bar").style.top = "0";
	} else {
		var topBar = document.getElementById("top-bar");
		var topBarHeight = topBar.offsetHeight;
		topBar.style.top = "-" + topBarHeight + "px";
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
