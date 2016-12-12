# LedDisplayCoord-html
Jquery and css to simulate 32x32 led display and provide coordinates for reuse.

This project was created to take some of the guesswork out of led-display coding.  By having an interactive screen, the user can see what they are designing and arrive at a polished product faster.

Click a cell once to change to a color or black.
Click and drag over cells to change to a color or black (depending on toggle setting)
Buttons to fill all cells black, fill all cells white.
Color buttons to change the working color.  Currently non-functional.
Window on upper right side of the screen displays black cell ids at this time.

At this stage, currently changing paradigms to support a color led display.  Color buttons will be activated and store the current color in a variable called my color. Intend to create a function which gathers the color class from an element as this is frequently required and lengthy in practice.  Window on upper right side will be altered to display color information(potentially color text).  Need to alter list code to contain color information for export.  

I still need to create a toggle switch for the drag feature.

Once polished, I intend to used this webpage to update my led-display over the internet and impress my nephew.
