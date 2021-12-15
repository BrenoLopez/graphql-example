import { randomBytes } from "crypto";
import { buildSchema } from "graphql";

export const schema = buildSchema(`
type Query{
   profile(uniqueKey:String!):Profile
   test(test:String):Test
}
type Mutation{
    register(email: String!, password:String!,confirmation:String!):RegisteredUser
    login(email:String!,password:String!):AccessToken
    confirm(email:String!):Boolean
    profile(uniqueKey:String!):Profile   
}
type Profile{
    email:String
}
type RegisteredUser{
    id:ID
}
type AccessToken{
    accessToken: ID
}
type Test{
    test:String
}
`);

export const root = {
  register: async (
    {
      email,
      password,
      confirmation,
    }: { email: string; password: string; confirmation: string },
    context: any
  ) => {
    return {
      id: randomBytes(20).toString("hex"),
    };
  },
  login: async (
    { email, password }: { email: string; password: string },
    context: any
  ) => {
    return { accessToken: randomBytes(64).toString("hex") };
  },
  profile: async ({ id }: { id: string }, context: any) => {
    return { email: "breno.souza@usemobile.xyz" };
  },
  test: ({ test }: { test: String }) => ({ test }),
};
