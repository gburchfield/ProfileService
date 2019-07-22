import { GraphQLScalarType } from "graphql";
import {DateScalar} from "./scalars";

export const resolvers = {
    Query: {
        Profile: (parent: any, args: any, context: any) => {
            return context.user.getId()
        },
        BasicProfileInputs: (parent: any, args: any, context: any) => {
            return context.profile.getBasicProfileInputs()
        }
    },
    DateScalar
}