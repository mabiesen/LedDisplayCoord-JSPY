# LedDisplayCoord-html
Jquery and css to simulate 32x32 led display and provide coordinates for reuse.

Script currently errors with clear and fill screen commands, presumable due to too much data being evaluated. Changing methodologies to utilize class addition/subtraction in order to change element colors.

Update: I learned the hard way that buttons do not act as one might assume at first glance.  Once this was realized to be the problem there was no issue clearin gthe screen.  It was still best practice to move to a class-change paradigm anyway.
