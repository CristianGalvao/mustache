const express = require('express');
const router = express.Router();
const database = require('../database/database');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
    if (req.session.authenticated) {
        res.redirect("/login")
    } else {
        res.render("index")
    }
});


router.post("/login", (req, res) => {

    let { email } = req.body;
    let { password } = req.body;

    const sql = `SELECT * FROM user WHERE email = '${email}';`;

    get_login = async function () {
        return new Promise(function (resolve, reject) {
            database.query(
                sql,
                async function (err, rows) {

                    if (rows === undefined || rows == null || rows == '') {
                        res.send(JSON.stringify('user_not_found'));
                    }

                    else {
                        const user = rows[0]
                        if (user.status == false) {
                            res.send(JSON.stringify('verify_email'));
                        } else {
                            if (bcrypt.compareSync(password, user.password)) {
                                req.session.authenticated = true

                                req.session.user = {
                                    email, password
                                }
                                res.render("../views/layouts/main.handlebars", { user: user })
                            }
                            else {
                                res.send(JSON.stringify("error_login"));
                            }
                        }
                    }
                }
            )
        }
        )
    }

    get_login()
        .then(function (results) {
            res.redirect("home.index.html")
        })
        .catch(function (err) {
            res.send("Promise rejection error: " + err);
        });


});


//CRIAR USUÁRIO
router.post('/create_user', async (req, res) => {

    let { email } = req.body;
    let { password } = req.body;
    let { first_name } = req.body;
    let { last_name } = req.body;

    const token = jwt.sign({ first_name }, process.env.JWT_SECRET, { expiresIn: '24h' });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {

            const sql = `INSERT INTO user (first_name, last_name, email, password, status,token) VALUES ("${first_name}","${last_name}", "${email}", "${hash}", false, "${token}");`

            try {
                database.query(sql, function (err, result) {
                    if (result)
                        res.send(JSON.stringify('cadastrado'))
                })
            } catch (err) {
                res.send(err)
            }
        });
    });
});


//LOGOUT
router.get("/logout", (req, res) => {
    req.session.destroy()
    res.render('index')
});

// LISTANDO USUARIOS



router.get("/get_users", (req, res) => {

    const sql = "SELECT first_name, last_name, email, level_administrator FROM user;"

    database.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(data);
      });
})


module.exports = router;
