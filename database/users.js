const Sequelize = require('sequelize')
const sequelize = require('database')


const User = sequelize.define('user',{
    firstname:{
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
})

User.sync({force: true})