$(document).ready(function(){
	var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'; //table row will be letter
	var $td = $('td');
	var $foot = $('.footer');
	var $foruse = $('.boxtwo');
	var $clrbutton = $('#clear');
	var $fillbutton = $('#fill');
	var alphacall = 0;
	var ctr = 1;
	var returnstring = '';
	
	$td.each(function(){
		$(this).addClass(alphabet[alphacall] + ctr)
		ctr ++;
		if (ctr == 33){
			ctr = 1;
			alphacall ++;			
		}
	});
	

	$td.on('click',function(){
		$foot.text($(this).attr("class") + ' ' + $(this).css("background-color"));
		if($(this).css("background-color") == 'transparent'){
			$(this).css({
				'background-color': 'Black',
			});			
		}else{
			$(this).css({
				'background-color': 'transparent',
			});				
		}
		
		$td.each(function(){
			if($(this).css("background-color") == 'rgb(0, 0, 0)'){			
				returnstring = returnstring + $(this).attr("class")  + ', ';				
			}

		});
			returnstring = returnstring.substring(0, returnstring.length - 2)
			$foruse.text(returnstring);
			returnstring = '';
	});
	
	$clrbutton.on('click',function(){
		$td.each(function(){
			if ($(this).css('background-color') == 'rgb(0, 0, 0)'){
				$(this).css({
					'background-color': 'transparent',
				});
			}
		});
	});
	
	$fillbutton.on('click',function(){
		$td.css({
			'background-color': 'Black',
		});

	});	
	
});