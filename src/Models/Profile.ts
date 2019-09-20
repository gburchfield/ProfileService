import { Collection, ObjectId} from "mongodb";
import { SecureResource } from "./SecureResource";

export class Profile extends SecureResource {
    private collection: Collection

    constructor(args: any){
        let { profiles, headers} = args
        super(headers)
        this.collection = profiles
    }

    async getProfile(user_id: string){
        let id = (user_id) ? new ObjectId(user_id) : this.user._id
        let User_profile = await this.collection.findOne({user_id: id}, {projection:{_id:0}})
        return User_profile
    }

    async getProfiles(){
        let profiles = await this.collection.find({}, { projection: { _id: 0 } }).toArray();
        return profiles
    }

    async addBasicProfile(args: BasicProfileInputs){
        let profile = await this.collection.insertOne({...args, user_id: this.user._id})
        if(profile.result.ok){
            return {...args}
        } else {
            throw new Error('Error writing to database')
        }
    }

    async deleteProfile(id:string){
        let user_id = new ObjectId(id)
        let result = await this.collection.findOneAndDelete({ user_id: user_id })
        if(result.ok && result.value){
            console.log(`Deleted profile for user_id ${id}, AKA ${result.value.firstName}`)
            return true
        } else {
            return false
        }
    }

}

interface BasicProfileInputs {
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: Date
}