
const environment: string = process.env.NODE_ENV || 'dev'

const config: ConfigParent = {
    dev: {
        port: parseInt(process.env.PORT),
        secret: process.env.SECRET_KEY,
        cluster_uri: process.env.MONGODB_URL,
        db_name: process.env.DB_NAME,
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD
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