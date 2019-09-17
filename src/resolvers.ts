import { GraphQLScalarType } from "graphql";
import {DateScalar} from "./scalars";

export const resolvers = {
    Query: {
        Profile: (parent: any, args: any, context: any) => {
            return context.profile.getProfile()
        },
        Profiles: (parent: any, args: any, context: any) => {
            return context.profile.getProfiles()
        },
        BasicProfileInputs: (parent: any, args: any, context: any) => {
            return context.profile.getBasicProfileInputs()
        },
        SportsTeams: (parent: any, args: any, context: any) => {
            let { league } = args
            return context.profile.getTeams(league)
        },
    },
    Mutation: {
        BasicProfile: (parent: any, args: any, context: any) => {
            return context.profile.addBasicProfile(args.profile)
        },
        AddInput: (parent: any, args: any, context: any) => {
            let { new_input } = args
            return context.profile.addProfileInput(args)
        }
    },
    DateScalar,
    UserProfile: {
        __resolveReference(reference:any, context: any) {
            return context.profile.getProfile(reference.user_id)
        }
    }
}