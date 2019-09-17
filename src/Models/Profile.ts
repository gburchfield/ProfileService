import { Collection, ObjectId} from "mongodb";
import { SecureResource } from "./SecureResource";

export class Profile extends SecureResource {
    private profiles_collection: Collection
    private inputs_collection: Collection
    private teams_collection: Collection

    constructor(args: any){
        let { profiles, inputs, headers, teams } = args
        super(headers)
        this.profiles_collection = profiles
        this.inputs_collection = inputs
        this.teams_collection = teams
    }

    async getBasicProfileInputs() {
        let inputs = await this.inputs_collection.find({category:"basic"}).project({ _id:0 }).toArray()
        console.log(inputs)
        return inputs
    }

    async addProfileInput(input: Input): Promise<Input> {
        let newInput = await this.inputs_collection.insertOne(input)
        let { result } = newInput
        if( !!result.ok && result.n === 1 ){
            return input
        } else {
            throw new Error('Failed to write input to database')
        }
    }

    async getProfile(user_id: string){
        let id = (user_id) ? new ObjectId(user_id) : this.user._id
        let User_profile = await this.profiles_collection.findOne({user_id: id}, {projection:{_id:0}})
        return User_profile
    }

    async getProfiles(){
        let profiles = await this.profiles_collection.find({}, { projection: { _id: 0 } }).toArray();
        return profiles
    }

    async addBasicProfile(args: BasicProfileInputs){
        let profile = await this.profiles_collection.insertOne({...args, user_id: this.user._id})
        if(profile.result.ok){
            return {...args}
        } else {
            throw new Error('Error writing to database')
        }
    }

    async getTeams(league: string){
        let teams = await this.teams_collection.find({ league: league }, { projection: { name:1, city: 1, abr: 1, league: 1 } }).toArray()
        return teams
    }

}

interface BasicProfileInputs {
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: Date
}

interface Input {
    label: string,
    type: string,
    input_id: string,
    category: string,
    options?: [string]
}