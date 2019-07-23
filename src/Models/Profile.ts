import { Collection, ObjectId } from "mongodb";
import { AuthenticationError } from "apollo-server-express"

export class Profile {
    private isAuthentic: boolean
    private profiles_collection: Collection
    private inputs_collection: Collection
    private user_id: ObjectId

    constructor(args: any){
        let { profiles, inputs, authentic, user_id } = args
        this.profiles_collection = profiles
        this.inputs_collection = inputs
        this.isAuthentic = authentic
        this.user_id = user_id
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

    async getProfile(){
        this.checkPrivillage()
        let User_profile = await this.profiles_collection.findOne({user_id: this.user_id}, {projection:{user_id:0,_id:0}})
        console.log(User_profile)
        return User_profile
    }

    async addBasicProfile(args: BasicProfileInputs){
        this.checkPrivillage()
        let profile = await this.profiles_collection.insertOne({...args, user_id: this.user_id})
        if(profile.result.ok){
            return {...args}
        } else {
            throw new Error('Error writing to database')
        }
    }

}

interface BasicProfileInputs {
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: Date
}