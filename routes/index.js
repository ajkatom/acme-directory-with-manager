/******************************************
 *  Author : Author   
 *  Created On : Sat Feb 17 2018
 *  File : index.js
 *******************************************/
const express = require('express');
const router = require('express').Router();
const db = require('../db');
const { Employee } = db.models;
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
router.use(require('body-parser').urlencoded());
router.use((req, res, next) => {
    let managerids = [];
    Employee.count()
        .then((employeeCount) => {
            res.locals.employeeCount = employeeCount;
        })
        .then(() => {
            return Employee.findAll({
                    where: {
                        ManagerId: {
                            $ne: null
                        }
                    }
                })
                .then((employees) => {
                    employees.forEach(employee => {
                        if (!managerids.includes(employee.ManagerId)) managerids.push(employee.ManagerId);
                    });

                    res.locals.managerCount = managerids.length;
                })

        })
        .then(() => {
            next();
        })


});

router.get('/', (req, res, next) => {
    Employee.findOne()
        .then(() => {
            res.render('index');
        })
        .catch(next)

});

router.get('/employees', (req, res, next) => {
    Employee.findAll()
        .then((employees) => {

            res.render('employees', { employees })
        })
        .catch(next)


});

router.get('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => {
            res.send(employee)
        })
        .catch(next)
});
router.patch('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then((employee) => {
            if (employee.email === req.body.email)
                return employee.email = null;
            employee.email = req.body.email;
            if (req.body.ManagerId === '-1') {
                employee.ManagerId = null;
            } else {
                employee.ManagerId = req.body.ManagerId * 1
            }


            return employee.save();
        })
        .then(() => res.redirect('/employees'))
        .catch(next)
});
router.post('/employees', (req, res, next) => {
    let email;
    let ManagerId;
    email = req.body.email
    if (req.body.ManagerId === '-1') {
        ManagerId = null;
    } else {
        ManagerId = req.body.ManagerId * 1
    }
    Employee.create({
            email: email,
            ManagerId: ManagerId

        })
        .then((employee => res.redirect('/employees')))
        .catch(next);
});


router.delete('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => {

            employee.destroy()
        })

    .then(() => {
            res.redirect('/employees');

        })
        .catch(next)
});





module.exports = router;