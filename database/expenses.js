const db = require('./database')
const User = require('./users')

const Expenses = db.sequelize.define('expenses',{
    title:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    value:{
      type: db.Sequelize.DOUBLE,
      allowNull: false
    },
    description: {
      type: db.Sequelize.TEXT,
      allowNull: false
    },
    dateExpense: {
      type: db.Sequelize.DATE,
    }
})

Expenses.belongsTo(User);
User.hasMany(Expenses)
//Expenses.sync()

module.exports = Expenses