// JavaScript Document


var dragsave = 0;
var dragenter = 0;
//  Setting the title row to be able to create new element to make multiple columns  //
function newCol(){
	var newBut = document.createElement('button');
	var add = document.getElementById('createB');
	newBut.classList.add('kbHead');
	newBut.innerHTML = 'hahah';
	
	// add the new tab(column) to the right before the add button //
	document.getElementById('kbTitle').insertBefore(newBut,add);
}


// Add new task rows  //
function newRow(){

	
	// Before creating new rows, get infos needed from the task create div //
	var name = document.getElementById('nameEntry').value;
	var date = document.getElementById('dateEntry').value;
	var est = document.getElementById('timeEntry').value;
	var statu = document.getElementById('statusEntry').value;
	var prio = document.getElementById('prioEntry').value;
	
	
	
	if (name.length>0 && date.length>0 && est.length>0 && statu.length>0 && prio.length>0){
		//  call createData function to create localstorage (could be session storage to clearout, but prototype need to use one)  //
		var set =new createData(name,date,est,statu,prio);

		localStorage.setItem(name,set);

		//  new rows should be in the last when created //
		var row = document.createElement('div');
		row.innerHTML = '&nbsp &nbsp '+String(name)+'&nbsp &nbsp '+String(date)+'&nbsp &nbsp '+String(est)+'&nbsp &nbsp '+String(statu)+'&nbsp &nbsp '+String(prio);
		document.getElementById('kbView').appendChild(row);
		row.id = name;
		row.classList.add('taskBar');
		row.draggable = 'true';
		
		
		//  Adding Drag Event  //
		row.addEventListener('dragstart',function(event){
			dragsave = row;
		});
		
		
		//  Record the event target and move it afterwards  //
		row.addEventListener('dragenter',function(event){
			dragenter = row;
			event.preventDefault();
			document.getElementById('kbView').insertBefore(dragsave,this.nextSibling);
		});
		
		row.addEventListener('dragleave',function(event){
			event.preventDefault();
			document.getElementById('kbView').insertBefore(dragsave,dragenter);
		});

		
		
		

	}else{
		alert("Do not left the blank empty");
	}
	
	
	// Make color change according to priority //
	if (prio == 'Low'){
		row.style.background = 'lightgreen';
	}else if (prio == 'Medium'){
		row.style.background = 'orange';
	}else if (prio == 'High'){
		row.style.background = 'red';
	}
}



//  Using function to create the dataset instead of using object ,this way is much simpler //
function createData(id1,id2,id3,id4,id5){
	this.name = id1;
	this.due = id2;
	this.est = id3;
	this.statu = id4;
	this.priority = id5;
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