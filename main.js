//JavaScript Document

//  Ensure small window size could have fixed nav  //
window.addEventListener('scroll',function(){
	var nav = document.querySelector('#Nav');
	nav.classList.toggle('sticky',window.scrollY > 0);
})


//  Get time in xx:xx:xx format  //

function getTime(){
	var t = new Date();
	var H = String(t.getHours());
	var M = String(t.getMinutes());
	var S = String(t.getSeconds());
	var time = H+' : '+M+' : '+S;
	document.getElementById("clock").innerHTML = time;
}


//  Refresh every 1 second  //
window.setInterval('getTime()',100);


//  hide other boxs  //
function changebox(id){
	var box = document.getElementById(id);
	document.getElementById('pomodoro').style.display = 'none';
	document.getElementById('KanBan').style.display = 'none';
	document.getElementById('Reading').style.display = 'none';
	document.getElementById('Music').style.display = 'none';
	box.style.display = 'block';
}


// hide ohter div when switch   //
function hide(id1,id2){
	document.getElementById(id1).style.display = 'none';
	document.getElementById(id2).style.display = 'block';
}


