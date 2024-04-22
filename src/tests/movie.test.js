const request = require("supertest")
const app = require('../app')
const URL_BASE = '/movies'
require('../models')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const movie = {
    name: "Survivor",
    image:"txt",
    synopsis:"xxxx",
    releaseYear: "2000-10-12"
}

let movieId

// CREATE
test("POST --> 'URL_BASE', should return status code 201 and res.body.name === movie.name", async() => {
    const res =  await request(app)
    .post(URL_BASE)
    .send(movie)

    movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

// GET ALL
test("GET --> 'URL_BASE', should  return status code 200 and res.body.length === 1", async() => {
    const res = await request(app)
    .get(URL_BASE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

// GET ONE 
test("GET --> 'URL_BASE', should return status code 200 and res.body.name === movie.name", async() => {
    const res = await request(app)
    .get(`${URL_BASE}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

//update 
test("PUT 'URL_BASE/:id', should return status code 200 and res.body === bodyUpdate.name", async() => {
    const bodyUpdate = {
        name: "Canival",
        image:"txt",
        synopsis:"xxxx",
        releaseYear: "2000-10-12"
    }

    const res = await request(app)
    .put(`${URL_BASE}/${movieId}`)
    .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
})

// relacionamos con actors
test("POST -> 'URL_BASE/:id/actors', should return status code 200 and res.body.length === 1", async() => {

    const createActor = await Actor.create({
        firstName:"Klein",
        lastName:"James",
        nationality:"United states",
        image:"txt",
        birthday:"2000-10-12"
    })

    const res = await request(app)
    .post(`${URL_BASE}/${movieId}/actors`)
    .send([createActor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].moviesActors.actorId).toBe(createActor.id)
    expect(res.body[0].moviesActors.movieId).toBe(movieId)
    await createActor.destroy()

})

// relacionamos con directors
test("POST -> 'URL_BASE/:id/directors', should return status code 200 and res.body.length === 1", async() => {

    const createDirector = await Director.create({
        firstName:"Klein",
        lastName:"James",
        nationality:"United states",
        image:"txt",
        birthday:"2000-10-12"
    })

    const res = await request(app)
    .post(`${URL_BASE}/${movieId}/directors`)
    .send([createDirector.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].moviesDirectors.directorId).toBe(createDirector.id)
    expect(res.body[0].moviesDirectors.movieId).toBe(movieId)
    await createDirector.destroy()

})

// relacionamos con genres
test("POST -> 'URL_BASE/:id/genres', should return status code 200 and res.body.length === 1", async() => {

    const createGenres = await Genre.create({
        name: "Funny"
    })

    const res = await request(app)
    .post(`${URL_BASE}/${movieId}/genres`)
    .send([createGenres.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].moviesGenres.genreId).toBe(createGenres.id)
    expect(res.body[0].moviesGenres.movieId).toBe(movieId)
    await createGenres.destroy()

})