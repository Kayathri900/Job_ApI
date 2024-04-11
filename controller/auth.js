const User = require('../models/user')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const register = async (req, res) => {

    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json(
        {
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name,
                token
            }
        })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('please provide email and password')
    }
    const user = await User.findOne({ email })


    if (!user) {
        throw new UnauthenticatedError('invalid credentials ')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('invalid credientials ')
    }
    //compare password 
    const token = user.createJWT()

    res.status(StatusCodes.OK).json(
        {
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name,
                token
            }
        })
}


const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body;
    console.log(req.user);
    if (!email || !name || !lastName || !location) {
        console.log('its caling',name,email,lastName,location);
      throw new BadRequestError('Please provide all values');
    }
    
    const user = await User.findOne({ _id: req.user.userId });
    user.email=email
    user.lastName=lastName
    user.name=name
    user.location=location
    console.log(req.user);
    await user.save()
    const token=user.createJWT();
    res.status(StatusCodes.OK).json(
        {
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name,
                token
            }
        })

};



module.exports = {
    register,
    login,
    updateUser
}