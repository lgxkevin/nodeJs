const Sequelize = require('sequelize/index');

const sequelize = new Sequelize('node_application', 'root', 'liuguanxi1995', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;