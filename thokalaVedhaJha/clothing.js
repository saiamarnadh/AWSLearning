//concepts covered  AJAX,XML with JS, PARRALEL ARRAYS, DOM
//created by lalitha, jyothsna

var xhr;// creating XMLHttpRequest object
let radioOptions;
window.addEventListener('load',populateData,false); //load event

function populateData(){
	xhr = new XMLHttpRequest();
	try{
		xhr.addEventListener('readystatechange',getData,false);
		xhr.open("get","clothing.xml",true);
		xhr.send(null);
	}catch(ex){
		alert(ex.message)
	}
}

function getData(){
	if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseXML){		
		var questions = xhr.responseXML.getElementsByTagName('questions');
		radioOptions = xhr.responseXML.getElementsByTagName('option');
		//get radio id from HTMLCollection
		var surveyQuestion = document.getElementById("clothingDiv");		
		for (let i=0; i<questions.length; i++)
		{
			let heading = document.createElement('h3');
			surveyQuestion.append(heading);
			let question = questions[i].getElementsByTagName("question").item(0).firstChild.nodeValue;
			let name = questions[i].getElementsByTagName("name").item(0).firstChild.nodeValue;
			let options = questions[i].getElementsByTagName("option");
			heading.innerHTML  = question;
			for(var j =0; j<options.length;j++){
				let radioButton = document.createElement('input');
				radioButton.setAttribute('type', 'radio');
				radioButton.setAttribute('name', name);
				//creating <p> element
				let para = document.createElement('p');	
				//creating <label> element
				let label = document.createElement('label');
				var optionValue = options.item(j).firstChild.nodeValue;
				radioButton.setAttribute("value",optionValue);
				label.innerHTML = optionValue;
				// append radibutton and label to para
				para.append(radioButton);
				para.append(label);
				// append para to surveyQuestion
				surveyQuestion.append(para);
				radioButton.required = true;
				
			}			
		}
	}
}