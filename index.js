const axios = require("axios");

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    let apiKey = providerOptions.apiKey;
    let apiUrl = "https://api.brevo.com/v3";

    return {
      send: async (options) => {
        try {
          const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } = options;

          let senderEmail = from || settings.defaultSenderEmail;
          senderEmail = senderEmail.match(/<(.*?)>/g) ? senderEmail.match(/<(.*?)>/g)?.map((a) => a.replace(/<|>/g, ""))[0] : senderEmail;

          let senderName = from || settings.defaultSenderName;
          senderName = senderName.match(/(.*?)</g) ? senderName.match(/(.*?)</g)?.map((a) => a.replace(/<|>/g, ""))[0] : senderName;

          const msg = {
            sender: {
              name: from || settings.defaultSenderName,
              email: senderEmail,
            },
            to: [{ email: to }],
            cc,
            bcc,
            replyTo: { email: replyTo || settings.defaultReplyTo },
            subject,
            textContent: text,
            htmlContent: html,
            ...rest,
          };

          let send = await axios.post(apiUrl + "/smtp/email", msg, {
            headers: { "api-key": apiKey },
          });

          // console.log(send);
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
    };
  },
};
