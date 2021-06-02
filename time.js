// JavaScript Document
let initH = 0;
let initM = 0;
let initS = 0;
let incre = 0;
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

function timeStart(){
	if (initS == 60){
		initM += 1;
		initS = 0;
	}
	if (initM == 60){
		initH += 1;
		initM = 0;
	}
	initS += incre;
	var H = String(initH);
	var M = String(initM);
	var S = String(initS);
	if (H.length<2){
		H = '0'+H;
	};
	if (M.length<2){
		M = '0'+M;
	};
	if (S.length<2){
		S = '0'+S;
	};
	document.getElementById("hour_s").innerHTML = H;
	document.getElementById("minute_s").innerHTML = M;
	document.getElementById("second_s").innerHTML = S;
}

function turnOn(){
	incre = 1;
}

function turnOff(){
	incre = 0;
}

function reset(){
	initH = 0;
	initM = 0;
	initS = 0;
	incre = 0;
}

function setWatch(id1,id2){
	var t = new Date();
	var H = document.getElementById(id1).value;
	var M = document.getElementById(id2).value;
	if(H > 24 || H < 0){
		alert('Value Range 0-24')
	}
	if(M > 60 || M < 0){
		alert('Value Range 0-60')
	}
	if (H.length<2){
		H = '0'+H;
	};
	if (M.length<2){
		M = '0'+M;
	};
	document.getElementById("hour_s").innerHTML = H;
	document.getElementById("minute_s").innerHTML = M;
	document.getElementById("second_s").innerHTML = '00';
}




function setTime(){
	var t = new Date();
	var H = '00';
	var M = '00';
	var S = '00';
	document.getElementById("hour_s").innerHTML = H;
	document.getElementById("minute_s").innerHTML = M;
	document.getElementById("second_s").innerHTML = S;
}

window.setInterval('getTime()',1000);
window.setInterval('timeStart()',1000);
