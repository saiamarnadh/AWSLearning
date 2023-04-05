//global variables

var chineseTotal = 0;
var indiaTotal =0;

//load function

function start(){
	document.getElementById('chineseSubmit').addEventListener('click',placeChineseOrder,false);
	document.getElementById('indianSubmit').addEventListener('click',placeIndianOrder,false);
	document.getElementById('chineseFood').addEventListener("change",function()
        {
            let element=$(this).find("option:selected"); //get the option which user select
            let price=element.attr("data-price"); //from the selected option get the data-price value
            $("#chinesePrice").val(price); //set the price in the chinese price
        })		
		
		var indianOption=document.querySelectorAll("[name='indianOption']"); //select all indianOption radio button
        //run a loop through all indianOption radio button
        indianOption.forEach((item,index) =>
        {
            //add change method in each indian option radio button
            item.addEventListener("change",function()
            {
                console.log("Change happen");
                let price=item.getAttribute("data-price"); //get the price from the selected radio button
                $("#indianPrice").val(price);
                //let qty=document.getElementById("qtyIndian").value; //get the quantity value
               // let total=getTotal(price,qty); //get the total
                //console.log(total);
               // $("#indianTotal strong").text(total); //set the total
            })
        })
		
		
}
function placeChineseOrder(){
	let qtyValue = document.getElementById('qtyChinese').value;
	console.log(qtyValue,'qtyValue');
	let p = document.getElementById('chinesePrice').value;
	console.log(p,"p")
	
	if(qtyValue &&  qtyValue > 0 && p){
		let confirm = window.confirm("Are you sure");
		if(confirm){			
			placeOrderChinese(qtyValue,p);
		}
	}else if( !qtyValue && !p){
		window.alert('Please select an item')
	}else if(!qtyValue && p){
		window.alert('Please enter the quantity')
	}else if(qtyValue && !p){
		window.alert('Please select the item')
	}else if(qtyValue <= 0){
		window.alert('quantity should be greater than 0');
			}

}

function placeIndianOrder(){
	let qtyValueIndia = document.getElementById('qtyIndian').value;
	
	let priceIndia = document.getElementById('indianPrice').value;

	
	if(qtyValueIndia && priceIndia  && qtyValueIndia > 0){
		let confirm = window.confirm("Are you sure");
		if(confirm){			
			placeOrderIndian(qtyValueIndia,priceIndia);
		}
	}else if( !qtyValueIndia && !priceIndia){
		window.alert('Please select an item')
	}else if(!qtyValueIndia && priceIndia){
		window.alert('Please enter the quantity')
	}else if(qtyValueIndia && !priceIndia){
		window.alert('Please select the item')
	}else if(qtyValueIndia <= 0){
		window.alert('quantity should be greater than 0');
		return;
	}
}


function placeOrderChinese(qtyValue,p){	
	chineseTotal =  parseInt(qtyValue) * parseInt(p);	
	document.getElementById('chineseTotal').innerHTML = "Total is : " + " " + chineseTotal;	
	setTotal();	
}

function placeOrderIndian(qtyValueIndia,priceIndia){
	
	indiaTotal =  parseInt(qtyValueIndia) * parseInt(priceIndia);	
	document.getElementById('indianTotal').innerHTML = "Total is : " + " " + indiaTotal;
	setTotal();	
}


function setTotal()
	{
		let id=Math.floor(Math.random() * 100000000);
		let chinaValue = chineseTotal;
		let indiaValue = indiaTotal;
		document.getElementById('orderID').innerHTML = id;
		document.getElementById('chineseTable').innerHTML = chinaValue;
		document.getElementById('indianTable').innerHTML = indiaTotal;
		document.getElementById('allTotal').innerHTML = (indiaTotal + chinaValue);		
	}

window.addEventListener("load",start,false);