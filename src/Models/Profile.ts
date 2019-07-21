import { Collection } from "mongodb";
import { AuthenticationError } from "apollo-server-express"

export class Profile {
    private isAuthentic: boolean
    private profiles_collection: Collection
    private inputs_collection: Collection


    constructor(args: any){
        let { profiles, inputs, authentic } = args
        this.profiles_collection = profiles
        this.inputs_collection = inputs
        this.isAuthentic = authentic
    }

    async getBasicProfileInputs() {
        if(this.isAuthentic){
            let inputs = this.inputs_collection.find({category:"basic"}).project({label:1,type:1,input_id:1,_id:0}).toArray()
            return inputs
        } else {
            throw new AuthenticationError('Not Authorized or Token Expired')
        }
    }

}