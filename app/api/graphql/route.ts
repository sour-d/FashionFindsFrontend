import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    validateUser(username: String!, password: String!): String
    me: User
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String): User
  }
`;

const users = [
  { id: "default", username: "defaultuser", email: "default@example.com" }
];

const resolvers = {
  Query: {
    users: () => users,
    user: (parent: any, { id }: { id: string }) => {
      return users.find(user => user.id === id);
    },
    validateUser: (parent: any, { username, password }: { username: string, password: string }) => {
      // Implement validation logic here
      // For now, just check if username and password are not empty
      if (username !== '' && password !== '') {
        return 'placeholder_jwt_token';
      }
      return null;
    },
    me: (parent: any, args: any, contextValue: any) => {
      // Implement logic to fetch user based on JWT token
      const token = contextValue.req.headers.get('authorization')?.split(' ')[1];

      if (token === 'placeholder_jwt_token') {
        return {
          id: 'default',
          username: 'defaultuser',
          email: 'default@example.com',
        };
      }

      return null;
    },
  },
  Mutation: {
    createUser: (parent: any, { username, password, email }: { username: string, password: string, email: string }) => {
      const newUser = {
        id: String(users.length + 1),
        username,
        email,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const GET = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res }),
});
export const POST = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res }),
});
