const User = require('../models/user')
const Comment = require('../models/comment')

exports.getSignup = (req, res, next) => {
    // res.render('user', {
    //   path: '/signup'
    // });
    res.status(200).json('get signup page');
};
  
exports.postSignup = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const secret = req.body.secret;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hashSync(password, salt);

    // const hashedPassword = await bcrypt.hash(password, 10);

    if (!email || !secret || !password) {
        // return 'all fields are required**';
        res.status(400);
    }

    User.findOne({ email: email }).then(exist_user => {
        if(exist_user) {
            return res.json({isSuccess: false, msg: 'email already exists'});
        }
            const new_user = new User ({
            email: email,
            // location: location,
            secret: secret,
            password: password
        })
        return new_user.save().then(new_user => {
            // res.status(200).json({isSuccess: true, new_user});
            return res.json({isSuccess: true, msg: 'sucessfully registered..'});
        }).catch(err => {
            res.send(err);
        });
        
    })
}

exports.postLogin = (req, res, next) => {
    User.findOne({ email: req.body.email, password: req.body.password }).then(exist_user => {
        if(exist_user) {
            return res.json({isSuccess: true, msg: 'sucessfully loggedin..'});
        } else if ( !exist_user ) {
            return res.json({isSuccess: false, msg: 'failed loggin..'});
        }
    })
}

exports.getComment = (req, res, next) => {
    const userId = req.params.userId;
    User.findOne({ _id: userId }).then(user => {
        Comment.find({}).sort({ 'timestamp': -1 }).then(all_comment => {
            console.log(all_comment)
            if(all_comment.length == 0) {
                return res.json({isSuccess: false, msg: 'There is no message to show..'});
            } else if(all_comment.length > 0){
                return res.json({isSuccess: true, msg: 'all comments..', all_comment: all_comment});
            }
        }).catch(err => console.log(err))
    }).catch(err => {console.log(err)})
}

exports.postComment = (req, res, next) => {
    const userId = req.params.userId;
    User.findOne({ _id: userId }).then(user => {
        const new_comment = new Comment ({
            email: user.email,
            // location: location,
            msg: req.body.msg,
            user_id: userId
        })
        return new_comment.save().then(new_comment => {
            // res.status(200).json({isSuccess: true, new_comment});
            return res.json({isSuccess: true, msg: 'sucessfully posted..'});
        }).catch(err => {
            res.send(err);
        });
    })
}

exports.getfind = (req, res, next) => {
    const userId = req.params.userId;
    User.findOne({ _id: userId }).then(user => {
        if(user) {
            Comment.find({ user_id: userId }).sort().then(get_comment => {
                let msg = []
                get_comment.map((msg_1) => {
                    msg.push(msg_1)
                    console.log(get_comment._id, ':', msg)
                })
                return res.json({isSuccess: true, msg: 'sucessfully get message..', get_comment: msg});
            }).catch(err => console.log(err))
        } else if (!user) {
            return res.json({isSuccess: false, msg: 'This is not a valid user..'});
        }
    })
}

// fogetpassword
exports.postForgetPassword = (req, res, next) => {
    User.findOne({ email: req.body.email, secret: req.body.secret }).then(user => {
        if(user) {
            return res.json({isSuccess: true, msg: 'Your password..', password: user.password});
        } else if (!user) {
            return res.json({isSuccess: true, msg: 'Enter valid secret or e-mail..'});
        }
    })
}