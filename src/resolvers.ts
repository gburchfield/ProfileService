
export const resolvers = {
    Query: {
        Profile: (parent: any, args: any, context: any) => {
            return context.user.getId()
        }
    }
}