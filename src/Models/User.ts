import { AuthenticationError } from 'apollo-server-express'
import {ObjectId} from "mongodb";

export class User {
    public isAuthentic: boolean
    private issuedAt: Date
    private user: UserInterface

    constructor(headers:any){
        if(headers['user-id'] && headers['user-email'] && headers['user-username'] && headers['user-issuedat']) {
            this.user = {
                _id: headers['user-id'],
                email: headers['user-email'],
                username: headers['user-username'],
                issuedAt: headers['user-issuedat']
            }
            this.isAuthentic = true
        } else {
            this.isAuthentic = false
        }
    }

    notExpired(){
        let hourFromIssuedAt = new Date(0)
        let now = new Date()
        hourFromIssuedAt.setUTCSeconds(this.issuedAt.getSeconds() + (60 * 60))
        let timeDifference = now.getSeconds() - hourFromIssuedAt.getSeconds()
        return (timeDifference > 0) ? true : false

    }

    getId(): ObjectId {
        if(this.user){
            return new ObjectId(this.user._id)
        } else {
            return null
        }
    }
}

interface UserInterface {
    _id: string,
    email: string,
    username: string,
    issuedAt: string
}