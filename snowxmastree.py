#This python script is intended to convert the javascript output, which is in rgb format and with undesirable xy coordinates
#information on matrix coordinates can be obtained from https://learn.adafruit.com/32x16-32x32-rgb-led-matrix/library
import random
import time
from rgbmatrix import Adafruit_RGBmatrix
#NOTE: adafruit library should be housed in the same folder as your scripts.


#open the file
fromemailfile = open('/home/pi/PythonScripts/LEDMatrix/christmastree.txt')#for windows users, format is C:\\folder\\...\\file.extension
fromemailread = fromemailfile.read()
fromemailarray = fromemailread.split(';')#we should now hoave an array, where each array item consists of xy and color
alpharray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F']
xycordarray = []
oldcolorarray = []
newcolorarray = []
xarray = []
yarray = []
ticker = 'off'


#go through array and separate coordinates and color into separate arrays
for i in range(len(fromemailarray)):
  mysplit = fromemailarray[i]
  mysplit = mysplit.split(':')
  xycordarray.append(mysplit[0])
  print(mysplit[0])
  oldcolorarray.append(mysplit[1])
  print(mysplit[1])

#Separate The x and y values into separate arrays.
for j in range(len(xycordarray)):
  mysecondsplit = xycordarray[j]
  tempx = ''
  tempy = '' 
  for k in range(len(mysecondsplit)):
    thischar = mysecondsplit[k]
    if thischar.isdigit():
      tempx = tempx + thischar 
    else:
      tempy = tempy + thischar

  tempx = int(tempx)-1#because arrays are zero indexed, the js was not    
  xarray.append(tempx)
  yarray.append(tempy)

print(xarray)
print(yarray)

#at this stage, we have fully separated x and y arrays, but the y array needs to be
#converted to the appropriate integer value for the
#adafruit matrix library.  We also still need to convert color from
#a 255 color scheme to a 7 color scheme for matrix capabilities
#NOTE: meddled with yarray in this area after 615am save

#Find the number that corresponds to the string letter value in yarray. After this, we are done manipulating coordinates
for p in range(len(yarray)):
  thenum = ''
  thenum = alpharray.index(yarray[p])
  yarray[p] = thenum

print('yarray')
print(yarray)

#pull relevant numbers out of the rgbstring
#Needed to be careful here due to varying integer lengths.  Opted to identify integers and mash together as strings until
#the code comes across a string. then the mashed value is dumped into an array and the ticker is turned off, preventing further mashings.
for l in range(len(oldcolorarray)):
  tempcolor = oldcolorarray[l]
  ticker = 'off'
  tempdigit = ''
  for m in range(len(tempcolor)):
    thischar = tempcolor[m]
    if thischar.isdigit():
      if ticker == 'on':
        tempdigit += str(thischar)
      else:
        ticker = 'on'
        tempdigit = str(thischar)#This is important, clears tempdigit of old value
    else:
      if ticker == 'on':
        ticker = 'off'
        newcolorarray.append(tempdigit)

        
print(newcolorarray)
#now colors need to be reduced for the 7,7,7 format, while being kept in sets of three
#UPDATE: This is not true, colors do not need to be reduced
##n = 0
##ctr = 0
##while n < len(newcolorarray):
##  newnum = (int(newcolorarray[n])/255)*7
##  newnum = round(int(newnum))
##  newcolorarray[n] = newnum
##  n += 1
##
##print(newcolorarray)

if len(newcolorarray)/3 == len(yarray):
  print('AMAZING. All seems kosher')

#through the code above, we now successfully obtained the desired format.
#the output of this code is stored in three arrays:
#newcolorarray: contains colors in base 7 form. r, g, and b values are stored separately in the array.
#xarray: stores x coordinates as integers 0 through 31
#yarray: stores y coordinates as integers 0 through 31

#Last step, PRINT THE FILE TO THE MATRIX!!!
matrix = Adafruit_RGBmatrix(32, 1)
  
def printtree():
  r=0
  t=0
  while r < len(yarray):
    matrix.SetPixel(int(xarray[r]),int(yarray[r]),int(newcolorarray[t]),int(newcolorarray[t+1]),int(newcolorarray[t+2]))
    r = r + 1
    t = t + 3

def letitsnow():
  x = 0
  y = 0
  for x in range(32):
    for y in range(32):
      y = y + 1
      a = random.randrange(1,20)
      b = random.randrange(1,20)
      if a == b:
        matrix.SetPixel(x,y,220,220,220)
    x = x + 1


def picturecontrols():
  r=0
  while r < 30:
    matrix.Clear()
    letitsnow()
    printtree()
    time.sleep(1)
    r = r + 1


picturecontrols()
time.sleep(5.0)
matrix.Clear()




