import {gql} from 'apollo-server-express'

const typeDefs = gql `
    extend type Query {
        Profile: UserProfile
        BasicProfileInputs: [Input]
    }
    
    extend type Mutation {
        BasicProfile(profile: BasicProfileInputs): UserProfile!
    }
    
    type Input {
        label: String!
        type: String!
        input_id: String!
    }
    
    type UserProfile {
        firstName: String!
        lastName: String!
        Gender: Gender!
        birthDate: DateScalar!
    }
    
    input BasicProfileInputs {
        firstName: String!
        lastName: String!
        Gender: Gender!
        birthDate: DateScalar!
    }
    
    scalar DateScalar
    
    enum Gender {
        MALE
        FEMALE
    }
    
`

export default typeDefs