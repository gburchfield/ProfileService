import ProfileServiceScalars from "./scalars";

export const resolvers = {
    Query: {
        Profile: (parent: any, args: any, context: any) => {
            return context.profile.getProfile()
        },
        Profiles: (parent: any, args: any, context: any) => {
            return context.profile.getProfiles()
        }
    },
    Mutation: {
        BasicProfile: (parent: any, args: any, context: any) => {
            return context.profile.addBasicProfile(args.profile)
        },
        DeleteProfile: (parent: any, args: any, context: any) => {
            return context.profile.deleteProfile(args.id)
        }
    },
    UserProfile: {
        __resolveReference(reference:any, context: any) {
            return context.profile.getProfile(reference.user_id)
        }
    },
    ...ProfileServiceScalars
}