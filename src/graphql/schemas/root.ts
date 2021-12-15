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
    confirm(email:String!):Confirm
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
type Confirm{
  confirm:Boolean
}
`);

export const root = {
  register: async (
    data: { email: string; password: string; confirmation: string },
    context: any
  ) => {
    console.log(data);
    return {
      id: randomBytes(20).toString("hex"),
    };
  },
  login: async (data: { email: string; password: string }, context: any) => {
    console.log(data);
    return { accessToken: randomBytes(64).toString("hex") };
  },
  profile: async (data: { id: string }, context: any) => {
    console.log(data);
    return { email: "breno.souza@usemobile.xyz" };
  },
  // confirm: ({ email }: { email: string }) => ({
  //   confirm: email === "breno.souza@usemobile.xyz",
  // }),
  test: ({ test }: { test: String }) => ({ test }),
};
