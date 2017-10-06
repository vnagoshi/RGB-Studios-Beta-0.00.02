window.onload = function() {
			
	var backgrounds = ["clean-gray-paper", "crisp-paper-ruffles", "project-paper", "always-grey", "cubes", "graphy-dark", "triangles", "white-brick-wall"];
	var colors = ["#c66", "#6c6", "#66c"];
	var lighterColors = ["#e6b3b3", "#b3e6b3", "#b3b3e6"];  
	var styles = ["red", "green", "blue"];
	document.body.style.backgroundImage = "url('rgbSite/textures/" + backgrounds[random(0, backgrounds.length-1)] + ".png')";
	var randColor = random(0, 2);
	document.body.style.backgroundColor = lighterColors[randColor];
	document.getElementById("theme").href = "rgbSite/" + styles[randColor] + ".css";
	document.getElementById("meta1").content = colors[randColor];
	document.getElementById("meta2").content = colors[randColor];
	document.getElementById("meta3").content = colors[randColor];
	
	function random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	var email = document.getElementById("email");
	var tmp = new Image();
	tmp.src = "rgbSite/icons/email-open.svg";
	
	document.getElementById("dnd_icon").onclick = function() {
		window.open("dndDice/");
	}
	document.getElementById("gradeCalc_icon").onclick = function() {
		window.open("gradeCalc/");
	}
	document.getElementById("numConvert_icon").onclick = function() {
		window.open("numConvert/");
	}
	document.getElementById("statCalc_icon").onclick = function() {
		window.open("statCalc/");
	}
	document.getElementById("doodle_icon").onclick = function() {
		window.open("doodlePad/");
	}
	document.getElementById("clock_icon").onclick = function() {
		window.open("https://chrome.google.com/webstore/detail/desktop-clock/fioeniclklclkopakbepllehmbfikpcc");
	}
	document.getElementById("copylink_icon").onclick = function() {
		window.open("https://chrome.google.com/webstore/detail/copylink/hmbglhnodfegeiemefjoejkkmncdobde");
	}
	document.getElementById("notes_icon").onclick = function() {
		window.open("https://chrome.google.com/webstore/detail/chrome-notes/lnfempckkegmaeleniojhjplemmebgfi");
	}
	document.getElementById("panda_icon").onclick = function() {
		window.open("https://chrome.google.com/webstore/detail/red-panda-theme/ojoceglghponbcfmffjpbbanahklflmj");
	}
	document.getElementById("leafy_icon").onclick = function() {
		window.open("https://addons.mozilla.org/en-US/firefox/addon/leafy-theme/");
	}
	document.getElementById("devilDream_icon").onclick = function() {
		window.open("https://www.youtube.com/watch?v=KgyZLAaeNe8");
	}
	document.getElementById("monster_icon").onclick = function() {
		window.open("https://www.youtube.com/watch?v=58nhelLrS_g");
	}
	
	email.onclick = function() {
		window.open("mailto:justingolden21@gmail.com?Subject=Regarding%20RGB%20Studios");
	}
	document.getElementById("F_icon").onclick = function() {
		window.open("https://www.facebook.com/rgbstudios.org/");
	}
	
	var containers = document.getElementsByClassName("container");
	var details = document.getElementsByClassName("detail");
	for(var i = 0; i < containers.length; i++) {
		containers[i].onclick = function(e) {
			if(e.target.tagName.toLowerCase() == "div") {
				changeActive(e.target);	
			} else {
				changeActive(e.target.parentElement);
			}
		}
	}
	
	function changeActive(target) {
		for(var i = 0; i < containers.length; i++) {
			if(containers[i] != target) {
				containers[i].classList.remove("active");
			} else {
				containers[i].classList.toggle("active");	
			}
		}
	}
	
}
