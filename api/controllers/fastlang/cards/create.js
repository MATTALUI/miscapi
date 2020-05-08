module.exports = {
  friendlyName: 'Vehicle Create',
  description: 'Action for creating a Vehicle. The vehicle will be associated with the user that creates it.',
  inputs: {
    definition: {
      description: 'A string with the english definition of the words that appear on a card',
      type: 'string',
      required: true
    },
    currentSet: {
      description: 'Boolean determining whether or not a card should be in your current set of "focus words"',
      type: 'boolean'
    },
    words: {
      description: 'a list of words that can also be accepted...',
      type: 'ref',
      required: true
    },
  },
  exits: {},
  fn: async function ({ definition, currentSet, words }) {
    const user = this.req.user.id;
    const card = await Cards.create({
      definition,
      currentSet,
      user,
    }).fetch();
    const cardWords = await CardWords.createEach(words.map(word => ({
      ...word,
      card: card.id
    }))).fetch()
    card.words = cardWords;

    return card;
  }
};
