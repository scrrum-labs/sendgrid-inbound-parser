"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttachment = exports.getAttachmentInfo = exports.getHtmlBody = exports.getAttachmentsNumber = exports.getSenderIP = exports.getSubject = exports.getFrom = exports.getBody = exports.getTo = exports.getContact = void 0;
var getContact = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var to = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"to\""); });
    to = to === null || to === void 0 ? void 0 : to.split("\"to\"")[1].trim();
    var contacts = [];
    var parts = to === null || to === void 0 ? void 0 : to.split(",");
    for (var _i = 0, _a = parts ? parts : ""; _i < _a.length; _i++) {
        var part = _a[_i];
        var match = part === null || part === void 0 ? void 0 : part.trim().match(/^(.+?)?\s*<(.+?)>$/);
        if (match) {
            var name_1 = match[1], email = match[2];
            contacts.push({ name: (name_1 === null || name_1 === void 0 ? void 0 : name_1.trim()) || null, email: email === null || email === void 0 ? void 0 : email.trim() });
        }
        else {
            contacts.push({ name: null, email: part === null || part === void 0 ? void 0 : part.trim() });
        }
    }
    return contacts;
};
exports.getContact = getContact;
var getTo = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var to = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"to\""); });
    to = to === null || to === void 0 ? void 0 : to.split("\"to\"")[1].trim();
    return to;
};
exports.getTo = getTo;
var getBody = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var body = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"text\""); });
    body = body === null || body === void 0 ? void 0 : body.split("\"text\"")[1].trim();
    return body;
};
exports.getBody = getBody;
var getFrom = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var from = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"from\""); });
    from = from === null || from === void 0 ? void 0 : from.split("\"from\"")[1].trim();
    var contacts = [];
    var parts = from === null || from === void 0 ? void 0 : from.split(",");
    for (var _i = 0, _a = parts ? parts : ""; _i < _a.length; _i++) {
        var part = _a[_i];
        var match = part === null || part === void 0 ? void 0 : part.trim().match(/^(.+?)?\s*<(.+?)>$/);
        if (match) {
            var name_2 = match[1], email = match[2];
            contacts.push({ name: (name_2 === null || name_2 === void 0 ? void 0 : name_2.trim()) || null, email: email === null || email === void 0 ? void 0 : email.trim() });
        }
        else {
            contacts.push({ name: null, email: part === null || part === void 0 ? void 0 : part.trim() });
        }
    }
    return contacts;
};
exports.getFrom = getFrom;
var getSubject = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var subject = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"subject\""); });
    subject = subject === null || subject === void 0 ? void 0 : subject.split("\"subject\"")[1].trim();
    return subject;
};
exports.getSubject = getSubject;
var getSenderIP = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var senderIP = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"sender_ip\""); });
    senderIP = senderIP === null || senderIP === void 0 ? void 0 : senderIP.split("\"sender_ip\"")[1].trim();
    return senderIP;
};
exports.getSenderIP = getSenderIP;
var getAttachmentsNumber = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var attachments = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"attachments\""); });
    attachments = attachments === null || attachments === void 0 ? void 0 : attachments.split("\"attachments\"")[1].trim();
    var attachmentsNumber = parseInt(attachments ? attachments : "0");
    return attachmentsNumber;
};
exports.getAttachmentsNumber = getAttachmentsNumber;
var getHtmlBody = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var html = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"html\""); });
    html = html === null || html === void 0 ? void 0 : html.split("\"html\"")[1].trim();
    return html;
};
exports.getHtmlBody = getHtmlBody;
var getAttachmentInfo = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var attachmentInfo = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"attachment-info\""); });
    attachmentInfo = attachmentInfo === null || attachmentInfo === void 0 ? void 0 : attachmentInfo.split("\"attachment-info\"")[1].trim();
    return JSON.parse(attachmentInfo);
};
exports.getAttachmentInfo = getAttachmentInfo;
var getAttachment = function (data) {
    var emailBody = data.toString();
    var arrayBody = emailBody.split("--xYzZY");
    var attachments = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"attachments\""); });
    attachments = attachments === null || attachments === void 0 ? void 0 : attachments.split("\"attachments\"")[1].trim();
    var attachmentsNumber = parseInt(attachments ? attachments : "0");
    var attachment = [];
    if (attachments) {
        var _loop_1 = function (i) {
            var attachmentDataArray = arrayBody.find(function (t) { return t.includes("Content-Disposition: form-data; name=\"attachment".concat(i, "\"")); });
            var attachmentDataAll = attachmentDataArray === null || attachmentDataArray === void 0 ? void 0 : attachmentDataArray.split("\"attachment".concat(i, "\""))[1].trim();
            var fileRegex = /filename="(.*?)"/;
            var fileMatch = fileRegex.exec(attachmentDataAll ? attachmentDataAll : "");
            var filename = fileMatch && fileMatch[1];
            var contentTypeMatch = attachmentDataAll === null || attachmentDataAll === void 0 ? void 0 : attachmentDataAll.match(/Content-Type:\s*([^\n\r]+)/i);
            var contentType = contentTypeMatch ? contentTypeMatch[1] : "";
            var content = attachmentDataAll === null || attachmentDataAll === void 0 ? void 0 : attachmentDataAll.split("Content-Type: ".concat(contentType))[1].trim();
            attachment.push({ content: content, contentType: contentType, fileName: filename });
        };
        for (var i = 1; i <= attachmentsNumber; i++) {
            _loop_1(i);
        }
        return attachment;
    }
    else {
        return "No Attachments found";
    }
};
exports.getAttachment = getAttachment;
