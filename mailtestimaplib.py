
#email functionality ripped from Ed Chapman at stackoverflow.com when IMAPClient refused to function properly
#http://stackoverflow.com/questions/2230037/how-to-fetch-an-email-body-using-imaplib-in-python
import datetime
import email
import imaplib
import mailbox
import time

def themailfunction():
  file_name = ''

  EMAIL_ACCOUNT = "upandcomming88@gmail.com"#your email
  PASSWORD = "password"#this is your password to your email account

  mail = imaplib.IMAP4_SSL('imap.gmail.com')
  mail.login(EMAIL_ACCOUNT, PASSWORD)
  mail.list()
  mail.select('LEDCOORD')
  result, data = mail.uid('search', None, "UNSEEN") # (ALL/UNSEEN)
  i = len(data[0].split())

  for x in range(i):
      latest_email_uid = data[0].split()[x]
      result, email_data = mail.uid('fetch', latest_email_uid, '(RFC822)')
      # result, email_data = conn.store(num,'-FLAGS','\\Seen') 
      # this might work to set flag to seen, if it doesn't already
      raw_email = email_data[0][1]
      raw_email_string = raw_email.decode('utf-8')
      email_message = email.message_from_string(raw_email_string)

      # Header Details
      date_tuple = email.utils.parsedate_tz(email_message['Date'])
      if date_tuple:
          local_date = datetime.datetime.fromtimestamp(email.utils.mktime_tz(date_tuple))
          local_message_date = "%s" %(str(local_date.strftime("%a, %d %b %Y %H:%M:%S")))
      email_from = str(email.header.make_header(email.header.decode_header(email_message['From'])))
      email_to = str(email.header.make_header(email.header.decode_header(email_message['To'])))
      subject = str(email.header.make_header(email.header.decode_header(email_message['Subject'])))

      # Body details
      for part in email_message.walk():
          if part.get_content_type() == "text/plain":
              body = part.get_payload(decode=True)
              file_name = "email_" + str(x) + ".txt"#for led project, this is treated as temp file
              output_file = open(file_name, 'w')
              output_file.write("From: %s\nTo: %s\nDate: %s\nSubject: %s\n\nBody: \n\n%s" %(email_from, email_to,local_message_date, subject, body.decode('utf-8')))
              output_file.close()
          else:
              continue
        

  #lines below are for the sake of the led project
  #but it should be noted, if no filename was found below an error is reported, hence the blank variable declaration at top
  if(file_name != ''):
    stringiwant = ''
    f = open(file_name)
    lines = f.readlines()#at this point lines is a list with unstructured nextlines. convert to string to reduce problems
    linesiwant = lines[7:]
    for item in linesiwant:
        stringiwant = stringiwant + item

    print(stringiwant)
    writetime = str(time.time())#this line makes each file unique through EPOC time
    fileandlocation = '/home/pi/PythonScripts/LEDMatrix/displays/'
    fileandlocation = fileandlocation + writetime + 'new.txt'#This is the permanent file for our email data
    output_file = open(fileandlocation, 'w')
    output_file.write(stringiwant)
    output_file.close()

    
        
