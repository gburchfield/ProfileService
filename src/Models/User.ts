import jwt from 'jsonwebtoken'
import config from "../config"
import { AuthenticationError } from "apollo-server-express"

export class User {
    public isAuthentic: boolean
    private issuedAt: Date
    private user: UserInterface

    constructor(headers:any){
        this.user = {
            _id: headers['user-id'],
            email: headers['user-email'],
            username: headers['user-username']
        }
    }

    notExpired(){
        let hourFromIssuedAt = new Date(0)
        let now = new Date()
        hourFromIssuedAt.setUTCSeconds(this.issuedAt.getSeconds() + (60 * 60))
        let timeDifference = now.getSeconds() - hourFromIssuedAt.getSeconds()
        return (timeDifference > 0) ? true : false

    }

    getId(){
        return this.user._id
    }
}

interface UserInterface {
    _id: string,
    email: string,
    username: string
}