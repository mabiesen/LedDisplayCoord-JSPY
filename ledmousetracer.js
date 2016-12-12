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
	var mycolor = $('.white');
	var alphacall = 0;
	var ctr = 1;
	var returnstring = '';
	var blackvalues = '';
	var theclass = '';
	var theclassarray = '';
	var firstclass = '';
	var workingarray = [];
	var x = '';
	var ismousedown = false;
	var mytoggle = false;
	
	/*On Load, give ids to the table data.*/
	$td.each(function(){
		$(this).addClass(alphabet[alphacall] + ctr)
		ctr ++;
		if (ctr == 33){
			ctr = 1;
			alphacall ++;			
		}
	});
	
	/*on table data click, change the color of the selected cell.  We also log all black cells in an array and display in the window.  
	Plans to add saving capability to favorite arrays*/
	$td.on('click',function(){			
		returnstring = '';
		workingarray = [];		
		if($(this).css("background-color") !== 'rgb(0, 0, 0)'){
			$(this).addClass('black');		
		}else{
			$(this).removeClass('black');
			$(this).addClass($mycolor)
		}		
		$td.each(function(){
			if($(this).css("background-color") == 'rgb(0, 0, 0)'){
				theclass = $(this).attr("class");
				theclassarray = theclass.split(" ");
				firstclass = theclassarray[0];
				workingarray.push(firstclass);
				returnstring = returnstring + firstclass  + ', ';				
			}
		});
			returnstring = returnstring.substring(0, returnstring.length - 2)
			$foruse.text(returnstring);
			$foot.text(workingarray);	
	});
	
	/*clears the entire table*/
	$clrbutton.on('click',function(){
		$td.each(function(){
			$(this).removeClass('black');
		});
	});
	
	/*fills the entire table black*/
	$fillbutton.on('click',function(){
		$td.each(function(){
			if($(this).css('background-color') !== 'rgb(0, 0, 0)'){
				$(this).addClass('black');
			}
		});
	});	
	
		/*fills the entire table black*/
	$acolor.on('click',function(){
			theclass = $(this).attr("class");
			theclassarray = theclass.split(" ");
			mycolor = theclassarray[1];
		});
	
	$('body').on('mousedown', function(){
		ismousedown = true;
	});
	
	$('body').on('mouseup', function(){
		ismousedown = false;
	});
	
	$td.on('mouseover',function(){
		if(ismousedown == true){
			if($(this).css('background-color') !== 'rgb(0, 0, 0)'){
					if(mytoggle == true){
						$(this).addClass('black');
					}
			}else{

				$(this).removeClass('black');
				/*$(this).addClass()*/
			}
		}
	});			
	
	
	
});