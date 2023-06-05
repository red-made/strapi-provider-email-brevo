# strapi-provider-email-brevo

## Installation 

```bash
# using yarn
yarn add strapi-provider-email-brevo

# using npm
npm install strapi-provider-email-brevo --save
```

## Configuration

in config/plugins.js

```js
  email: {
    config: {
      provider: 'strapi-provider-email-brevo',
      providerOptions: {
        apiKey: '############',
      },
      settings: {
        defaultSenderEmail: 'email@email.com',
        defaultSenderName: 'Sender Name',
        defaultReplyTo: 'email@email.com',
      },
    },
  }
```




# Changelog


## [1.0.4]
### FIXED
- Fixed the sender format as `<Name email@email.com>`
- Resolved the issue with the STRAPI email template, "Email.template.reset_password," to ensure it works properly