// JavaScript Document //
let initH = 0;
let initM = 0;
let initS = 0;
let incre = 0;

let pomoS = 25;
let pomoO = 5;
let pomoB = 30;
let enSession = pomoS+pomoO;
let decre = 0;
let initRound = 4;
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

//  Set the pomodoro watch to typed value when set is clicked //
function setWatch(id1,id2,id3){
	//Check if the time exceed the recommended range//
	if(document.getElementById(id1).value > 300 || document.getElementById(id1).value < 10){
		alert('Value Range 10-300');
	}else{
		pomoS = document.getElementById(id1).value;
	}
	if(document.getElementById(id2) > 30 || document.getElementById(id2) < 5){
		alert('Value Range 5-30');
	}else{
		pomoO = document.getElementById(id2).value;
	}
	if(document.getElementById(id3).value > 120 || document.getElementById(id3).value < 20){
		alert('Value Range 20-120');
	}else{
		pomoB = document.getElementById(id3).value;
	}
	//  Incase bugs, single digit could still appear as 00 format  //
	if (pomoS.length<2){
		pomoS = '0'+pomoS;
	};
	if (pomoO.length<2){
		pomoO = '0'+pomoO;
	};
	if (pomoB.length<2){
		pomoB = '0'+pomoB;
	};
	enSession = Number(pomoS) + Number(pomoO);
	document.getElementById("time_p").innerHTML = pomoS;
}


// Reduce the time in pomodoro by 1 miniutes 60000. //
function timeReduce(){
	//  if the pomodoro on and off session is still running, keep the color and counting in the same style  //
	if (enSession == 00){
		if(initRound > 1){
			initRound -= 1;
			enSession = Number(pomoS)+Number(pomoO);
			document.getElementById('time_p').style.background = 'red';
		}
		// All sessions of on and off run out, take a big break   //
		else if(initRound == 1){
			initRound -= 1;
			enSession = Number(pomoB);
			document.getElementById('time_p').style.background = 'green'
		}
		// Big break over, stop the function by pomoreset //
		else if(initRound == 0){
			alert('Session End. Congrates!');
			document.getElementById('time_p').style.background = 'red';
			pomoReset();
		}
	}
	//  enSession is the total session time, in web browser, show the actual working session time by reduce off time //
	if (initRound > 0 && enSession > Number(pomoO)){
		document.getElementById("time_p").innerHTML = enSession - Number(pomoO);
	}
	// Showing the off time //
	if (initRound > 0 && enSession <= Number(pomoO)){
		document.getElementById('time_p').style.background = 'orange';
		document.getElementById("time_p").innerHTML = enSession;
	}
	if (initRound == 0){
		document.getElementById("time_p").innerHTML = enSession;
	}
	enSession -= decre;
	document.getElementById('round_p').innerHTML = 'x'+String(initRound)+' LEFT';
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




function turnOn(){
	incre = 1;
	document.getElementById('stopB').style.background = 'orange';
	document.getElementById('stopB').innerHTML = 'On';
}

function turnOff(){
	incre = 0;
	document.getElementById('stopB').style.background = 'lightgreen';
	document.getElementById('stopB').innerHTML = 'Start';
}

function reset(){
	initH = 0;
	initM = 0;
	initS = 0;
	incre = 0;
	document.getElementById('stopB').style.background = 'lightgreen';
	document.getElementById('stopB').innerHTML = 'Start';
}


function pomoStart(){
	decre = 1;
	state = 'on'
	document.getElementById('startP').style.background = 'orange';
	document.getElementById('startP').innerHTML = 'On';

}

function pomoStop(){
	decre = 0;
	document.getElementById('startP').style.background = 'lightgreen';
	document.getElementById('startP').innerHTML = 'Start';
}

function pomoReset(){
	state = 'off';
	pomoS = 25;
	pomoO = 5;
	pomoB = 30;
	enSession = 30;
	decre = 0;
	initRound = 4;
	document.getElementById('startP').style.background = 'lightgreen';
	document.getElementById('startP').innerHTML = 'Start';
}

window.setInterval('timeReduce()',100)
window.setInterval('getTime()',1000);
window.setInterval('timeStart()',1000);
