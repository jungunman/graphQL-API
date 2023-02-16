import { ApolloServer, gql } from "apollo-server";

let Tweets = [
  {
    id: "1",
    text: "첫 번째 사람",
    author: {
      id: "2",
      firstName: "lobert",
      lastName: "grack",
    },
  },
  {
    id: "2",
    text: "두 번째 사람",
    author: {
      id: "1",
      firstName: "Woong",
      lastName: "Ryu",
    },
  },
];

let Users = [
  {
    id: "1",
    firstName: "Woong",
    lastName: "Ryu",
  },
  {
    id: "2",
    firstName: "lobert",
    lastName: "grack",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String
    author: User
  }
  type Query {
    #유저가 데이터를 받고 싶다면 이곳에 저장해야 한다.
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    allUsers: [User!]!
  }
  type Mutation {
    #유저가 정보를 보내서 database를 업데이트 하면 이곳에 저장해야한다.
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    tweet(root, { id }) {
      return Tweets.find((tweet) => tweet.id === id);
    },
    allTweets() {
      return Tweets;
    },
    allUsers() {
      return Users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      try {
        if (!Users.find((user) => user.id === userId)) {
          throw new Error(`회원이 아닙니다`);
        }
        const newTweet = {
          id: Tweets.length + 1,
          text,
          userId,
        };
        console.log(newTweet);
        Tweets.push(newTweet);
        return newTweet;
      } catch (e) {
        console.log(e);
      }
    },
    deleteTweet(_, { id }) {
      const tweet = Tweets.find((Tweets) => Tweets.id === id);
      if (!tweet) return false;
      Tweets = Tweets.filter((element) => element.id !== id);
      return true;
    },
  },
  User: {
    fullName(root) {
      return `${root.firstName} ${root.lastName}`;
    },
  },
  Tweet: {
    author(root) {
      return Users.find((tweet) => tweet.id === root.author);
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
