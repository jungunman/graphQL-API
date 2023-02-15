import { ApolloServer, gql } from "apollo-server";

let fakeDatabase = [
  {
    id: "1",
    text: "첫 번째 사람",
  },
  {
    id: "2",
    text: "두 번째 사람",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
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
      return fakeDatabase.find((tweet) => tweet.id === id);
    },
    allTweets() {
      return fakeDatabase;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newPerson = {
        id: userId,
        text: text,
      };
      fakeDatabase.push(newPerson);
      return newPerson;
    },
    deleteTweet(_, { id }) {
      const tweet = fakeDatabase.find((fakeDatabase) => fakeDatabase.id === id);
      if (!tweet) return false;
      fakeDatabase = fakeDatabase.filter((element) => element.id !== id);
      return true;
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
