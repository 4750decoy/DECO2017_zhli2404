// JavaScript Document

function newCol(){
	var newBut = document.createElement('button');
	var add = document.getElementById('createB');
	newBut.classList.add('kbHead');
	newBut.innerHTML = 'hahah';
	document.getElementById('kbTitle').insertBefore(newBut,add);
}

function newRow(){
	var row = document.createElement('div');
	var lastRow = document.getElementById('task1');
	row.classList.add('taskBar');
	row.innerHTML = '&nbsp &nbsp haha';
	document.getElementById('kbView').appendChild(row);
	
	var name = document.getElementById(taskName).value;
	var date = document.getElementById(taskName).value;
	var est = document.getElementById(taskName).value;
	var 
}


function createData(id1,id2,id3,id4){
	this.name = id1;
	this.due = id2;
	this.est = id3;
	this.statu = id4;
}


function newTask(id1,id2,id3,id4){
	var task = createData(id1,id2,id3,id4);
	localStorage.setItem(id1,task);
}

/*function getAll(){
	var storeLen = localStorage.length;
	for (i = 0; i < storeLen;i++){
		var getkey = localStorage.key(i);
		var getvalue = localStorage.getItem(getkey);
	}
}
*/