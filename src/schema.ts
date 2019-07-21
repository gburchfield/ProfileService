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
    
`

export default typeDefs