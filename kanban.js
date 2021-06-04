// JavaScript Document
localStorage.clear();
var colum  = 1;


var dragsave = 0;
var dragenter = 0;


var defpage = 'homepage';
var tempTask = 0;
//  Setting the title row to be able to create new element to make multiple columns  //
function newCol(){
	var newBut = document.createElement('button');
	var add = document.getElementById('createB');
	add.style.display = 'inline-block';
	newBut.classList.add('kbHead');
	newBut.innerHTML = 'Page'+String(colum);
	// add the new tab(column) to the right before the add button //
	document.getElementById('kbTitle').insertBefore(newBut,add);
	colum += 1;
}









// Add new task rows  //
function newRow(){
	// Before creating new rows, get infos needed from the task create div //
	var name = document.getElementById('nameEntry').value;
	var date = document.getElementById('dateEntry').value;
	var est = document.getElementById('timeEntry').value;
	var statu = document.getElementById('statusEntry').value;
	var prio = document.getElementById('prioEntry').value;
	var page = defpage;
	
	
	if (name.length>0 && date.length>0 && est.length>0 && statu.length>0 && prio.length>0 && localStorage.getItem(name) == null){
		//  call createData function to create localstorage (could be session storage to clearout, but prototype need to use one)  //
		var set = {sname:name,sdate:date,sest:est,sstatu:statu,sprio:prio,spage:page};
		//   LocalStorage can save paire of strings, when storing Object, we can store them using JSON and using parse to retrieve//
		localStorage.setItem(name,JSON.stringify(set));  // This method is studied at https://www.jianshu.com/p/9d06304d35b7  //
		
		

		//  new rows should be in the last when created //
	}else if(localStorage.getItem(name) != null){
		alert("Repeating Task Name");
	}else{
		alert("Do not left the blank empty");
	}
	
	
	// Make color change according to priority //
	getAll();
	
}





function getAll(){
	document.getElementById('kbView').innerHTML ='';
	var storeLen = localStorage.length;
	for (var i = 0; i < storeLen;i++){
		var getkey = localStorage.key(i);
		var getvalue = localStorage.getItem(getkey);
		var data = JSON.parse(getvalue);
		if (data.spage == 'homepage'){
			var row = document.createElement('div');
			row.innerHTML = ' &nbsp &nbsp '+String(data.sprio)+'&nbsp &nbsp &nbsp'+String(data.sdate)+'&nbsp &nbsp &nbsp'+String(data.sname)+'&nbsp &nbsp &nbsp EST: '+String(data.sest)+'&nbsp &nbsp &nbsp'+String(data.sstatu);
			document.getElementById('kbView').appendChild(row);
			row.id = data.sname;
			row.classList.add('taskBar');
			row.draggable = 'true';
			//  Adding Drag Event  //
			row.addEventListener('dragstart',function(event){
				dragsave = event.target;
				console.log(dragsave);		
			});
			//  Record the event target and move it afterwards  //
			row.addEventListener('dragenter',function(event){
				dragenter = event.target;
				event.preventDefault();
				document.getElementById('kbView').insertBefore(dragsave,event.target.nextSibling);
			});
			row.addEventListener('dragleave',function(event){
				event.preventDefault();
				document.getElementById('kbView').insertBefore(dragsave,dragenter);
			});
			if (data.sprio == 'Low'){
				row.style.background = 'lightgreen';
			}else if (data.sprio == 'Medium'){
				row.style.background = 'orange';
			}else if (data.sprio == 'High'){
				row.style.background = 'red';
			}
		}
	}
}


function eventAtt(){
	for (var i = 0; i < localStorage.length; i++){
		var getkey = localStorage.key(i);
		var getvalue = localStorage.getItem(getkey);
		var id = JSON.parse(getvalue).sname;
		console.log(id);

	}
}




//  Delete the element when dragged to the pointed area //
document.getElementById('delArea').addEventListener('dragenter',function(event){
	event.preventDefault();
	this.style.border = '2px solid red';
});



//    !!!!!!!!!!!This took me too much time, dragover should prevendefault to let the element could be dropped!!!!!!!!!!!!!! //
document.getElementById('delArea').addEventListener('dragover',function(event){
	event.preventDefault();
});


//  Delete //
document.getElementById('delArea').addEventListener('drop',function(event){
	event.preventDefault();
	dragsave.remove();
	localStorage.removeItem(dragsave.id);
});

