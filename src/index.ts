  export const getContact = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let to = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"to\""));
    to = to?.split("\"to\"")[1].trim();
    const contacts: any[] = [];
    const parts = to?.split(",");
    for (const part of parts? parts : "") {
      const match = part?.trim().match(/^(.+?)?\s*<(.+?)>$/);
      if (match) {
        const [, name, email] = match;
        contacts.push({name: name?.trim() || null, email: email?.trim()});
      } else {
        contacts.push({name: null, email: part?.trim()});
      }
    }
    return contacts;
  }
  
  export const getTo = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let to = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"to\""));
    to = to?.split("\"to\"")[1].trim();
    return to;
  }
  
  export const getBody = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let body = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"text\""));
    body = body?.split("\"text\"")[1].trim();
    return body;
  }
  
  export const getFrom = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let from = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"from\""));
    from = from?.split("\"from\"")[1].trim();
    const contacts: any[] = [];
    const parts = from?.split(",");
    for (const part of parts? parts : "") {
      const match = part?.trim().match(/^(.+?)?\s*<(.+?)>$/);
      if (match) {
        const [, name, email] = match;
        contacts.push({name: name?.trim() || null, email: email?.trim()});
      } else {
        contacts.push({name: null, email: part?.trim()});
      }
    }
    return contacts;
  }
  
  export const getSubject = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let subject = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"subject\""));
    subject = subject?.split("\"subject\"")[1].trim();
    return subject;
  }
  
  export const getSenderIP = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let senderIP = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"sender_ip\""));
    senderIP = senderIP?.split("\"sender_ip\"")[1].trim();
    return senderIP;
  }
  
  export const getAttachmentsNumber = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let attachments = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"attachments\""));
    attachments = attachments?.split("\"attachments\"")[1].trim();
    const attachmentsNumber = parseInt(attachments? attachments : "0");
    return attachmentsNumber;
  }
  
  export const getHtmlBody = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let html = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"html\""));
    html = html?.split("\"html\"")[1].trim();
    return html;
  }
  
  export const getAttachmentInfo = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let attachmentInfo = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"attachment-info\""));
    attachmentInfo = attachmentInfo?.split("\"attachment-info\"")[1].trim();
    return JSON.parse(attachmentInfo);
  }
  
  export const getAttachment = (data:any) => {
    const emailBody = data.toString();
    const arrayBody = emailBody.split("--xYzZY");
    let attachments = arrayBody.find((t : any) => t.includes("Content-Disposition: form-data; name=\"attachments\""));
    attachments = attachments?.split("\"attachments\"")[1].trim();
    const attachmentsNumber = parseInt(attachments? attachments : "0");
    const attachment : any[] = []
  
    if(attachments){
      for (let i=1; i<=attachmentsNumber; i++) {
        const attachmentDataArray = arrayBody.find((t : any) => t.includes(`Content-Disposition: form-data; name="attachment${i}"`));
        const attachmentDataAll = attachmentDataArray?.split(`"attachment${i}"`)[1].trim();
        const fileRegex = /filename="(.*?)"/;
        const fileMatch = fileRegex.exec(attachmentDataAll? attachmentDataAll: "");
        const filename = fileMatch && fileMatch[1];
        const contentTypeMatch = attachmentDataAll?.match(/Content-Type:\s*([^\n\r]+)/i);
        const contentType = contentTypeMatch ? contentTypeMatch[1] : "";
        const content = attachmentDataAll?.split(`Content-Type: ${contentType}`)[1].trim();
  
        attachment.push({ content: content, contentType: contentType, fileName: filename });
        
      }    
      return attachment
    }
    else{
      return "No Attachments found";
    }
  
  }