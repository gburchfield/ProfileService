import { Collection, ObjectId } from "mongodb";
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

    private checkPrivillage(){
        if(!this.isAuthentic){
            throw new AuthenticationError('Not Authorized or Token Expired')
        }
    }

    async getBasicProfileInputs() {
        this.checkPrivillage()
        let inputs = this.inputs_collection.find({category:"basic"}).project({label:1,type:1,input_id:1,_id:0}).toArray()
        return inputs
    }

    async getUserProfile(user_id: string){
        this.checkPrivillage()
        let User_id = new ObjectId(user_id)
        let User_profile = await this.profiles_collection.findOne({user_id: User_id})
        return User_profile
    }

}