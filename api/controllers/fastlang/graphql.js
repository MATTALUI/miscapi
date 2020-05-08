const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const _ = require('lodash');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    id: Int!
    email: String!
    firstName: String
    lastName: String
    nickname: String
    description: String
  }

  type Language {
    id: Int!
    name: String!
    shortCode: String!
    color: String
    description: String
  }

  input LanguageInput {
    name: String!
    shortCode: String!
    color: String
    description: String
  }

  type Card {
    id: Int!
    definition: String!
    currentSet: Boolean
    user: Int
    words: [Word]
  }

  input CardInput {
    definition: String!
    currentSet: Boolean
    words: [WordInput!]!
  }

  type Word {
    id: Int!
    value: String!
    card: Card!
    language: Language!
  }

  input WordInput {
    value: String!
    language: Int!
  }

  type Mutation {
    addLanguage(language: LanguageInput): Language
    removeLanguage(id: Int!): Language

    addCard(card: CardInput): Card
    removeCard(id: Int!): Card
  }

  type Query {
    user: User!
    languages: [Language]!
    language(id: Int!): Language!
    cards: [Card]!
    card(id: Int!): Card!
    words: [Word]!
    word(id: Int!): Word!
  }
`);

const associateLanguages = async ({ cards }) => {
  console.log(cards);
  // This language association is a mega hack. I don't know what I'm doing...
  const languageIds = _.flatten(cards.map(card => card.words.map(word => word.language)));
  const languages = await Languages.find({ id: languageIds });
  const languageHash = languages.reduce((hash, language)=>{
    hash[language.id] = language;
    return hash;
  }, {});
  cards.forEach(card => card.words.forEach(word => word.language = languageHash[word.language]));
};

// The root provides a resolver function for each API endpoint
var root = {
  // Languages
  languages: async () => await Languages.find(),
  language: async ({ id }) => await Languages.findOne({ id }),
  addLanguage: async ({ language }) => await Languages.create(language).fetch(),
  removeLanguage: async ({ id }) => await Languages.destroyOne({ id }),
  // Cards
  cards: async (args, { user }) =>{
    const cards = await Cards.find({ user: user.id }).populate('words');
    await associateLanguages({ cards });

    return cards;
  },
  card: async ({ id }) => await Cards.findOne({ id }),
  addCard: async ({ card }, { user }) =>{
    const wordArgs = card.words;
    delete card.words;

    const newCard = await Cards.create({ ...card, user: user.id }).fetch();
    const words = await CardWords.createEach(wordArgs.map( word => ({ ...word, card: newCard.id }))).fetch();
    newCard.words = words;
    await associateLanguages({ cards: [newCard] });

    return newCard;
  },
  removeCard: async ({ id }, { user }) => await Cards.destroyOne({ id,  user: user.id }),
  // Words
  words: async () =>  await CardWords.find(),
  word: async ({ id }, { user }) => await CardWords.findOne({ id, user: user.id }),
  // Helpers
  user: (args, req) => req.user,
};

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
