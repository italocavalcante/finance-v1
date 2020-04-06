const Sequelize = require('sequelize')
const sequelize = new Sequelize('finance', 'italocavalcante', '#Portus@Cale10', {
    host: 'italocavalcante.com',
    dialect: 'mysql'
  });

sequelize.authenticate().then(() => {console.log("Connected")})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}