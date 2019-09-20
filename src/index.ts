import express from 'express'
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { createDb } from "./db";
import { Profile } from "./Models/Profile"
import config from './config'
import typeDefs from './schema'
import {resolvers} from "./resolvers";
import EventBus from "./EventBus";

const collection = createDb('profiles')

collection.then((profiles) => {

    const server = new ApolloServer({
        schema: buildFederatedSchema([{typeDefs, resolvers}]),
        context: ({req}) => {
            let profile = new Profile({profiles, headers: req.headers})
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

    EventBus.on('message', (channel, msg_str) => {
        let message = JSON.parse(msg_str)
        console.log(`Received ${message.action} message on ${channel} channel`)
        let headers = {user: JSON.stringify({roles:['Admin']}) }
        let profile = new Profile({profiles, headers })
        profile.deleteProfile(message.id)
    })

    EventBus.subscribe("USER_DATA")
})


