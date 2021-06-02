//JavaScript Document

//  Ensure small window size could have fixed nav  //
window.addEventListener('scroll',function(){
	var nav = document.querySelector('#Nav');
	nav.classList.toggle('sticky',window.scrollY > 0);
})


//  hide other boxs  //
function changebox(id){
	var box = document.getElementById(id);
	document.getElementById('Timer').style.display = 'none';
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

function acton(id1,id2){
	document.getElementById(id1).style.background = 'rgba(0,0,0,1)';
	document.getElementById(id1).style.borderRadius = '15%';
	document.getElementById(id2).style.background = 'rgba(0,0,0,0.5)';
	document.getElementById(id2).style.borderRadius = '50%';
}
