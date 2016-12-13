$(document).ready(function(){
	var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'; //table row will be letter
	var $td = $('td');
	var $foot = $('.footer');
	var $foruse = $('.boxtwo');
	var $fillwhite = $('#fillwhite');
	var $fillblack = $('#fillblack');
	var $fillcolor = $('#fillcolor');
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
	
	//three set elements are returned, the switch statement determines which was selected
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
	//--
	
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
	//--
	
	//--animate recordings onto screen
	$('.anim').on('click',function(){
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
		animate(mynum);
	});
	//--
	
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
	function animate(num){
		switch(num){
			case 1:
				var anum = 0;
				Object.keys(recordone).forEach(function(key, anum){
					setTimeout(function(){
					receivedvalue = getclass($('.' + key), 1);
					$('.' + key).removeClass(receivedvalue);
					$('.' + key).addClass(recordone[key]);
					calccolor();
					},30*(anum++));
				});	
				break;
			case 2:
				var anum = 0;
				Object.keys(recordtwo).forEach(function(key, anum){
					setTimeout(function(){
					receivedvalue = getclass($('.' + key), 1);
					$('.' + key).removeClass(receivedvalue);
					$('.' + key).addClass(recordtwo[key]);
					calccolor();					
					},30*(anum++));
				});	
				break;
			case 3:
				var anum = 0;
				Object.keys(recordthree).forEach(function(key, anum){
					setTimeout(function(){
					receivedvalue = getclass($('.' + key), 1);
					$('.' + key).removeClass(receivedvalue);
					$('.' + key).addClass(recordthree[key]);
					calccolor();
					},30*(anum++));
				});	
				break;
		}
	}
	//--
	
	//function to clear screen and print saved display.  Commented out clear screen to test ux.
	function displayrecord(num){
			/*$td.each(function(){
				receivedvalue = getclass($(this),1);
				$(this).removeClass(receivedvalue);
				$(this).addClass('black');
			});*/
		switch(num){
			case 1:
				for (propc in recordone){
					receivedvalue = getclass($('.' + propc), 1);					
					$('.' + propc).removeClass(receivedvalue);
					$('.' + propc).addClass(recordone[propc]);
				};		
				calccolor();
				break;
			case 2:
				for (propc in recordtwo){
					receivedvalue = getclass($('.' + propc), 1);					
					$('.' + propc).removeClass(receivedvalue);
					$('.' + propc).addClass(recordtwo[propc]);
				};		
				calccolor();
				break;
			case 3:
				for (propc in recordthree){
					receivedvalue = getclass($('.' + propc), 1);
					$('.' + propc).removeClass(receivedvalue);
					$('.' + propc).addClass(recordthree[propc]);
				};			
				calccolor();
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
				returnstring = returnstring + receivedvalue + ':' + $(this).css("background-color") + ';';
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
	
	/*fills entire table white*/
	$fillwhite.on('click',function(){
		$td.each(function(){
			receivedvalue = getclass($(this),1);
			$(this).removeClass(receivedvalue);
			$(this).addClass('white');
		});
		calccolor();
	});
	//--
	
	/*fills the entire table black*/
	$fillblack.on('click',function(){
		$td.each(function(){
				receivedvalue = getclass($(this),1);
				$(this).removeClass(receivedvalue);
				$(this).addClass('black');
		});
		calccolor();
	});
	//--
	
	/*fills entire table white*/
	$fillcolor.on('click',function(){
		$td.each(function(){
			receivedvalue = getclass($(this),1);
			$(this).removeClass(receivedvalue);
			$(this).addClass(mycolor);
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
	
	/*make buttons look like they are clicked. The 'onmousedown' and 'onmouseup' is handled in the html*/
	$('.myrecord, .mybutton').on('click',function(){
		$(this).addClass('itspushed');
	});
	
	$('.myrecord, .mybutton').on('mouseout',function(){
		$(this).removeClass('itspushed');
	});
	
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