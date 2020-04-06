const db = require('./database')

const User = db.sequelize.define('user',{
    firstname:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    lastname:{
      type: db.Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: db.Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: db.Sequelize.STRING,
      allowNull: false
    }
})

//User.sync({force: true})

module.exports = User

 
//Create Admin User
/*
User.create({
  firstname: "Italo",
  lastname: "Cavalcante",
  email: "italocavalcantefortaleza@live.com",
  password: "cb23b55090ccb32d228084e289ab00f2"
})
*/