// JavaScript Document
localStorage.clear();
var colum  = 1;


var dragsave = 0;
var dragenter = 0;
var dragtype = 0;


var defpage = 'homepage';
var tempTask = 0;
//  Setting the title row to be able to create new element to make multiple columns  //
function reset(){
	defpage = 'homepage';
	$('.Head').css({background : 'white',color : 'black'});
	document.getElementById('homepage').style.background = 'black';
	document.getElementById('homepage').style.color = 'white';
	getAll();
}


function newCol(){
	var newBut = document.createElement('button');
	var add = document.getElementById('createB');
	add.style.display = 'inline-block';
	newBut.classList.add('Head');
	newBut.innerHTML = 'Page'+String(colum);
	newBut.id = newBut.innerHTML;
	
	
	
	// Define drag event //
	newBut.draggable = 'true';
	
	newBut.ondblclick = function(){
		var name = newBut.innerHTML;
		var pageName = prompt('Please Type Your Column Name',newBut.innerHTML);
		if (pageName != null && pageName.length > 0 && pageName.length <= 10 && pageName.match(/^[ ]*$/) == null){
			newBut.innerHTML = pageName;
			for (var i = 0; i < localStorage.length;i++){
				if (JSON.parse(localStorage.getItem(localStorage.key(i))).spage == name){
					var dropbox = JSON.parse(localStorage.getItem(localStorage.key(i)));
					var name = dropbox.sname;
					var date = dropbox.sdate;
					var est =  dropbox.sest;
					var statu = dropbox.sstatu;
					var prio = dropbox.sprio;
					var set = {sname:name, sdate:date, sest:est, sstatu:statu, sprio:prio, spage:pageName};
					localStorage.setItem(name,JSON.stringify(set));
				}
			}
		}else if (pageName.length > 10){
			alert(" Enter Less than 10 Characters ");
		}else if (pageName.match(/^[ ]*$/) != null){
			alert(' All characters are spaces ');
		}else{
			alert ('Errors');
		}
	};
	newBut.ondragstart = function(){
		// Make sure when dragging, the dragtype can tell exactly if its the column or the tasks //
		dragtype = 'col';
		dragsave = event.target;
	};
	newBut.onclick = function(){
		defpage = newBut.innerHTML;
		$('.Head').css({background : 'white',color : 'black'});
		newBut.style.background = 'black';
		newBut.style.color = 'white';
		getAll();
	};
	newBut.ondragover = function(){
		event.preventDefault();
	};
	
	newBut.ondrop = function(){
		event.preventDefault();
		//  Restore delete area style //
		
		
		
		// The way to change the localStorage is to redefine the terms, i can't find another way to alter them with less code  //
		var dropbox = JSON.parse(localStorage.getItem(dragsave.id));
		var name = dropbox.sname;
		var date = dropbox.sdate;
		var est =  dropbox.sest;
		var statu = dropbox.sstatu;
		var prio = dropbox.sprio;
		var set = {sname:name, sdate:date, sest:est, sstatu:statu, sprio:prio, spage:newBut.innerHTML};
		localStorage.setItem(name,JSON.stringify(set));
		
		//  Refresh page after all  //
		getAll();
	};
	
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
	
	
	// refresh page calling getALL() //
	getAll();
	
}





function getAll(){
	
	// When calling geAll function clear out all the displayed div and recreate a new set //
	document.getElementById('kbView').innerHTML ='';
	
	
	// Check for localStorage length  //
	var storeLen = localStorage.length;
	for (var i = 0; i < storeLen;i++){
		var getkey = localStorage.key(i);
		var getvalue = localStorage.getItem(getkey);
		
		//  Stored data should use JSON to pass to strings  //
		var data = JSON.parse(getvalue);
		
		
		//  Check over column names //
		if (defpage == 'homepage'){
			var row = document.createElement('div');
			
			
			// Showing the detail of tasks //
			row.innerHTML = ' &nbsp &nbsp '+String(data.sprio)+'&nbsp &nbsp &nbsp'+String(data.sdate)+'&nbsp &nbsp &nbsp'+String(data.sname)+'&nbsp &nbsp &nbsp EST: '+String(data.sest)+'&nbsp &nbsp &nbsp'+String(data.sstatu);
			document.getElementById('kbView').appendChild(row);
			
			
			
			// Add details //
			row.id = data.sname;
			row.classList.add('taskBar');
			row.draggable = 'true';
			//  Adding Drag Event  //
			row.addEventListener('dragstart',function(event){
				dragtype = 'task';
				dragsave = event.target;
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
			
			
			// Make sure color changes accordingly //
			if (data.sprio == 'Low'){
				row.style.background = 'lightgreen';
			}else if (data.sprio == 'Medium'){
				row.style.background = 'orange';
			}else if (data.sprio == 'High'){
				row.style.background = 'red';
			}
		}else{
			//  Only the homepage (defualt task list page) can show all tasks, other pages show categorized tasks only //
			if (data.spage == defpage){
				var row = document.createElement('div');
				
				//  The task infos   //
				row.innerHTML = ' &nbsp &nbsp '+String(data.sprio)+'&nbsp &nbsp &nbsp'+String(data.sdate)+'&nbsp &nbsp &nbsp'+String(data.sname)+'&nbsp &nbsp &nbsp EST: '+String(data.sest)+'&nbsp &nbsp &nbsp'+String(data.sstatu);
				document.getElementById('kbView').appendChild(row);
				
				
				//  Giving div ids using their names to better recall elsewherer  //
				row.id = data.sname;
				row.classList.add('taskBar');
				row.draggable = 'true';
				row.addEventListener('dragstart',function(event){
					dragtype = 'task';
					dragsave = event.target;
				});
				row.addEventListener('dragenter',function(event){
					dragenter = event.target;
					event.preventDefault();
					document.getElementById('kbView').insertBefore(dragsave,event.target.nextSibling);
				});
				row.addEventListener('dragleave',function(event){
					event.preventDefault();
					document.getElementById('kbView').insertBefore(dragsave,dragenter);
				});
				
				
				//  Color alternation according to priority level //
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
	document.getElementById('delArea').style.border = '2px dashed pink';	
	dragsave.remove();
	if (dragtype == 'task'){
		localStorage.removeItem(dragsave.id);
	}
	if (dragtype == 'col'){
		
		//  Go over all local storage and delete the one in the deleted pages  //
		var storeLen = localStorage.length;
		for (var i = 0; i < storeLen;i++){
			var getkey = localStorage.key(i);
			var getvalue = localStorage.getItem(getkey);
			var data = JSON.parse(getvalue);
			if (data.spage == dragsave.innerHTML){
				localStorage.removeItem(getkey);
			};
		reset();
		}
	}
	getAll();
});

