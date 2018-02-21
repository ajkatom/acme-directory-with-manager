/******************************************
 *  Author : Author   
 *  Created On : Sat Feb 17 2018
 *  File : employee.js
 *******************************************/

const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define('employee', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }

    },
}, {
    timestamps: false,
    getterMethods: {
        name: function() {
            return this.email.slice(0, this.email.indexOf('@'));
        },
        emailProvider: function() {
            return this.email.slice(this.email.indexOf('@') + 1, this.email.indexOf('.'));
        }
    }
});

module.exports = Employee;