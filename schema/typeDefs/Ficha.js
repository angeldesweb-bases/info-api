export default `

    type File {
        id:ID!
        url:String
    }

    type Ficha {
        _id:ID!
        titulo:String!
        tipoInfo:String!
        postedAt:String!
        createdAt:String!
        resumen:String!
        fuente:String!
        image:String
        author:String!
        postedBy:User
        clasificacion:Category
    }

    type FichaResponse {
        success:Boolean!
        done:Done
        error:Error
        ficha:Ficha
        fichas:[Ficha]
    }

    extend type Query {
        AllFichas:FichaResponse!
        uploads:[File]
        GetFicha(_id:ID!):FichaResponse!
    }

    extend type Mutation {
        CreateFicha(,titulo:String!,tipoInfo:String!,postedAt:String!,createdAt:String,resumen:String!,fuente:String!,image:String,author:String!,postedBy:String!,clasificacion:String!):FichaResponse!
        singleUpload(file:Upload!):File!
        UpdateFicha(_id:ID,titulo:String,tipoInfo:String,postedAt:String,createdAt:String,resumen:String,fuente:String,image:String,author:String,postedBy:String,clasificacion:String):FichaResponse!
        DeleteFicha(_id:ID!):FichaResponse!
    }

`