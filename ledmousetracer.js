$(document).ready(function(){
	var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'; //table row will be letter
	var $td = $('td');
	var $foot = $('.footer');
	var $foruse = $('.boxtwo');
	var $clrbutton = $('#clear');
	var $fillbutton = $('#fill');
	var $eraser = $('#eraser');
	var $black = $('.black'); //all items with class black. colors etc.
	var $acolor = $('.acolor');
	var $white = $('.white');
	var $green = $('.green');
	var $pink = $('.pink');
	var $blue = $('.blue');
	var $lightblue = $('.lightblue');
	var $red = $('.red');
	var $orange = $('.orange');
	var $yellow = $('.yellow');
	var mycolor = 'white';
	var alphacall = 0;
	var ctr = 1;
	var returnstring = '';
	var theclass = '';
	var theclassarray = '';
	var firstclass = '';
	var workingarray = {};
	var ismousedown = false;
	var receivedvalue = '';
	
	/*On Load, give ids to the table data.*/
	$td.each(function(){
		$(this).addClass(alphabet[alphacall] + ctr);
		$(this).addClass('black');
		ctr ++;
		if (ctr == 33){
			ctr = 1;
			alphacall ++;			
		}
	});
	
	/*Function to get color class*/
	function getclass($myvar, i){
				theclass = $myvar.attr("class");
				theclassarray = theclass.split(" ");
				firstclass = theclassarray[i];
				return firstclass;
	}
	
	/*Function calculate colors update box*/
	function calccolor(){
		returnstring = '';	
		$td.each(function(){
			if($(this).css("background-color") !== 'rgb(0, 0, 0)'){
				receivedvalue = getclass($(this),0);
				returnstring = returnstring + receivedvalue + ':' + $(this).css("background-color") + ', ';
			}
		});
			$foruse.text(returnstring);
	}
	
	/*on table data click, change the color of the selected cell.  We also log all black cells in an array and display in the window.  
	Plans to add saving capability to favorite arrays*/
	$td.on('click',function(){			
		if($(this).css("background-color") !== 'rgb(0, 0, 0)'){
			receivedvalue = getclass($(this),1);
			$(this).removeClass(receivedvalue);
			$(this).addClass('black');		
		}else{
			receivedvalue = getclass($(this),1)
			$(this).removeClass(receivedvalue);
			$(this).addClass(mycolor);
		}		
		calccolor();
	});
	
	/*clears the entire table*/
	$clrbutton.on('click',function(){
		$td.each(function(){
			receivedvalue = getclass($(this),1);
			$(this).removeClass(receivedvalue);
			$(this).addClass('white');
		});
		calccolor();
	});
	
	/*fills the entire table black*/
	$fillbutton.on('click',function(){
		$td.each(function(){
				receivedvalue = getclass($(this),1);
				$(this).removeClass(receivedvalue);
				$(this).addClass('black');
		});
		calccolor();
	});	
	
		/*Click a color to change your active color*/
	$acolor.on('click',function(){
			mycolor = getclass($(this),0);
		});
	
	/*Toggle mousedown value for click and drag*/
	$('body').on('mousedown', function(){
		ismousedown = true;
	});
	
	/*Toggle mousedown value for click and drag*/
	$('body').on('mouseup', function(){
		ismousedown = false;
		calccolor();
	});
	
	/*Click and drag code.*/
	$td.on('mouseover',function(){
		if(ismousedown == true){
				receivedvalue = getclass($(this),1);
				$(this).removeClass(receivedvalue);
				$(this).addClass(mycolor);
		}
	});			
	
	
	
});