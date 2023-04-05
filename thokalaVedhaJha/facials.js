//
//concepts covered  AJAX,XML with JS, PARRALEL ARRAYS, DOM
//created by Lalitha
var xhr;// XMLHttpRequest object
window.addEventListener('load',populateData,false);

function populateData(){
	xhr = new XMLHttpRequest();
	try{
		//add readystatechange event listener
		xhr.addEventListener('readystatechange',getData,false);
		xhr.open("get","facials1.xml",true);
		xhr.send(null);
	}catch(ex){
		alert(ex.message)
	}
}

function getData(){
	if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseXML){		
		var methods = xhr.responseXML.getElementsByTagName('method');
		// generating random number
		let random = Math.floor( Math.random() * 4);
		for(let i=0;i<methods.length;i++){
			if(random == i){
				//creating div using DOM
				let div1 = document.createElement('div');
				let div2 = document.createElement('div');
				let div3 = document.createElement('div');
				// get the type of facial
				let type = methods[i].getElementsByTagName("type").item(0).firstChild.nodeValue;
				// get the definition of facial
				let definition  = methods[i].getElementsByTagName("definition").item(0).firstChild.nodeValue;
				// get the description of facial
				let description  = methods[i].getElementsByTagName("description").item(0).firstChild.nodeValue;
				//adding css properties using javascript
				div1.style.fontSize = "34px";
				div1.style.color = "orange";
				div3.style.fontSize = "20px";
				div2.style.fontSize = "20px";
				div1.style.marginTop = "30px";
				div2.style.marginTop = "30px";
				div3.style.marginTop = "30px";
				//append type, description,definition to the div elements
				div1.append(type);
				div2.append(definition);
				div3.append(description);
				// append div elements to resultPara div
				resultPara.appendChild(div1);
				resultPara.appendChild(div2);
				resultPara.appendChild(div3);

			}
		}				
	}
}


