import { AuthenticationError } from 'apollo-server-express'

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

    getId(){
        if(this.isAuthentic){
            return this.user._id
        } else {
            throw new AuthenticationError('Not Authorized or Token Expired')
        }
    }
}

interface UserInterface {
    _id: string,
    email: string,
    username: string,
    issuedAt: string
}