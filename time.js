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
	document.getElementById("clock").innerHTML = time;
}


//  Refresh every 1 second  //
window.setInterval('getTime()',100);