var _ = require('lodash');

module.exports = {
  friendlyName: 'Cards Index',
  description: 'Action returning an array of all of the Cards saved for a user',
  fn: async function () {
    const userId = this.req.user.id;
    const cards = await Cards.find({ user: userId }).populate('words');
    const languageIds = _.flatten(cards.map(card => card.words.map(word => word.language)));
    const languages = await Languages.find({ id: languageIds });
    const languageHash = languages.reduce((hash, language)=>{
      hash[language.id] = language;
      return hash;
    }, {});
    cards.forEach(card => card.words.forEach(word => word.language = languageHash[word.language]));
    return cards;
  }
};
