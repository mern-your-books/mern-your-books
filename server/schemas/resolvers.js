// BAD
// models> index, models> profile
// schemas> resolvers, schemas> typeDefs will all have to be changed
const { Profile, Book } = require("../models");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    books: async () => {
      return Book.find();
    },
  },

  Mutation: {
    addProfile: async (parent, { name }) => {
      return Profile.create({ name });
    },
    addSkill: async (parent, { profileId, skill }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { skills: skill },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    removeSkill: async (parent, { profileId, skill }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { skills: skill } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;