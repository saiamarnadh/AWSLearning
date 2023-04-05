//created by Jyothsna
//inner loops, DOM, AJAX, JSON, dynamic dropdown

var xhr;
//page load event
window.addEventListener('load',function(){
	//instantiate xhr object
xhr = new XMLHttpRequest();
	try{
		//eventlistener for xhr object
		xhr.addEventListener('readystatechange',function(){
			if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText){
				//assign the json data to a variable
				dataFromJson = JSON.parse(xhr.responseText).facilsurvey.facial;	
				var facialSurvey = document.getElementById("FacialDiv");
				//iterate to load dropdown
				for (let i = 0; i < dataFromJson.length; i++ )
					{
						//question
						let surveyQuestion = document.createElement('h4');
						facialSurvey.appendChild(surveyQuestion);
						//create dropdown using DOM
						let dropDown = document.createElement('select');
						//Set name attribute for the dropdown
						dropDown.setAttribute('name', "survey");
						facialSurvey.appendChild(dropDown);
						//get id from JSON
						var id = dataFromJson[i].id[i];
						dropDown.setAttribute('id', id);
						//diplay question on the screen
						surveyQuestion.innerHTML  = dataFromJson[i].question;
						var optionValue = dataFromJson[i].option;//.firstChild.nodeValue;
						//loopig to display dropdown values from JSON
						for (var j = 0; j < optionValue.length; j++) 
						{
							//create option tag using DOM
								var option = document.createElement("option");
								option.setAttribute("value", optionValue[j]);
								option.text = optionValue 	[j];
								//append options to select tag
								dropDown.appendChild(option);
								}
						
					}
			}				
		},false);//end readystate change
		xhr.open("get","facial.json",true);
		xhr.send(null);
	}//end try
	catch(ex){
		alert(ex.message)
	}//end catch
},false); //end event listener
