localStorage.clear();


var group = 1;
var defgroup = 'homegroup'
var section = 'link';



function refresh(){
	defgroup = 'homegroup';
	$('.Head').css({background : 'white',color : 'black'});
	document.getElementById('homegroup').style.background = 'black';
	document.getElementById('homegroup').style.color = 'white';
	getLink();
}

function newLink(){
	
	var source = document.getElementById('sourceName').value;
	var link = document. getElementById('linkAddress').value;
	var page = defgroup;
	
	if (source.length > 0  && link.length > 0  && localStorage.getItem(source) == null){
		var set = {rsource: source, rlink: link, rsection:section, rgroup:defgroup}
		localStorage.setItem(source,JSON.stringify(set));
	}else{
		alert('some errors occured, Make sure no repeating names');
	}
		
	getLink();
}

function newGroup(condition){
	var newBut = document.createElement('button');
	var add = document.getElementById('creatR');
	add.style.display = 'inline-block';
	newBut.classList.add('Head');

	if (condition.length > 0){
		newBut.innerHTML = condition;
	}else{
		newBut.innerHTML = 'Group'+String(group);
	}
	
	
	newBut.id = newBut.innerHTML;
	
	
	
	// Define drag event //
	newBut.draggable = 'true';
	
	newBut.ondblclick = function(){
		var name = newBut.innerHTML;
		var pageName = prompt('Please Type Your Group Name',newBut.innerHTML);
		if (pageName != null && pageName.length > 0 && pageName.length <= 10 && pageName.match(/^[ ]*$/) == null){
			newBut.innerHTML = pageName;
			for (var i = 0; i < localStorage.length;i++){
				if (JSON.parse(localStorage.getItem(localStorage.key(i))).rgroup == name){
					var dropbox = JSON.parse(localStorage.getItem(localStorage.key(i)));
					var source = dropbox.rsource;
					var link = dropbox.rlink;
					var page = dropbox.rgroup;
					var section = dropbox.rsection;
					var set = {rsource: source, rlink: link, rsection:section, rgroup:defgroup};
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
		// Make sure when dragging, the movetype can tell exactly if its the column or the tasks //
		movetype = 'col';
		dragsave = event.target;
	};
	
	// Change the style when clicking and change the default page to the selected page  //
	newBut.onclick = function(){
		defgroup = newBut.innerHTML;
		$('.Head').css({background : 'white',color : 'black'});
		newBut.style.background = 'black';
		newBut.style.color = 'white';
		getLink();
	};
	newBut.ondragover = function(){
		event.preventDefault();
	};
	
	newBut.ondrop = function(){
		event.preventDefault();
		//  Restore delete area style //
		
		// The way to change the localStorage is to redefine the terms, i can't find another way to alter them with less code  //
		var dropbox = JSON.parse(localStorage.getItem(dragsave.id));
		var source = dropbox.rsource;
		var link = dropbox.rlink;
		var page = dropbox.rgroup;
		var section = dropbox.rsection;
		var set = {rsource: source, rlink: link, rsection:section, rgroup:newBut.innerHTML};
		localStorage.setItem(source,JSON.stringify(set));
		
		//  Refresh page after all  //
		getLink();
	};
	
	// add the new tab(column) to the right before the add button //
	document.getElementById('rdTitle').insertBefore(newBut,add);
	group += 1;

}


function getLink(){
	
	// When calling geAll function clear out all the displayed div and recreate a new set //
	document.getElementById('linkboard').innerHTML ='';
	
	var linkgroup = new Array();
	
	
	// Check for localStorage length  //
	var storeLen = localStorage.length;
	for (var i = 0; i < storeLen;i++){
		var getkey = localStorage.key(i);
		var getvalue = localStorage.getItem(getkey);
		//  Stored data should use JSON to pass to strings  //
		var data = JSON.parse(getvalue);
		
		if (linkgroup.indexOf(data.rgroup) == -1){
			
			linkgroup.push(data.rgroup);
		}
		
		//  Check over column names //
		if (defgroup == 'homegroup'){
			var row = document.createElement('div');
			
			
			// Showing the detail of tasks //
			
			

			row.innerHTML = '&nbsp &nbsp &nbsp &nbsp'+data.rsource;
			document.getElementById('linkboard').appendChild(row);
			row.id = data.rsource;
			
			
			
			
			// Add details //
			
			row.classList.add('linkBar');
			row.draggable = 'true';
			//Create Hyper Link using onclick //
			row.addEventListener('click', function(event){
				window.open('https://'+data.rlink);
			})
			//  Adding Drag Event  //
			row.addEventListener('dragstart',function(event){
				movetype = 'task';
				dragsave = event.target;
			});
			//  Record the event target and move it afterwards  //
			row.addEventListener('dragenter',function(event){
				dragenter = event.target;
				event.preventDefault();
				document.getElementById('linkboard').insertBefore(dragsave,event.target.nextSibling);
			});
			row.addEventListener('dragleave',function(event){
				event.preventDefault();
				document.getElementById('linkboard').insertBefore(dragsave,dragenter);
			});
			
			
		}else{
			//  Only the homepage (defualt task list page) can show all tasks, other pages show categorized tasks only //
			if (data.rgroup == defgroup){
				var row = document.createElement('div');
				
				//  The task infos   //
				row.innerHTML = '&nbsp &nbsp &nbsp &nbsp'+data.rsource;
				document.getElementById('linkboard').appendChild(row);
				row.id = data.rsource;
				
				//  Giving div ids using their names to better recall elsewherer  //
				
				row.classList.add('linkBar');
				row.draggable = 'true';
				row.addEventListener('dragstart',function(event){
					movetype = 'task';
					dragsave = event.target;
					console.log(localStorage.key.length);
				});
				row.addEventListener('dragenter',function(event){
					dragenter = event.target;
					event.preventDefault();
					document.getElementById('linkboard').insertBefore(dragsave,event.target.nextSibling);
				});
				row.addEventListener('dragleave',function(event){
					event.preventDefault();
					document.getElementById('linkboard').insertBefore(dragsave,dragenter);
				});
			}
		}
	}
	
	// When refreshing pages localstorage should have all the previous pages ready. //
	for (var i = 0; i < linkgroup.length; i++){
		if (document.getElementById(linkgroup[i]) == null){
			newGroup(linkgroup[i]);
		}
	}
}

document.getElementById('delcollect').addEventListener('dragenter',function(event){
	event.preventDefault();
	this.style.border = '2px solid red';
});



//    !!!!!!!!!!!This took me too much time, dragover should prevendefault to let the element could be dropped!!!!!!!!!!!!!! //
document.getElementById('delcollect').addEventListener('dragover',function(event){
	event.preventDefault();
});


//  Delete //
document.getElementById('delcollect').addEventListener('drop',function(event){
	event.preventDefault();
	document.getElementById('delcollect').style.border = '2px dashed pink';	
	dragsave.remove();
	if (movetype == 'task'){
		localStorage.removeItem(dragsave.id);
	}
	if (movetype == 'col'){
		
		//  Go over all local storage and delete the one in the deleted pages  //
		var storeLen = localStorage.length;
		for (var i = 0; i < storeLen;i++){
			var getkey = localStorage.key(i);
			var getvalue = localStorage.getItem(getkey);
			var data = JSON.parse(getvalue);
			if (data.rgroup == dragsave.innerHTML){
				localStorage.removeItem(getkey);
			};
		refresh();
		}
	}
	getLink();
});

function openAll(){
	// In order to open multiple windows, window.open should have a name value attached or it will only show the very first window (in some browsers) //
	
	// Ok this is not about renaming or attaching value. the web browser automatically stop more than 1 windows, if the functionally need to work properly, it requires a change in the block rules //
	var storeLen = localStorage.length;
	for (var i = 0; i < storeLen;i++){
		var getkey = localStorage.key(i);
		var getvalue = localStorage.getItem(getkey);
		var data = JSON.parse(getvalue);
		if (data.rgroup == defgroup){
			window.open('https://'+data.rlink,'_blank');
		};
	}
}


getLink();

