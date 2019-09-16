import { GraphQLScalarType } from "graphql";
import {DateScalar} from "./scalars";

export const resolvers = {
    Query: {
        Profile: (parent: any, args: any, context: any) => {
            return context.profile.getProfile()
        },
        BasicProfileInputs: (parent: any, args: any, context: any) => {
            return context.profile.getBasicProfileInputs()
        }
    },
    Mutation: {
        BasicProfile: (parent: any, args: any, context: any) => {
            console.log(args)
            console.log(context)
            return context.profile.addBasicProfile(args.profile)
        }
    },
    DateScalar,
    UserProfile: {
        __resolveReference(reference:any, context: any) {
            return context.profile.getProfile(reference.user_id)
        }
    }
}