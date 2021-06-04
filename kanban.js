// JavaScript Document
localStorage.clear();
var colum  = 1;


var dragsave = 0;
var dragenter = 0;


var defpage = 'homepage';
var tempTask = 0;
//  Setting the title row to be able to create new element to make multiple columns  //
function reset(){
	defpage = 'homepage';
	$('.kbHead').css({background : 'white',color : 'black'});
	document.getElementById('homepage').style.background = 'black';
	document.getElementById('homepage').style.color = 'white';
	getAll();
}


function newCol(){
	var newBut = document.createElement('button');
	var add = document.getElementById('createB');
	add.style.display = 'inline-block';
	newBut.classList.add('kbHead');
	newBut.innerHTML = 'Page'+String(colum);
	newBut.id = String(colum);
	newBut.onclick = function(){
		
		defpage = newBut.innerHTML;
		$('.kbHead').css({background : 'white',color : 'black'});
		newBut.style.background = 'black';
		newBut.style.color = 'white';
		console.log(defpage);
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
				row.innerHTML = ' &nbsp &nbsp '+String(data.sprio)+'&nbsp &nbsp &nbsp'+String(data.sdate)+'&nbsp &nbsp &nbsp'+String(data.sname)+'&nbsp &nbsp &nbsp EST: '+String(data.sest)+'&nbsp &nbsp &nbsp'+String(data.sstatu);
				document.getElementById('kbView').appendChild(row);
				row.id = data.sname;
				row.classList.add('taskBar');
				row.draggable = 'true';
				row.addEventListener('dragstart',function(event){
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
	dragsave.remove();
	localStorage.removeItem(dragsave.id);
});

