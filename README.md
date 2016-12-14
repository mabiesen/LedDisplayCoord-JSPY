# LedDisplayCoord-html
Jquery and css to simulate 32x32 led display and provide coordinates for reuse.

This project was created to take some of the guesswork out of led-display coding.  By having an interactive screen, the user can see what they are designing and arrive at a polished product faster.

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
