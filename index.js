require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
// The port used for Express server
const PORT = 3000;

// Starts server
app.listen(process.env.PORT || PORT, function() {
    console.log("Sign maker active on port " + PORT);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/", (req, res) => {
    let text = checkSentence(req.body.text);
    var data = {
        form: {
            token: process.env.SLACK_AUTH_TOKEN,
            channel: req.body.channel_id,
            text: `${req.body.text}`
        }
    };

    request.post("https://slack.com/api/chat.postMessage", data, function(){
      res.json({
        response_type: "in_channel",
        blocks: [
          {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": "*Original Text:* " + req.body.text + " \n" + text
              }
          }
        ]
      });
    });
    
});

function checkSentence(message) {
  if(message === "") return "Please add some text";
    let alteredMessage = "";
    let error = ":x: :upside_down_face: ";
    const recommendAlternativeCharacters = true;
    const showCharacters = false;
    const showReplacementCharacters = false;
    const characters = {
        A: 3,
        B: 1,
        C: 2,
        D: 2,
        E: 3,
        F: 1,
        G: 2,
        H: 2,
        I: 3,
        J: 1,
        K: 1,
        L: 2,
        M: 2,
        N: 2,
        O: 3,
        P: 2,
        Q: 1,
        R: 3,
        S: 2,
        T: 2,
        U: 2,
        V: 1,
        W: 1,
        X: 1,
        Y: 1,
        Z: 1,
        "1": 1,
        "2": 1,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 1,
        "7": 1,
        "8": 1,
        "9": 1,
        "0": 1,
        "@": 1,
        "#": 1,
        "&": 1
    };

    const replacementCharacters = {
        A: [],
        B: [],
        C: ["U"],
        D: [],
        E: ["3"],
        F: [],
        G: [],
        H: [],
        I: ["1"],
        J: [],
        K: [],
        L: [],
        M: ["W"],
        N: [],
        O: ["0"],
        P: [],
        Q: [],
        R: 3,
        S: ["S"],
        T: [],
        U: ["C"],
        V: [],
        W: ["M"],
        X: [],
        Y: [],
        Z: ["Z"],
        "1": ["I"],
        "2": ["S"],
        "3": ["E"],
        "4": [],
        "5": [],
        "6": ["9"],
        "7": [],
        "8": [],
        "9": ["6"],
        "0": ["O"],
        "@": [],
        "#": [],
        "&": []
    };

    if (showReplacementCharacters) {
        console.log("Replacement Characters:");
        return console.log(replacementCharacters);
    }

    if (showCharacters) {
        console.log("Characters:");
        return console.log(characters);
    }

    // Check to see if its longer than all available options
    const checkLength = checkLengthFn();
    function checkLengthFn() {
        const charactersLength = Object.values(characters).reduce(
            (t, value) => t + value
        );
        const messageLength = message.replace(" ", "").length;
        return charactersLength > messageLength;
    }
    if (!checkLength) {
        return (error = "Quote is too long");
    }

    // Check to see if there's any random characters that aren't supported
    const checkForNotSupportedCharacters = checkForNotSupportedCharactersFn();
    function checkForNotSupportedCharactersFn() {
        const validRegex = /^[a-zA-Z0-9&#@\s]+$/gi;
        return validRegex.test(message);
    }

    if (!checkForNotSupportedCharacters) {
        return (error += "Unsupported characters in quote.");
    }

    // Check to see if no word is longer than 10 letters
    const checkForWordLength = checkForWordLengthFn();
    function checkForWordLengthFn() {
        const validRegex = /\S{10,}/gi;
        return message.match(validRegex);
    }
    if (checkForWordLength) {
        return (error += `${
            checkForWordLength[[Object.keys(checkForWordLength)[0]]]
        } is to long for the box.`);
    }

    const checkForEnoughCharacters = checkForEnoughCharactersFn();
    function checkForEnoughCharactersFn() {
        let messageLetters = message.toUpperCase().split("");
        charactersUsed = characters;
        let notEnoughCharacters = [];
        for (let letter of messageLetters) {
            // letter
            if (charactersUsed[letter] === 0) {
                if (recommendAlternativeCharacters) {
                    if (replacementCharacters[letter].length !== 0 && charactersUsed[replacementCharacters[letter][0]] !== 0) {
                        alteredMessage += replacementCharacters[letter][0];
                        charactersUsed[replacementCharacters[letter][0]]--;
                    } else {
                        notEnoughCharacters.push(letter);
                    }
                } else {
                    notEnoughCharacters.push(letter);
                }
            } else if (
                (charactersUsed[letter] && charactersUsed[letter] !== 0) ||
                letter === " "
            ) {
                alteredMessage += letter;
                charactersUsed[letter]--;
            }
        }
        return notEnoughCharacters;
    }

    if (checkForEnoughCharacters.length !== 0) {
        return (error += `You're missing a few characters: Here's a list: *${checkForEnoughCharacters}*. Please try to be more creative.`);
    }

    let lineBreaksInMessage = alteredMessage.replace(/(.{0,10}\b)/gi, "$1\n");

    if(lineBreaksInMessage.match(/([\n])+/gi).length > 3) {
      return (error += `You have to many line breaks in your message. The box only supports 3 lines`);
    }

    console.log(lineBreaksInMessage);
    return ":white_check_mark: :relaxed: \n" + lineBreaksInMessage + "";
}