const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} = require('graphql');
const _ = require('lodash');

const Author = require('./../models/author');
const Book = require('./../models/book');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return Author.findById(parent.author);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    born: { type: GraphQLInt },
    died: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return Book.find({ author: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.find({});
      }
    },
    book: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, { id }) {
        return Book.findById(id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find({});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, { id }) {
        return Author.findById(id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        born: { type: GraphQLInt },
        died: { type: GraphQLInt }
      },
      resolve(parent, { name, born, died }) {
        return new Author({ name, born, died, books: [] }).save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { type: GraphQLID }
      },
      resolve(parent, { name, genre, author }) {
        return new Book({ name, genre, author }).save();
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
