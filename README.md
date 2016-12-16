# LedDisplayCoord-jspy

FUNCTION: This Repository aims to provide a way for the user to obtain and display coordinates for a 32x32 rgb led matrix from adafruit.
Coordinates are obtained through a website (which utilizes the css, html, js, audio, and picture files). The website allows users to experiment with led colors in real-time.
Python will retrieve coordinates and log inside a specific folder 'displays' located one step below the working directory.  Python will cycle through all files in this folder, interpret the data and display on the led screen.

HARDWARE REQUIREMENTS:  
```
Raspberry pi with necessities(powercord, display cable, mouse/keyboard, GPIO pins required, Raspbian OS), 
all necessary equipment for led display (pi hat, led display, 5v 4a power supply, potentially-soldering equipment), 
monitor, and LAPTOP COMPUTER BECAUSE THE PI CANNOT HANDLE THE WEBSITE AT THIS TIME, 
and mobile devices will not have strong functionality with the website.
```

SOFTWARE REQUIREMENTS: Tested on Rasbian OS obtained from NOOBS v. 2.1.0.  Requires the following:
```
FOR PYTHON WORK-------------------------
Below are the installs that are truly required, but for that sake of project comprehension I am also providing a list of all software I installed prior to testing. It is unlikely that my installs impacted operations.

DESIRED(maybe required) EMAIL PROVIDER:
  -GMAIL

TRULY REQUIRED OS:
  -Raspbian

TRULY REQUIRED PYTHON LIBRARIES:
  -datetime (pre-intsalled with NOOBS)
  -email  (pre-intsalled with NOOBS)
  -imaplib  (pre-intsalled with NOOBS????)
  -mailbox  (pre-intsalled with NOOBS)
  -time  (pre-intsalled with NOOBS)
  -OS  (pre-intsalled with NOOBS)
  -rgbmatrix(from adafruit). Install via git.
  
WHAT I INSTALLED(via terminal) PRIOR TO TEST:
    1  sudo apt-get update
    2  sudo apt-get upgrade
    3  sudo apt-get install python-dev
    4  sudo apt-get install libjpeg-dev
    5  sudo apt-get install libfreetype6-dev
    6  sudo apt-get install python-setuptools
    7  sudo apt-get install python-pip
    8  sudo easy_install -U distribute
    9  sudo pip install RPi.GPIO
   10  sudo pip install pySerial
   11  sudo pip install nose
   12  sudo pip install cmd2
   13  sudo apt-get install python-matplotlib
   14  sudo apt-get install python-mpltoolkits.basemap
   15  sudo apt-get install python-numpy
   16  sudo apt-get install python-scipy
   17  sudo apt-get install python-pandas
   18  sudo apt-get install python-qt4
   19  sudo apt-get install git
   20  sudo apt-get install sendemail
   21  sudo apt-get install sshfs
   22  sudo apt-get install alsa-utils
   23  sudo apt-get install mpg321
   24  sudo apt-get install lame
   25  sudo apt-get install microcom
   26  sudo apt-get install arduino
   27  sudo apt-get x11vnc
   28  sudo apt-get install x11vnc
   29  history > history_for_print.txt
   30 sudo apt-get install fetchmail
```

Jquery and css to simulate 32x32 led display and provide coordinates for reuse.
Python code to grab information from email folder at regular intervals.
Python code to interpret output for led display.
Python code to implement the interpreted output in the adafruit 32x32 led display, using adafruit libraries.

This project was created to take some of the guesswork out of led-display coding.  By having an interactive screen, the user can see what they are designing and arrive at a polished product faster.

BUG: When you click and drag to paint the table, sometimes you accidentally grab the screen(for lack of better terminology).
When this happens the mouse gets stuck in 'mousedown' mode until clicked. To investigate solutions, potentially get rid of the table and instead populate div boxes.

BUG: Mentioned later in the readme, the verbatim code currently does not allow colors to overwrite other colors.
With 90% certainty this was due to an array having duplicate spatial reference values, with only the first value being...
...pulled in using index.

DIRECTIONS
```
Click a cell once to change to a color or black. White is the default starting color.
Click and drag over cells to change to a color or black.
Buttons to fill all cells black, fill all cells white, fill all cells a certain color.
Color buttons to change the working color.  
Window on upper right side of the screen displays array of value-pair strings.  To modify later.
Set, display, and anim buttons are now operational.

If values are desired for a personal led display using python, copy values from the value window and paste the values into a text file.
Next, use the python script in this repository to convert the data to a readable form
NOTE: The color conversion was intended to suit adafruits 32x32 led matrix display and associated libraries. Max 7 rgb.
UPDATE: This is not true.  The python libraries accept 255 rgb.
```

Project began as black and white matrix and evolved to utilize color.  You may still see remnants of the black-and-white paradigm in the code.

Audio added to file to simulate the sound of plastic boxes clicking (like a keyboard).  Kind of annoying, need shorter softer sound.

TO DO
```
Animate verbatim has a bug which prevents one color from overwriting another, MOST LIKELY DRIVEN BY ARRAY ITERATION, using indexOf for color values.
Create toggle for fill buttons that will determine if all cells are filled or only black cells. Potentially, create drop down and allow user to select the colored cells which will be changed. (ex. select black cells and only black cells will be filled with the active color.)
Add colors, potentially sync color picker html to give users leeway with color selection
Change button color on click to alert user that click was successful. Kind of did this with some buttons, but not effectively.
Create window to show active color, or potentially change the mouse color (I think this idea is neater).
```

Once polished, I intend to used this webpage to update my led-display over the internet and impress my nephew.
