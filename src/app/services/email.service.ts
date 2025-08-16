import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

export type EmailType = 'common' | 'career' | 'service';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId = 'service_bwbu6up';     
  private templateId = 'template_56unyxl';   
  private publicKey = 'O6xqnlaNhhLGGTp7G';   

  constructor() {}

  // 🔹 Core send wrapper
  private send(payload: any) {
    return emailjs.send(this.serviceId, this.templateId, payload, this.publicKey);
  }

  /**
   * 🔹 Unified email sender
   * @param type - 'common' | 'career' | 'service'
   * @param name - sender name
   * @param email - sender email (user input)
   * @param titleValue - topic, role, course, or package depending on type
   * @param description - message body
   * @param extra - extra details like career type or service name
   */
  sendMail(
    type: EmailType,
    name: string,
    email: string,
    titleValue: string,
    description: string,
    extra?: { careerType?: 'join-us' | 'colab' | 'seminar' | 'learning'; serviceName?: string }
  ) {
    let subject = '';

    if (type === 'common') {
      subject = titleValue; // free text topic
    }

    if (type === 'career') {
      switch (extra?.careerType) {
        case 'join-us':
          subject = `Job Role: ${titleValue}`;
          break;
        case 'colab':
          subject = `Collaboration: ${titleValue}`;
          break;
        case 'seminar':
          subject = `Seminar: ${titleValue}`;
          break;
        case 'learning':
          subject = `ARP Learning - Course: ${titleValue}`;
          break;
      }
    }

    if (type === 'service') {
      subject = `${extra?.serviceName ?? 'Service'} - ${titleValue}`;
    }

    // ✅ Always send with founders BCC
    return this.send({
      from_name: name,
      from_email: 'arptechlabs@gmail.com',
      reply_to: 'arptechlabs@gmail.com',
      to_email: email,
      bcc_email: 'adnans0307@gmail.com, ritkum93@gmail.com, pankajvishwakarma2130@gmail.com',
      subject,
      message: description,
    });
  }
}
