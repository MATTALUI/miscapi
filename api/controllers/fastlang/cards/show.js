module.exports = {
  friendlyName: 'Card Show',
  description: 'Action returning the information for a specific card',
  inputs: {
    cardId : {
      description: 'The ID of the card that is going to be looked up',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({ cardId }) {
    const card = await Cards.findOne({ id: cardId }).populate('words');
    if (!!card) {
      const languageIds = card.words.map(word => word.language);
      const languages = await Languages.find({ id: languageIds });
      const languageHash = languages.reduce((hash, language)=>{
        hash[language.id] = language;
        return hash;
      }, {});
      card.words.forEach(word => word.language = languageHash[word.language]);
    }
    return card;
  }
};
