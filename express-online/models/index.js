var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG 

//sequelize에서 mysql을 접속하는 구문
const sequelize = new Sequelize( process.env.DATABASE,
process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', //한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
//
let db = [];
let test = [];
//console.log(db);

fs.readdirSync(__dirname) //현재 디렉토리(폴더)를 읽어들임.['index.js','Product.js']이런식으로 파일을 배열로 읽어들임.
    .filter(file => { 
        return file.includes('.js') && !file.includes('index.js') 
                                                                    //indexOF : .js 가 존재하는것이 몇번째인지 알려줌 일치하는값이 없으면 -1을 반환
        //includes : file객체 안에 .js가있는지 조회.
        //file이 index.js 가 아닌경우 (현재 파일이 아닌경우)
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname,
            file));
            

        //console.log(sequelize.import(path.join(__dirname,file)));
            db[model.name] = model;   //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            //console.log(model);  
            
    });
    
    // for(var key in db){
    //     console.log(key);
    //     }

    console.log(Object.keys(db));  //객체안에 무슨 키가있는지 확인하는 코드
Object.keys(db).forEach(modelName => {
  // console.log(db[modelName]);
    if("associate" in db[modelName]){ //associate객체가 있으면.
        
        db[modelName].associate(db); //
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;