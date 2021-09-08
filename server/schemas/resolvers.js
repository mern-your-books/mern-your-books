const { User, Book, Review } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
// const { param } = require('../routes');

const resolvers = {

    Query: {

        //get a user by username
        me: async (parent, args, context) => {

            if(context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books')
            
                return userData;
            }

            throw new AuthenticationError('Not logged in')

        },

    },

    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return {token, user};
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
    
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
            //   const savedBook = await Book.create({ ...args, username: context.user.username });
          
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input } },
                { new: true }
              );
          
            return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },



        removeBook: async (parent, args, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addReview: async (parent, { reviewText }, context) => {
            if (context.user) {
              const review = await Review.create({
                reviewText,
                reviewAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { reviews: review._id } }
              );
      
              return review;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          addComment: async (parent, { reviewId, commentText }, context) => {
            if (context.user) {
              return Review.findOneAndUpdate(
                { _id: reviewId },
                {
                  $addToSet: {
                    comments: { commentText, commentAuthor: context.user.username },
                  },
                },
                {
                  new: true,
                  runValidators: true,
                }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeReview: async (parent, { reviewId }, context) => {
            if (context.user) {
              const review = await Review.findOneAndDelete({
                _id: reviewId,
                reviewAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { reviews: review._id } }
              );
      
              return review;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeComment: async (parent, { reviewId, commentId }, context) => {
            if (context.user) {
              return Review.findOneAndUpdate(
                { _id: reviewId },
                {
                  $pull: {
                    comments: {
                      _id: commentId,
                      commentAuthor: context.user.username,
                    },
                  },
                },
                { new: true }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    }
};

module.exports = resolvers;