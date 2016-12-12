$(document).ready(function(){
	var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'; //table row will be letter
	var $td = $('td');
	var $foot = $('.footer');
	var $foruse = $('.boxtwo');
	var $clrbutton = $('#clear');
	var $fillbutton = $('#fill');
	var $black = ('.black'); //all items with class black
	var alphacall = 0;
	var ctr = 1;
	var returnstring = '';
	var blackvalues = '';
	var theclass = '';
	var theclassarray = '';
	var firstclass = '';
	var workingarray = [];
	
	$td.each(function(){
		$(this).addClass(alphabet[alphacall] + ctr)
		ctr ++;
		if (ctr == 33){
			ctr = 1;
			alphacall ++;			
		}
	});
	

	$td.on('click',function(){
			
		returnstring = '';
		workingarray = [];
		
		if($(this).css("background-color") == 'transparent'){
			$(this).addClass('black');		
		}else{
			$(this).removeClass('black');			
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
	
	$clrbutton.on('click',function(){
		$td.each(function(){
			$(this).removeClass('black');
		});
	});
	
	$fillbutton.on('click',function(){
		$td.each(function(){
			if($(this).css('background-color') !== 'rgb(0, 0, 0)'){
				$(this).addClass('black');
			}
		});

	});	
	
});