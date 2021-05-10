require("dotenv").config();
const { App, LogLevel } = require('@slack/bolt');
const validator = require('./validator');
const payloads = require('./payloads');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_AUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // logLevel: LogLevel.DEBUG
});

// Quote checker command
app.command('/lightbox-quote-checker', async ({ command, ack, client, respond, payload }) => {
  // Acknowledge command request
  await ack();

  let newText = validator.checkSentence(command.text)

  // await client.chat.postEphemeral({
  //   channel: payload.user_id,
  //   user: payload.user_id,
  //   text: `Sorry :(`,w
  // });
  // return;

  const context = {
    text: command.text,
    newText,
  }
  let response = payloads.message(context);
  await respond(response);
});

// Character Modal
app.action('character_list', async ({ ack, client, body }) => {
  await ack();
  try {

    const context = {
      trigger_id: body.trigger_id,
    }
    let response = payloads.openModal(context);
    // Call views.open with the built-in client
    const result = await client.views.open(response);
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();