$(document).ready(function(){
	var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'; //table row will be letter
	var $foot = $('.footer');
	var $foruse = $('#boxone');
	var $boxtwo = $('#boxtwo');
	var $fillwhite = $('#fillwhite');
	var $fillblack = $('#fillblack');
	var $fillcolor = $('#fillcolor');
	var $acolor = $('.acolor');
	var mycolor = 'white';
	var alphacall = 0;
	var returnstring = '';
	var theclass = '';
	var theclassarray = '';
	var myclass = '';
	var workinghash = {};
	var verbatimon = 'off';
	var verbatimkey = [];
	var verbatimvalue = [];
	var ismousedown = false;
	var receivedvalue = '';
	var clicksound = 'clicksound.mp3';
	var recordone = {};
	var recordtwo = {};
	var recordthree = {};
	

	/*CREATE BOXES*/
	for(var ctr=1, x=0; x < 1024; ctr ++, x++){
		if(ctr == 33){
			ctr = 1;
			alphacall ++;
		}
		var $newbox = $(document.createElement('span'));
		$newbox.addClass('ledbox');
		$newbox.addClass(alphabet[alphacall] + ctr);
		$newbox.addClass('black');
		$foruse.append($newbox);
	}

	var $ledbox = $('.ledbox');

	//Function created to load clicked ledbox into record. storing values and keys separately because animation may require
	//a cell id to be used more than once. Zero index gets element ID, mycolor gets color printed at time of clicking.
	function createverbatim($anelement){
		verbatimkey.push(getclass($anelement,1));
		verbatimvalue.push(mycolor);
		$('.footer').text(verbatimkey);
	}
	//--
	

//-----RECORDING FUNCTIONS ------------------------------------------------
	
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
					receivedvalue = getclass($('.' + key), 2);
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
					receivedvalue = getclass($('.' + key), 2);
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
					receivedvalue = getclass($('.' + key), 2);
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
		switch(num){
			case 1:
				for (propc in recordone){
					receivedvalue = getclass($('.' + propc), 2);					
					$('.' + propc).removeClass(receivedvalue);
					$('.' + propc).addClass(recordone[propc]);
				};		
				calccolor();
				break;
			case 2:
				for (propc in recordtwo){
					receivedvalue = getclass($('.' + propc), 2);					
					$('.' + propc).removeClass(receivedvalue);
					$('.' + propc).addClass(recordtwo[propc]);
				};		
				calccolor();
				break;
			case 3:
				for (propc in recordthree){
					receivedvalue = getclass($('.' + propc), 2);
					$('.' + propc).removeClass(receivedvalue);
					$('.' + propc).addClass(recordthree[propc]);
				};			
				calccolor();
				break;
		}
	}
	
	
	
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
	
        

//----------------UTILITY FUNCTIONS ------------------------------------------

        /*Function calculate colors update box*/
        function calccolor(){
                returnstring = '';
                workinghash = {};
                $ledbox.each(function(){
                        if($(this).css("background-color") !== 'rgb(0, 0, 0)'){
                                receivedvalue = getclass($(this),1);
                                workinghash[receivedvalue] = getclass($(this),2);
                                returnstring = returnstring + receivedvalue + ':' + $(this).css("background-color") + ';';
                        }
                });
                        $boxtwo.text(returnstring);
        }



        /*Function to get color class*/
        function getclass($myvar, i){
                                theclass = $myvar.attr("class");
                                theclassarray = theclass.split(" ");
                                myclass = theclassarray[i];
                                return myclass;
        }

//--------------Animatoin LISTENERS-------------------------------------------------------------  

        //Set both verbatim arrays to null
        $('.clearverbatim').on('click',function(){
                verbatimon = 'off';
                verbatimkey = [];
                verbatimvalue = [];
        });
        //--

        //Function to start recording verbatim. Toggles variable to allow function calls when color is changed.
        $('.startverbatim').on('click',function(){
                verbatimon = 'on';
        });
        //--

        //Function to stop recording verbatim
        $('.stopverbatim').on('click',function(){
                verbatimon = 'off';
        });
        //--

        //Function to display verbatim
        //need to remove existing class before adding new class
        $('.animateverbatim').on('click',function(){
                $('.footer').text('imhere');
                verbatimkey.forEach(function(key){
                        setTimeout(function(){
                                receivedvalue = getclass($('.' + key), 2);
                                $('.' + key).removeClass(receivedvalue);
                                $('.' + key).addClass(verbatimvalue[verbatimkey.indexOf(key)]);
                        },50*(verbatimkey.indexOf(key)));
                });
                $('.footer').text(getclass(key,2));
        });



//-----RECORD LISTENERS -----------------------------------
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


//----------- COLOR CHANGE LISTENER ------------------

        /*Click a color to change your active color*/
        $acolor.on('click',function(){
                        mycolor = getclass($(this),0);
                });

//----------CLICK AND DRAG LISTENERS, BODY -------------
        /*Toggle mousedown value for click and drag*/
        $('body').on('mousedown', function(){
                ismousedown = true;
        });

        /*Toggle mousedown value for click and drag*/
        $('body').on('mouseup', function(){
                ismousedown = false;
                calccolor();
        });

//-------- COLOR FILL LISTENERS ------------------------------- 
        /*fills entire table white*/
        $fillwhite.on('click',function(){
                $ledbox.each(function(){
                        receivedvalue = getclass($(this),2);
                        $(this).removeClass(receivedvalue);
                        $(this).addClass('white');
                });
                calccolor();
        });
        //--

        /*fills the entire table black*/
        $fillblack.on('click',function(){
                $ledbox.each(function(){
                                receivedvalue = getclass($(this),2);
                                $(this).removeClass(receivedvalue);
                                $(this).addClass('black');
                });
                calccolor();
        });
        //--

        /*fills entire table white*/
        $fillcolor.on('click',function(){
                $ledbox.each(function(){
                        receivedvalue = getclass($(this),2);
                        $(this).removeClass(receivedvalue);
                        $(this).addClass(mycolor);
                });
                calccolor();
        });
        //--


//--------------- LED BOX LISTENERS ---------------------------------------------
	


	/*on table data click, change the color of the selected cell.  We also log all black cells in an array and display in the window.  
        Plans to add saving capability to favorite arrays*/
        $ledbox.on('click',function(){
                if($(this).css("background-color") !== 'rgb(0, 0, 0)'){
                        receivedvalue = getclass($(this),2);
                        $(this).removeClass(receivedvalue);
                        $(this).addClass('black');
                }else{
                        receivedvalue = getclass($(this),2)
                        $(this).removeClass(receivedvalue);
                        $(this).addClass(mycolor);
                        if(verbatimon == 'on'){
                                createverbatim($(this));
                        }
                }
                calccolor();
                playSound(clicksound);
        });
        //--

	/*Click and drag code.*/
	$ledbox.on('mouseover',function(){
		if(ismousedown == true){
				receivedvalue = getclass($(this),2);
				$(this).removeClass(receivedvalue);
				$(this).addClass(mycolor);
				if(mycolor !== 'black'){
					if(verbatimon == 'on'){
						createverbatim($(this));
					}
				}
		}
	});
	//--
	
	
	
});
