module.exports=(db,type)=>{
    return db.define('fournisseur',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
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
            
            
            isEmail: true, 
        },
        Site:{
            type:type.STRING
        },
        Matfiscale :{
            type:type.STRING
        },
        Image:{
            type:type.STRING
        }, 
       
        Rs:{
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
       
        Regfiscale:{
            type:type.STRING
        },
      

        HasActivity :{type:type.BOOLEAN}


    })
}