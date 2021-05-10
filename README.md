# Lightbox Quote Checker

Tells you whether the message you want to type will work with the letters and length of the sign. Will also allow for substitutions.

![Lightbox](/images/lightbox.jpg)

Integrates into Slack as a bot

Time: 8 hours
"Successful Futures" at Xello Inc

[React Demo](https://www.kevinnewman.ca/lightbox-quote-checker/)

## Features:

-   Text alternatives (3 = E)
-   Character limits = (only 3 E’s)
-   Sentence length check (40 characters)
-   Invalid character check (A-Z, 0-9, #&@)
-   Word length check(Max 10 letters per word)
-   Too many line breaks in the sentence(Max 3 line breaks)
-   Slack integration
-   Character modal for showing available characters
-   Made with Bolt.js

## Feature Requests

Create an issue and add your suggestions :)

## Examples

Works

`/lightbox-sentence-check Long urls are the feature`

```
Original Text: Long urls are the feature
LONG URLS
ARE THE
FEATUR3
```

Doesn't work

`/lightbox-sentence-check how's this work then?`

```
Original Text: how's this work then?
Unsupported characters in quote.
```
