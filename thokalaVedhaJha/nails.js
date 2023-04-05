//craeted by JO, Lalitha
//jquery, JSON, this keyword, window function
var totalCost = 0;
var numberOfServices = 0;
//ready function
$(function(){
	//create event listeners for buttons
	$("#maniCure").click(function(){getQuote($(this).val())});
	$("#shellacManicure").click(function(){getQuote($(this).val())});
	$("#spaPediCure").click(function(){getQuote($(this).val())});
	$("#spaPediMani").click(function(){getQuote($(this).val())});
	$("#deluxeSpaPedicure").click(function(){getQuote($(this).val())});
	$("#clearButton").click(function(){location.reload()});
	$("#back").click(function(){goBack()});
	
//function description

function getQuote(serviceNails){
	
	$.ajax({
		type : "GET",
		cache : false, // default is true -- this argument is optional
		dataType : "json",//optional
		async : true , // true is the default
		url : "nails.json",
		success : function(data){
					console.log('success')
					$(data.nails).each(function(){
						//call function and send data
						if(serviceNails.toLowerCase().replace(" ","") == this.service.toLowerCase().replace(" ",""))
						{
							//calculate total cost
							totalCost += parseInt(this.cost);
							//increment services
							++numberOfServices ;
							//display results
							$("#resultPara1").html("The cost of " + serviceNails + " is $" + this.cost);
							$("#resultPara2").html("Number of services requested is " + numberOfServices );
							$("#resultPara3").html("The total cost is $" + totalCost );
							//showTable(this.service, this.cost);
						}
					})//each
			
		},//successess
		error: function (xhr, textStatus, errorThrown){
					alert("An error occured!" + (errorThrown? errorThrown : xhr.status + ""+textStatus));
				}//error
		
		
	})// end ajax
}//end function
	
});//end ready

function goBack(){
	//BOM function to navigate to previous page
	window.history.back();
}