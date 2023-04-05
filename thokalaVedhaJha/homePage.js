// concepts covered: 1. anonymous functions 2. switch case 3. page navigations

// navigation for home page
// DOM methods to get the elements that got triggered
window.addEventListener('load',function(){
	//using anonymous functions
	document.getElementById('foodBlog').addEventListener('click',function(){
		// creating same function to all events with passing different arguments
		navigateToSpecificPage('f');
	},false);
	document.getElementById('clothingBlog').addEventListener('click',function(){
		// creating same function to all events with passing different arguments
		navigateToSpecificPage('c');
	},false);document.getElementById('salonBlog').addEventListener('click',function(){
		// creating same function to all events with passing different arguments
		navigateToSpecificPage('s');
	},false);document.getElementById('gamingBlog').addEventListener('click',function(){
		// creating same function to all events with passing different arguments
		navigateToSpecificPage('g');
	},false);
},false);

function navigateToSpecificPage(page){
	
	//handling routing based on conditions
	switch(page){
		case 'f' : window.location = ".\\foodPage.html";
					break;
		case 'c' :  window.location = ".\\clothing.html";
					break;
		case 's' :  window.location = ".\\salonAndSpa.html";
					break;
		case 'g' : window.location = ".\\GuestBlackJack.html";
					break;				
	}
}

