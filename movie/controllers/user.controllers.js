
const movie = require("../models/movie.schema")
const user = require("../models/user.schema")

const Home = (req, res) => {
    res.send("Welcome to the movie API")
}

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400).send("error")
        }
        const newUser = await user.create({ username, password, email });
        res.status(201).send(newUser);
    }
    catch (error) {
        return res.send(error.message)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const data = await user.findOne({ username: req.body.username, password: req.body.password })
        if (!data) {
            return res.status(401).send({ error: "Invalid username or password" })
        }
        else {
            return res.send({ message: 'Logged in successfully' })
        }
    }
    catch (error) {
        return res.send(error.message)
    }
}

const remove = async (req, res) => {
    const { userid } = req.params.id
    try {
        const data = await user.findOneAndDelete(userid)
        if (data) {
            res.send({ "message": "User deleted successfully" })
        }
        else {
            res.status(404).send("user not found")
        }
    }
    catch (error) {
        return res.send(error.message)
    }
}


const userdata = async (req, res) => {
    try {
        let data = await user.find()
        res.send(data)
    }
    catch (error) {
        return res.send(error.message)
    }
}

const newmovie = async (req, res) => {
    try {
        const createmovie = await movie.create(req.body)
        console.log(createmovie);
        res.status(201).send(createmovie)
    }
    catch (error) {
        res.send(error.message)
    }
}

const updatemovie = async (req, res) => {
    const { id } = req.params
    try {
        let update = await movie.findByIdAndUpdate(id, req.body)
        update = await movie.findById(id)
        res.status(200).send(update)
    }
    catch (error) {
        res.send(error.message)
    }
}

const deletedmovie = async (req, res) => {
    const { id } = req.params
    try {
        const del = await movie.findByIdAndDelete(id)
        res.send({message: "Movie deleted"})
    }
    catch (error) {
        res.send(error.message)
    }
}

const ratingmovie = async (req, res) => {
    const { id } = req.params
    try {
        if (id) {
            let data = await movie.findByIdAndUpdate(id, req.body)
            data.ratings.push({ value: req.body.rating })
            await data.save()
            res.send(data)
        }
        else {
            res.send({ error: "movie not found" })
        }
    }
    catch (error) {
        res.send(error.message)
    }
}

const comment = async (req, res) => {
    const { id } = req.params
    try {
        if (id) {
            let data = await movie.findByIdAndUpdate(id, req.body)
            data.comments.push(req.body)
            await data.save()
            res.send(data)
        }
        else {
            res.send({ error: "movie not found" })
        }
    }
    catch (error) {
        res.send(error.message)
    }
}

const filtermovie = async (req, res) => {
    const { title, addedBy, releaseDate, category } = req.query
    let data = await movie.find(title, addedBy, releaseDate, category)
    if (title) {
        const filter = await movie.filter(title == title)
        res.send(filter)
    }
    if (addedBy) {
        const filter = await movie.filter(addedBy == addedBy)
        res.send(filter)
    }
    if (releaseDate) {
        const filter = await movie.filter(releaseDate == releaseDate)
        res.send(filter)
    }
    if (category) {
        const filter = await movie.filter(category == category)
        res.send(filter)
    }
    res.send(data)
}

module.exports = { Home, signup, login, remove, userdata, newmovie, updatemovie, deletedmovie, ratingmovie, comment, filtermovie }