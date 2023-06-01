const axios = require("axios");

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    let apiKey = providerOptions.apiKey;
    let apiUrl = "https://api.brevo.com/v3";

    return {
      send: async (options) => {
        try {
          const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } = options;

          const msg = {
            sender: {
              name: from || settings.defaultSenderName,
              email: from || settings.defaultSenderEmail,
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

          console.log(send);
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
    };
  },
};
