const moment = require('moment');

module.exports = (sequelize, DataTypes) =>{
    const Content = sequelize.define('Content',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            price : { type: DataTypes.INTEGER },
            description : { type: DataTypes.TEXT }

        }

    );
    Content.prototype.dateFormat = (date) =>
        moment(date).format('YYYY년 MM월 DD일');

    //prototype 이란? >  
    return Content;
}