$(document).ready(function(){
	var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'; //table row will be letter
	var $td = $('td');
	var $foot = $('.footer');
	var $foruse = $('.boxtwo');
	var $clrbutton = $('#clear');
	var $fillbutton = $('#fill');
	var $eraser = $('#eraser');
	var $acolor = $('.acolor');
	var mycolor = 'white';
	var alphacall = 0;
	var ctr = 1;
	var returnstring = '';
	var theclass = '';
	var theclassarray = '';
	var myclass = '';
	var workinghash = {};
	var ismousedown = false;
	var receivedvalue = '';
	var clicksound = 'clicksound.mp3';
	var recordone = {};
	var recordtwo = {};
	var recordthree = {};
	
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
	//--
	
	//-test of functionality with first object
	$('.set').on('click',function(){
		var mynum = 0;
		var hold = $(this).parent();
		var sometext = hold.attr("class");
		switch(sometext){
			case 'record1':
				mynum = 1;
				break;
			case 'record2':
				mynum = 2;
				break;
			case 'record3':
				mynum = 3;
				break;
		}
		changearrval(mynum);
	});
	
	$('.display').on('click',function(){
		var mynum = 0;
		var hold = $(this).parent();
		var sometext = hold.attr("class");
		switch(sometext){
			case 'record1':
				mynum = 1;
				break;
			case 'record2':
				mynum = 2;
				break;
			case 'record3':
				mynum = 3;
				break;
		}
		displayrecord(mynum);
	});
	
	/*Function to changevalue of record arrays. Num used to determine array change.*/
	/*Taking the safe way to clone the associative array*/
	function changearrval(num){
		switch(num){
			case 1:
				recordone = {};
				Object.keys(workinghash).forEach(function(key){
					recordone[key] = workinghash[key];
				});
			
				break;
			case 2:
				recordtwo = {};
				Object.keys(workinghash).forEach(function(key){
					recordtwo[key] = workinghash[key];
				});			
				break;
			case 3:
				recordthree = {};
				Object.keys(workinghash).forEach(function(key){
					recordthree[key] = workinghash[key];
				});	
				break;
		}
	}
	//--
	
	//function to empty selected record.  Not really necessary, might remove later
	function emptyrecord(num){
		switch(num){
			case 1:
				recordone = {};
				break;
			case 2:
				recordtwo = {};
				break;
			case 3:
				recordthree = {};
				break;
		}
	}
	//--
	
	//function to clear screen and print saved display
	function displayrecord(num){
			$td.each(function(){
				receivedvalue = getclass($(this),1);
				$(this).removeClass(receivedvalue);
				$(this).addClass('black');
			});
		switch(num){
			case 1:
				for (propc in recordone){
					$('.' + propc).removeClass('black');
					$('.' + propc).addClass(recordone[propc]);
				};
				break;
			case 2:
				for (propc in recordtwo){
					$('.' + propc).removeClass('black');
					$('.' + propc).addClass(recordtwo[propc]);
				};			
				break;
			case 3:
				for (propc in recordthree){
					$('.' + propc).removeClass('black');
					$('.' + propc).addClass(recordthree[propc]);
				};			
				break;
		}
	}
	//--
	
	/*Function to get color class*/
	function getclass($myvar, i){
				theclass = $myvar.attr("class");
				theclassarray = theclass.split(" ");
				myclass = theclassarray[i];
				return myclass;
	}
	//--
	
	/*Function calculate colors update box*/
	function calccolor(){
		returnstring = '';
		workinghash = {};
		$td.each(function(){
			if($(this).css("background-color") !== 'rgb(0, 0, 0)'){
				receivedvalue = getclass($(this),0);
				workinghash[receivedvalue] = getclass($(this),1);
				returnstring = returnstring + receivedvalue + ':' + $(this).css("background-color") + ', ';
			}
		});
			$foruse.text(returnstring);
	}
	//--
	
	//function below is used to play sounds on request ---
	function playSound(url){ //dynamic sound function, uses file location as argument.  accepts relative location
	  var audio = document.createElement('audio');
	  audio.style.display = "none";
	  audio.src = url;
	  audio.autoplay = true;
	  audio.onended = function(){
		audio.remove(); //Remove when played.
	  }
	  document.body.appendChild(audio);
	}
	//--
	
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
		playSound(clicksound);
	});
	//--
	
	/*clears the entire table*/
	$clrbutton.on('click',function(){
		$td.each(function(){
			receivedvalue = getclass($(this),1);
			$(this).removeClass(receivedvalue);
			$(this).addClass('white');
		});
		calccolor();
	});
	//--
	
	/*fills the entire table black*/
	$fillbutton.on('click',function(){
		$td.each(function(){
				receivedvalue = getclass($(this),1);
				$(this).removeClass(receivedvalue);
				$(this).addClass('black');
		});
		calccolor();
	});
	//--
	
	/*Click a color to change your active color*/
	$acolor.on('click',function(){
			mycolor = getclass($(this),0);
		});
	//--
	
	/*Toggle mousedown value for click and drag*/
	$('body').on('mousedown', function(){
		ismousedown = true;
	});
	//--
	
	/*Toggle mousedown value for click and drag*/
	$('body').on('mouseup', function(){
		ismousedown = false;
		calccolor();
	});
	//--
	
	/*Click and drag code.*/
	$td.on('mouseover',function(){
		if(ismousedown == true){
				receivedvalue = getclass($(this),1);
				$(this).removeClass(receivedvalue);
				$(this).addClass(mycolor);
		}
	});
	//--
	
	
	
});