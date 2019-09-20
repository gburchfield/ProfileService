import {GraphQLScalarType} from "graphql";

const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Normalize String to Javascript date and then back when returning to user',
    parseValue(value){
        let dateArray = value.match(/\d+/g)
        return new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    },
    serialize(value){
        let Month = ("0" + (value.getMonth() + 1)).slice(-2)
        let Day = ("0" + value.getDate()).slice(-2)
        return `${value.getFullYear()}-${Month}-${Day}`
    },
    parseLiteral(ast) {
        console.log(ast)
        return ast
    }
})

export default {
    DateScalar
}