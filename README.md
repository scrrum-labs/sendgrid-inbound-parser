# sendgrid-inbound-parser

## Configuration
1. Navigate to the MX Records page on your hosting provider’s website. If you’re unsure who your hosting or DNS provider is, please contact your website administrator.
2. Create a new MX record for the subdomain (e.g. parse.yourdomain.com) you want to process incoming email.
3. Assign the MX record a priority of 10, and point it to the address: mx.sendgrid.net.
It should look something like this:
```sh
10 mx.sendgrid.net.
```
4. From your SendGrid Dashboard click Settings, and then click Inbound Parse. You are now on the Inbound Parse page.
5. Click Add Host & URL. (The URL must be accessible from the public web.)
6. Enter the subdomain (for example, "parse") and select the authenticated root domain for your receiving domain. Enter the public URL where you would like the parsed data to be POSTed.
7. Click Save.


## Installation

```sh
$ npm install --save @scrrum-labs/sendgrid-inbound-parser
```

## Usage
At your hosted url
```sh
const sg = require("@scrrum-labs/sendgrid-inbound-parser");

export const storeEmail = functions.https.onRequest(async (request) => {
              const subject = sg.getSubject(request.body)
              const body = sg.getBody(request.body)
              const attachment = sg.getAttachment(request.body)
              });
```

## Methods
```js
getBody(data){} // It will return whole body: String, 
example: "Test Body" 

```
```js
getTo(data){} // It will return email ID & name of receiver: Array of object, 
example: [{email:"xyz@scrrum.com", name:"scrrum"}]

```
```js
getFrom(data){} // It will return email ID & name of sender: Array of object, 
example: [{email:"xyz@scrrum.com", name:"scrrum"}]

```

```js
getSubject(data){} // It will return subject of incomming email: String, 
example: "Test Subject" 

```
```js
getSenderIP(data){} // It will return IP address of incomming email: String, 
example: "90.92.80.92.02" 

```
```js
getAttachmentsNumber(data){} // It will return number of attachments: Number, 
example: 2

```
```js
getAttachmentInfo(data){} // It will return info of attachments: JavaScript object, 
Example: 
{
  "attachment1": {
    "filename": "46568986193797146.csv",
    "name": "46568986193797146.csv",
    "charset": "UTF-8",
    "type": "text/csv",
    "content-id": "f_lhj3sxzx1"
  },
  "attachment2": {
    "filename": "react.png",
    "name": "react.png",
    "type": "image/png",
    "content-id": "f_lhj3sxzq0"
  }
} 

```
```js
getAttachment(data){} // It will return attachments: Array of object, 
example: [{content:"",contentType:""}] 

```
```js
getHtmlBody(data){} // It will return whole html body : String, 
example: "<html><body>Test Body</body></html>"
