module.exports=(db,type)=>{
    return db.define('voitures',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        
        Matricule :{
            
            type:type.STRING,
            unique: true

        },
        Marque :{
            type:type.STRING
        },
        Type :{
            type:type.STRING

        },
        Categorie :{
            type:type.STRING
        },
        DPMC:{
            type:type.DATE
        },
        Compteur:{
            type:type.STRING
        },
     
        Propritaire :{
            type:type.STRING
        },
        CopierContrat :{
            type:type.STRING
        },
        CopierCarteGrise :{
            type:type.STRING
        },
       

  
    })}