const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    skills: [String]!
  }

  type Book {
    _id: ID
    title: String
    authors: [String]
    description: String
    image: String
    date: String
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    books: [Book]!
  }

  type Mutation {
    addProfile(name: String!): Profile
    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile(profileId: ID!): Profile
    removeSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
