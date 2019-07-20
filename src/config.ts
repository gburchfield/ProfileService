
const environment: string = process.env.NODE_ENV || 'dev'

const config: ConfigParent = {
    dev: {
        port: 4002,
        secret: "development_secret",
        cluster_uri: "mongodb+srv://development-b96of.mongodb.net/test?retryWrites=true&w=majority",
        db_name: "Profile",
        db_user: "ProfileServiceUser",
        db_password: "Password"
    },
    prod: {
        port: parseInt(process.env.PORT),
        secret: process.env.SECRET,
        cluster_uri: process.env.CLUSTER_URI,
        db_name: process.env.DB_NAME,
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD
    }
}

export default config[environment]

interface ConfigParent {
    [key: string]: Config
}

interface Config {
    port: Number,
    secret: string,
    cluster_uri: string,
    db_name: string,
    db_user: string,
    db_password: string
}