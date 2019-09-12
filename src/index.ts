import express from 'express'
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { createDb } from "./db";
import { Profile } from "./Models/Profile"
import config from './config'
import typeDefs from './schema'
import {resolvers} from "./resolvers";

const profiles_collection = createDb('profiles')
const inputs_collection = createDb('inputs')

Promise.all([profiles_collection, inputs_collection]).then((collections) => {

    let profiles = collections[0]
    let inputs = collections[1]

    const server = new ApolloServer({
        schema: buildFederatedSchema([{typeDefs, resolvers}]),
        context: ({req}) => {
            let profile = new Profile({profiles, inputs, headers: req.headers})
            return {
                profile
            }
        }
    })

    const app = express()

    server.applyMiddleware({app})

    app.listen({ port: config.port }, () =>
        console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
    );
})

