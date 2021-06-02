// JavaScript Document

//  Get time in xx:xx:xx format  //

function getTime(){
	var t = new Date();
	var H = String(t.getHours());
	var M = String(t.getMinutes());
	var S = String(t.getSeconds());
	if (H.length<2){
		H = '0'+H;
	};
	if (M.length<2){
		M = '0'+M;
	};
	if (S.length<2){
		S = '0'+S;
	};
	var time = H+' : '+M+' : '+S;
	document.getElementById("hour").innerHTML = H;
	document.getElementById("minute").innerHTML = M;
	document.getElementById("second").innerHTML = S;
}


//  Refresh every 1 second  //
window.setInterval('getTime()',100);


function setTime(){
	var t = new Date();
	var H = '00';
	var M = '00';
	var S = '00';
	if (H.length<2){
		H = '0'+H;
	};
	if (M.length<2){
		M = '0'+M;
	};
	if (S.length<2){
		S = '0'+S;
	};
	var time = H+' : '+M+' : '+S;	
	document.getElementById("hour_s").innerHTML = H;
	document.getElementById("minute_s").innerHTML = M;
	document.getElementById("second_s").innerHTML = S;
}

window.setInterval('setTime()',100);