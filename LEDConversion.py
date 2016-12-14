#This python script is intended to convert the javascript output, which is in rgb format and with undesirable xy coordinates
#information on matrix coordinates can be obtained from https://learn.adafruit.com/32x16-32x32-rgb-led-matrix/library
#NOTE: there may be an issue with trying to store the email info as a string.  the spaces and or commas may cause issues, but should be ok
#per goldilocks challenge

#open the file
fromemailfile = open('C:\\Users\Matt\Documents\PythonCode\webledapple.txt')#for windows users, format is C:\\folder\\...\\file.extension
fromemailread = fromemailfile.read()
fromemailarray = fromemailread.split(';')#we should now hoave an array, where each array item consists of xy and color
alpharray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F']
xycordarray = []
oldcolorarray = []
newcolorarray = []
xarray = []
yarray = []
ticker = 'off'

for i in range(len(fromemailarray)):
  mysplit = fromemailarray[i]
  mysplit = mysplit.split(':')
  xycordarray.append(mysplit[0])
  print(mysplit[0])
  oldcolorarray.append(mysplit[1])
  print(mysplit[1])
  
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

for p in range(len(yarray)):
  thenum = ''
  thenum = alpharray.index(yarray[p])
  yarray[p] = thenum

print('yarray')
print(yarray)

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
        tempdigit = str(thischar)
    else:
      if ticker == 'on':
        ticker = 'off'
        newcolorarray.append(tempdigit)

        
print(newcolorarray)
#good up to this point as of 12-14 535am.  now colors need to be reduced for the 7,7,7 format, while being kept in sets of three
n = 0
ctr = 0
while n < len(newcolorarray): #reassign values for base 7 rgb
  newnum = (int(newcolorarray[n])/255)*7
  newnum = round(int(newnum))
  newcolorarray[n] = newnum
  n += 1

print(newcolorarray)

if len(newcolorarray)/3 == len(yarray):
  print('AMAZING. All seems kosher')

#good up to this point as of 12-14 6:15am.  colors are in proper format, x and y arrays in proper format. lengths check out.
  





