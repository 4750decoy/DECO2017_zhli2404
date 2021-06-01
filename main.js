// JavaScript Document
window.addEventListener('scroll',function(){
	var nav = document.querySelector('#Nav');
	nav.classList.toggle('sticky',window.scrollY > 0);
})

let time = '0';

function getTime(){
	var t = new Date();
	var H = String(t.getHours());
	var M = String(t.getMinutes());
	var S = String(t.getSeconds());
	time = H+' : '+M+' : '+S;
	document.getElementById("clock").innerHTML = time;
}

window.setInterval('getTime()',100);

function changebox(id){
	var box = document.getElementById(id);
	document.getElementById('pomodoro').style.display = 'none';
	document.getElementById('KanBan').style.display = 'none';
	document.getElementById('Reading').style.display = 'none';
	document.getElementById('Music').style.display = 'none';
	box.style.display = 'block';
}



