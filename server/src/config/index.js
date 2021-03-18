const config = {
    jwtSecret: (process.env.JWT_SECRET || 'iurhfguirifguerty78er8'),

    emailValidRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,


    bcryptHashRound: 10

}

module.exports = config;