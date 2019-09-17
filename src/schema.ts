import {gql} from 'apollo-server-express'

const typeDefs = gql `
    extend type Query {
        Profile: UserProfile
        Profiles: [UserProfile!]!
        BasicProfileInputs: [Input]
        SportsTeams(league: SportsLeague): [Team!]!
    }
    
    extend type Mutation {
        BasicProfile(profile: BasicProfileInputs): UserProfile!
        AddInput( new_input: InputProps): Input
    }
    
    type Input {
        label: String!
        type: String!
        input_id: String!
        category: String
        options: [String!]
    }
    
    type UserProfile @key(fields: "user_id") {
        user_id: String!
        firstName: String!
        lastName: String!
        gender: Gender!
        birthDate: DateScalar!
    }
    
    type Team {
        name: String!
        city: String!
        abr: String!
        league: String!
    }
    
    input BasicProfileInputs {
        firstName: String!
        lastName: String!
        gender: Gender!
        birthDate: DateScalar!
    }
    
    input InputProps {
        label: String!
        type: String!
        input_id: String!
        category: String!
        options: [String!]
    }
    
    scalar DateScalar
    
    enum Gender {
        MALE
        FEMALE
    }
    
    enum SportsLeague {
        NFL
        NBA
        CFB
        CBB
    }
    
`

export default typeDefs