//created by JO, Lalitha
//AJAX, mutiplr XML, javascript, event arrow function
//function XMLDocument

function hairStyling(url){		
	try{
		//AJAX redquest
		ajaxRequest = new XMLHttpRequest();
		ajaxRequest.addEventListener("readystatechange",function() 
		{
			//readystatus change check
			if(ajaxRequest.readyState ==4 && ajaxRequest.status ==200 && ajaxRequest.responseXML)
			{
				//get xml data and build table to show output
				var hairMethod = ajaxRequest.responseXML.getElementsByTagName("method");
				//traverse through each index
				for(let i=0 ; i< hairMethod.length ; i++)
				{
					
					let method = hairMethod.item(i);
					//get the topic from xml
					let type = method.getElementsByTagName("type").item(0).firstChild.nodeValue;
					//get the definition from xml
					let definition = method.getElementsByTagName("definition").item(0).firstChild.nodeValue;
					
					let table = document.getElementById("resultPara1");
					//create table rows, cells using DOM
					var headingRow = document.createElement("tr");
					var typeColumn = document.createElement("td");
					var definitionColumn = document.createElement("td");
					//assign vaalues from xml to rows and cells
					typeColumn.innerHTML = type;
					definitionColumn.innerHTML = definition;
					//append the cells to rows and rows to table
					headingRow.appendChild(typeColumn);
					headingRow.appendChild(definitionColumn);
					
					table.appendChild(headingRow);
					console.log(table);
				}//end for
			}//end ajaxreq
		}//arrow func end
		,false);
		ajaxRequest.open("GET",url,true );
		ajaxRequest.send(null);
	}catch (ex){
		alert("request failed");
	}//end try catch
	
}//func end

function deleteTable(id){
	//function to clear the table
	var tableId = document.getElementById("resultPara1");
	console.log(id);
	while (tableId.firstChild) 
	{
		//DOM function
		tableId.removeChild(tableId.firstChild);
	}//end while
}//end delete table func

//page load
window.addEventListener("load",() => {
	document.getElementById('itemsList').addEventListener('click',(event) => {
		if(event.target.innerHTML == 'Hair Dressing'){
			//function call to clear the previous data in the table
			deleteTable("resultPara1");
			//let displayMessage1;
			let displayMessage2;
			//displayMessage1 = "<h3>Good Hair Day Is All You Need</h3>";
			 displayMessage2 =`<iframe width="550" height="400" src="https://www.youtube.com/embed/pcbg4LBbP44"> </iframe>`;
			//document.getElementById("resultPara1").innerHTML  = displayMessage1;
			
			//AJAX call to load xml and display content
			 hairStyling("hair.xml");
			
			document.getElementById("resultPara2").innerHTML  = displayMessage2;
			
		}else if(event.target.innerHTML == 'Hair Coloring'){
			
			//function call to clear the previous data in the table
			deleteTable("resultPara1");
			//video link to be displayed
			document.getElementById("resultPara2").innerHTML  =`<iframe width="550" height="400" src="https://www.youtube.com/embed/K64uJve9sAo"> </iframe>`;
	
			//AJAX call to load xml and display content
			 hairStyling("hairColor.xml");
		}else if(event.target.innerHTML == 'Hair Spa'){
			//function call to clear the previous data in the table
			deleteTable("resultPara1");
			//video link to be displayed
			document.getElementById("resultPara2").innerHTML  =`<iframe width="550" height="400" src="https://www.youtube.com/embed/T1dMN2crBic"> </iframe>`;
	
			//AJAX call to load xml and display content
			 hairStyling("hairSpa.xml");
			
		}else if(event.target.innerHTML == 'Scalp Treatment'){
			
			//function call to clear the previous data in the table
			deleteTable("resultPara1");
			//document.getElementById("resultPara1").innerHTML = "<h3>Benefits of Scalp Treatment<h3>"
			//video link to be displayed
			document.getElementById("resultPara2").innerHTML  =`<iframe width="550" height="400" src="https://www.youtube.com/embed/p8xfGTehQZI"> </iframe>`;
	
			//AJAX call to load xml and display content
			 hairStyling("hairScalp.xml");
		}
	},false);// itemsList end	
},false); // load event end