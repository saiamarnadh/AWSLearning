//ajax,js,multiple xml,arrow functions

//page load event 
window.addEventListener("load", ()=> {
	//arrow anonymous function
	//create event listener for hair
	document.getElementById("hairDiv").addEventListener("click", ()=>{
		getXMLData('hair1.xml');
	}, false);
	//create event listener for facial
	document.getElementById("facialsDiv").addEventListener("click", (event) =>{
		getXMLData('facials.xml');
	}, false);
	//create event listener for nails
	document.getElementById("nailsDiv").addEventListener("click", (event) =>{
		getXMLData('nails.xml'); 
	}, false); //arrow function
},false);

//function to populate data from multiple xml's
function getXMLData(fileName) {
	//funtion call to clear images on click
	clearImages();
	//instantiate xhr by creating http request
	let xhr = new XMLHttpRequest() ;
	//event listener
	xhr.onreadystatechange = function() {
	if (xhr.readyState==4 && xhr.status == 200 && xhr.responseXML) {
		//creating div element using DOM 
		let div = document.createElement('div');
		//creating div element to display title
		let title =  document.createElement('div');
		title.innerHTML = xhr.responseXML.getElementsByTagName('title').item(0).firstChild.nodeValue;
		title.style.fontSize = "30px";
		title.style.color = "orange";
		//creating div tag in DOM
		let info = document.createElement('div');
		info.innerHTML = xhr.responseXML.getElementsByTagName('info').item(0).firstChild.nodeValue;
		info.style.fontSize = "14px";
		info.style.color = "orange";
		let rating =  document.createElement('div');
		rating.innerHTML = xhr.responseXML.getElementsByTagName('rating').item(0).firstChild.nodeValue;
		rating.style.fontSize = "20px";
		rating.style.color = "orange";
		//creating image tag in DOM
		let img = document.createElement('img');
		//access xml docs using AJAX
		img.src = xhr.responseXML.getElementsByTagName('url').item(0).firstChild.nodeValue;
		img.width = 455;
		img.height = 312;
		img.addEventListener('click',function(){
			clickImage(fileName)
		},false); 
		//append image, title, info, rating to dic element
		div.appendChild(img);
		div.appendChild(title);
		div.appendChild(info);
		div.appendChild(rating);
		resultPara.appendChild(div)
		}
	}		
		xhr.open ("get", fileName, true);
		xhr.send (null);
}
function clearImages(){
	resultPara.innerHTML = '';
}
function clickImage(name){
	if(name == 'hair1.xml'){
		//page navigation using BOM fucntion
		window.location = ".\\hair.html";
	}else if(name == 'facials.xml'){
		window.location = ".\\facial.html";
	}else if(name == 'nails.xml'){
		window.location = ".\\nails.html";
	}
}
		





