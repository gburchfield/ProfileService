import {AuthenticationError} from "apollo-server-errors";
import {ObjectId} from 'mongodb'

export class SecureResource {
    public user: UserInterface

    constructor(headers:any){
        if(headers.user){
            this.user = JSON.parse(headers.user)
            this.user._id = new ObjectId(this.user._id)
        } else {
            if(!headers.introspection){
                throw new AuthenticationError('Yo What The F#$k, You not allowed here.')
            }
        }
    }
}

interface UserInterface {
    _id: ObjectId,
    email: string,
    username: string,
    issuedAt: string,
    roles: string
}