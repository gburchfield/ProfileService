import {gql} from 'apollo-server-express'

const typeDefs = gql `
    scalar DateScalar

    extend type Query {
        Profile: UserProfile
        Profiles: [UserProfile!]!
    }
    
    extend type Mutation {
        BasicProfile(profile: BasicProfileInputs): UserProfile!
        DeleteProfile(id: ID!): Boolean!
    }
    
    type UserProfile @key(fields: "user_id") {
        user_id: String!
        firstName: String!
        lastName: String!
        gender: Gender!
        birthDate: DateScalar!
    }
    
    input BasicProfileInputs {
        firstName: String!
        lastName: String!
        gender: Gender!
        birthDate: DateScalar!
    }
        
    enum Gender {
        MALE
        FEMALE
    }
    
`

export default typeDefs