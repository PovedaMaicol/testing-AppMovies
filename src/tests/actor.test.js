const request = require("supertest")
const app = require('../app')
const URL_BASE = '/actors'

const actor = {
    firstName:"Homer",
    lastName:"Simpson",
    nationality:"Springfield",
    image:"txt",
    birthday:"1999-12-10"
}

let actorId
// CREATE
test("POST --> 'URL_BASE', should return status code 201 and res.body.name === actor.name", async() => {
    const res =  await request(app)
    .post(URL_BASE)
    .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
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
test("GET --> 'URL_BASE/:id', should return status code 200 and res.body.name === actor.name", async() => {
    const res = await request(app)
    .get(`${URL_BASE}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
})

// UPDATE 
test("PUT --> 'URL_BASE/:id', should return status code 200 and res.body.name === bodyUpdate.name", async() => {
    const bodyUpdate = {
        firstName:"Maggiew",
        lastName:"Simpson",
        nationality:"Springfield",
        image:"txt",
        birthday:"1999-12-10"
    }

    const res = await request(app)
    .put(`${URL_BASE}/${actorId}`)
    .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
})

// DELETE
test("DELETE --> 'URL_BASE/:id', should return status code 204", async() => {
    const res = await request(app)
    .delete(`${URL_BASE}/${actorId}`)

    expect(res.status).toBe(204)
})