import { Collection} from "mongodb";
import { SecureResource } from "./SecureResource";

export class Profile extends SecureResource {
    private profiles_collection: Collection
    private inputs_collection: Collection

    constructor(args: any){
        let { profiles, inputs, headers } = args
        super(headers)
        this.profiles_collection = profiles
        this.inputs_collection = inputs
    }

    async getBasicProfileInputs() {
        let inputs = this.inputs_collection.find({category:"basic"}).project({label:1,type:1,input_id:1,_id:0}).toArray()
        return inputs
    }

    async getProfile(){
        console.log(typeof this.user._id)
        let id = this.user._id
        console.log(id)
        let User_profile = await this.profiles_collection.findOne({user_id: id}, {projection:{user_id:0,_id:0}})
        console.log(User_profile)
        return User_profile
    }

    async addBasicProfile(args: BasicProfileInputs){
        let profile = await this.profiles_collection.insertOne({...args, user_id: this.user._id})
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