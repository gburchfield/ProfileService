import {gql} from 'apollo-server-express'

const typeDefs = gql `
    extend type Query {
        Profile: String
    }
`

export default typeDefs