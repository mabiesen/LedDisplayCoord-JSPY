#This python script is intended to convert the javascript output, which is in rgb format and with undesirable xy coordinates
#information on matrix coordinates can be obtained from https://learn.adafruit.com/32x16-32x32-rgb-led-matrix/library
#NOTE: there may be an issue with trying to store the email info as a string.  the spaces and or commas may cause issues, but should be ok
#per goldilocks challenge

#open the file
fromemailfile = open('C:\\Users\Matt\Documents\PythonCode\webledapple.txt')#for windows users, format is C:\\folder\\...\\file.extension
fromemailread = fromemailfile.read()
fromemailarray = fromemailread.split(';')#we should now hoave an array, where each array item consists of xy and color
xycordarray = []
colorarray = []
xarray = []
yarray = []

for i in range(len(fromemailarray)):
  mysplit = fromemailarray[i]
  mysplit = mysplit.split(':')
  xycordarray.append(mysplit[0])
  print(mysplit[0])
  colorarray.append(mysplit[1])
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
  xarray.append(tempx)
  yarray.append(tempy)

print(xarray)
print(yarray)
  
