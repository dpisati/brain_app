const handleSignin = (req, res, db, bcrypt) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compare(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
                } else {
                    res.status(400).json('1 wrong credentials')
                }
        })
    .catch(err => res.status(400).json('2 wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}