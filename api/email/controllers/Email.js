// File /api/email/controllers/Email.js
"use strict";

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  send: async (ctx) => {
    console.log({ custom: ctx.request.body });
    const { body } = ctx.request;
    const myEmail = body.to || process.env.MY_EMAIL;
    strapi.log.debug(`Trying to send an email to ${myEmail}`);

    try {
      const emailOptions = {
        from: body.from,
        to: myEmail,
        replyTo: body.from,
        subject: "Wiadomość z Portfolio",
        html: `<h1>Wiadomość wysłana z formularza kontaktowego:</h1>
        <br/>
        <p>Od: ${body.from}</p>
        <br/>
        <p>${body.text}</p>`,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to ${myEmail}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      console.log(err);
      strapi.log.error(`Error sending email to ${myEmail}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
};
