// JavaScript Document

function newCol(){
	var newBut = document.createElement('button');
	var add = document.getElementById('createB');
	newBut.classList.add('kbHead');
	newBut.innerHTML = 'hahah';
	document.getElementById('KanBan').insertBefore(newBut,add);
}