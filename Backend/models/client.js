module.exports=(db,type)=>{
    return db.define('clients',{
        ID:{ 
             type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
      
        Rs:{
            type:type.STRING
        },
        Adresse:{
            type:type.STRING
        },
        Tel:{
            type:type.INTEGER
        },
        Fax:{
            type:type.INTEGER
        },
        Email:{ 
            type:type.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        Site:{
            type:type.STRING
        },
        NomPC:{
            type:type.STRING
        },
        PrenomPC:{
            type:type.STRING
        },
        TelPersonnelContact:{
            type:type.INTEGER
        },
        FaxPersonnelContact:{
            type:type.INTEGER
        },
        AdresseEmailPersonnel:{
            type:type.STRING,
            isEmail: true
        },
        MatFiscal:{
            type:type.STRING
        },
        Regfiscale:{
            type:type.INTEGER
        }
    })
}