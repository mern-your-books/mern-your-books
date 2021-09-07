const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
  books: [Book]!
}

  type Book {
    _id: ID
    title: String
    authors: [String]
    description: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(username: String!): User
    books: [Book]!
    book: Book!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(title: String!, authors: [String]!, description: String!, image: String!): Book 
    removeBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;

