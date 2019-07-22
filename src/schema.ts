import {gql} from 'apollo-server-express'

const typeDefs = gql `
    extend type Query {
        Profile: String
        BasicProfileInputs: [Input]
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
        birthDate: DateScalar
    }
    
    scalar DateScalar
    
    enum Gender {
        MALE
        FEMALE
    }
    
`

export default typeDefs