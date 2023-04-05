//js for clothing survey
/* concepts used : parallel arrays, Math object operations, history object,
adding css using javascript */

//created by lalitha
	
window.addEventListener('load',start,false); // load event

function start(){
	document.getElementById('searchAgain').addEventListener('click',function(){
		history.back();
	},false);
	let result = document.getElementById('result');
	// using parallel arrays and Math library operations
	let arr = [];
	let brandsArray = ['ZARA','TOMMY HILFIGER','BALENCIAGA','JIMMY CHOO','SABYA SACHI','MANISH MALHOTRA','DOLCE','CHANEL'];
	let brandLogo = ['zara.png','tommyhilfiger.jfif','balenciaga.png','jimmycoo.png','sabyasachi.jpg','manishmalhotra.png','dolce.jfif','chanel.png'];
	let numbers = [];	
	// generating unique random numbers
	const uniqueNumber = (maxVal) => {
	   const number = Math.floor(Math.random() * 8);
	   if (!numbers.includes(number)) {
		  numbers.push(number);
		  return number;
	   } else if (numbers.length - 1 !== maxVal) {
		  uniqueNumber(maxVal);
	   }
	}
	for(let i=0;i<3;i++){
		const randomNumber = uniqueNumber(100);
	}
	for(let j=0;j<numbers.length;j++){
		// creating an image tag
		let img = document.createElement('img');
		img.src = brandLogo[numbers[j]];
		img.alt = brandsArray[numbers[j]];
		//set the width of image 
		img.width = 200;
		//set the height of image
		img.height = 200;
		//adding css properties to image using javascript
		img.style.border = "1px solid skyblue";
		img.style.padding = "20px";
		img.style.borderRadius  = "20px";
		img.style.marginRight = "20px";
		result.append(img);
	}	
}