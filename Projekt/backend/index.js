const express = require('express');
const mongoose = require('mongoose')
const Redis = require('ioredis');
const cors = require('cors');
const bodyParser = require('body-parser');


const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        validate: {
            validator: function(val) {
                return val.length > 2;
            },
            message: props => "Name cannot be shorter than 3 characters"
        }
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        validate: {
            validator: function(val) {
                return val.length > 2;
            },
            message: props => "Name cannot be shorter than 3 characters"
        }
    }
});

const movieSchema = new mongoose.Schema({

    title: { 
        type: String,
        required: [true, "Title is required"]
    },

    releaseYear: { 
        type: String,
        required: [true, "Release year is required"],
        validate: {
            validator: function(val) {
                return parseInt(val) > 1850;
            },
            message: props => "There were no movies made before 1850"
        }
    },

    director : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

})

const Director = mongoose.model('Director', directorSchema);
const Movie = mongoose.model('Movie', movieSchema);



// mongoose.connect(`mongodb://${process.env.MONGO_SERVICE_HOST}:27017/mydatabase`);

mongoose.connect(`mongodb://${process.env.MONGO_SERBICE_HOST}:27017/mydatabase`);

const redis = new Redis(6379, process.env.REDIS_SERVICE_HOST);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


app.get('/todos', async (req, res) => {
    const data = await redis.keys('*').catch(e => console.log(e))
    if (data) {
        res.send(data)
    } else {
        res.send('No todos found')
    }
    
})

app.post('/todos', async (req, res) => {
    const todo = req.body.todo
    await redis.setex(todo, 60, todo)
    res.send(todo)
})


app.get('/directors', async (req, res) => {
    const dirs = await Director.find()
    res.send(dirs)
})

app.post('/directors', async (req, res) => {
    const data = req.body
    const val = await Director.findOne({name: data.name, surname: data.surname})
    if (!val) {
        const dir = new Director({name: data.name, surname: data.surname})
        await dir.save((err, _) => {
            if (err) res.send(err.message)
            else res.send("Dodano")
        })
    } else {
        res.send("Director already exists")
    } 
})

app.get('/movies', async (req, res) => {
    const movies = await Movie.find()
    res.send(movies.map(el => {
        return {id: el._id, title: el.title, releaseYear: el.releaseYear, director: el.director}
    }))
})

app.get('/movies/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id)
    res.send(movie)
})

app.post('/movies', async (req, res) => {
    const {title, releaseYear, director} = req.body
    const val = await Movie.findOne({title: title})
    if (!val) {
        const movie = new Movie({title: title, releaseYear: releaseYear, director: director})
        await movie.save((err, _) => {
            if (err) res.send(err.message)
            else res.send("Dodano")
        })
    } else {
        res.send("Movie already exists")
    }
})

app.delete('/movies', async (req, res) => {
    const {id} = req.query
    console.log(req.query);
    await Movie.findByIdAndDelete(id)
    res.send("Deleted")
})

app.put('/movies', async (req, res) => {
    const {id, title, releaseYear, director} = req.body
    await Movie.findByIdAndUpdate(id, {title: title, releaseYear: releaseYear, director: director})
    res.send("Updated")
})

app.listen(5000, () => {
    console.log("Backend listening on port 5000");
})

