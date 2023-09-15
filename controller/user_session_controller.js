const express = require('express');
const router = express.Router();
const database = require('../database/database');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
    res.render('index')
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
                                
                                res.redirect("home.index.html")
                            } else {
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
router.post('/user/create_user', async (req, res) => {

    let { email } = req.body;
    let { password } = req.body;


    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {

            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            console.log(token)

            const sql = `INSERT INTO user (email, password, status, token) VALUES ("${email}","${hash}", false, "${token}");`;
            console.log(email, hash, token)

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



module.exports = router;
