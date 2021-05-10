module.exports = {
  openModal: context => {
    return {
      trigger_id: context.trigger_id,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Characters List",
          emoji: true
        },
        close: {
          type: "plain_text",
          text: "Close",
          emoji: true
        },
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Character List",
              emoji: true
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "A = 3      B = 1      C = 2      D = 2      E = 3      F = 1      G = 2      H = 2       I = 3        J = 1      K = 1       L = 2      M = 2     N = 2     O = 3      P = 2        Q = 1     R = 3      S = 2        T = 2      U = 2      V = 1     W = 1     X = 1       Y = 1      Z = 1      1 = 1       2 = 1       3 = 1      4 = 1      5 = 1      6 = 1         7 = 1      8 = 1      9 = 1       0 = 1      @ = 1      # = 1      & = 1"
            }
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Alternative Character List",
              emoji: true
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "      C = U      E = 3      I = 1      M = W      O = 0      S = S      U = C      W = M    Z = Z      1 = I      2 = S       3 = E         6 = 9      9 = 6      0 = O"
            }
          }
        ]
      }
    }
  },
  message: context => {
    const button = {
      type: "actions",
      elements: [
        {
          type: "button",
          action_id: "character_list",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Character List"
          },
          value: "open"
        }
      ]
    };

    let view = {
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Original Text:* " + context.text + " \n" + context.newText
          }
        },

      ]
    };
    if (context.newText.includes(':x: :upside_down_face:')) {
      view.blocks.push(button);
    }
    return view;
  }
}