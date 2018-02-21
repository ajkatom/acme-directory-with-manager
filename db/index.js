/******************************************
 *  Author : Author   
 *  Created On : Sat Feb 17 2018
 *  File : index.js
 *******************************************/
const Sequelize = require('sequelize');
const conn = require('./conn')
const Employee = require('./employee');
const sync = () => {
    return conn.sync({ force: true });

};
Employee.belongsTo(Employee, { as: 'Manager', foriegnKey: { allowNull: true } })
Employee.hasMany(Employee, { foreignKey: 'ManagerId', foriegnKey: { allowNull: true } });
const seed = () => {
    return Promise.all([
        Employee.create({ email: 'dan@yahoo.com' }),
        Employee.create({ email: 'ben@yahoo.com' }),
        Employee.create({ email: 'aj@gmail.com', ManagerId: 1 }),
        Employee.create({ email: 'jay@gmail.com', ManagerId: 1 }),
        Employee.create({ email: 'ray@yahoo.com', ManagerId: 2 })


    ])


};






module.exports = {
    sync,
    seed,
    models: {
        Employee
    }
}