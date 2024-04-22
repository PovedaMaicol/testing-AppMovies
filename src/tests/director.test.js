const request = require("supertest")
const app = require('../app')
const URL_BASE = '/directors'

const director = {
    firstName: 'Akira',
    lastName: 'Nagamoto',
    nationality: 'Japon',
    image: 'txt',
    birthday: '1990-10-02'
}

let directorId

// CREATE 
test("POST -> 'URL_BASE', should return status code 201, and res.body.name === director.name", async() => {
    const res = await request(app)
    .post(URL_BASE)
    .send(director)

    directorId = res.body.id 

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
})

// GET ALL
test("GET -> 'URL_BASE', should return status code 200, and res.body.length === 1", async() => {
    const res = await request(app)
    .get(URL_BASE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

// GET ONE 
test("GET -> 'URL_BASE/:id', should return status code 200, and res.body.name === director.name", async() => {
    const res = await request(app)
    .get(`${URL_BASE}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
})

// UPDATE
test("PUT -> 'URL_BASE/:id', should return status code 200, and res.body.name === bodyUpdate.name", async() => {

    const bodyUpdate = {
        firstName:"Vin",
        lastName:"Diesel",
        nationality:"New York",
        image:"txt",
        birthday:"1999-12-10"
    }

    const res = await request(app)
    .put(`${URL_BASE}/${directorId}`)
    .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)

})

// DELETE
test("DELETE 'URL_BASE/:id', should retur status 204", async() => {
    const res = await request(app)
    .delete(`${URL_BASE}/${directorId}`)

    expect(res.status).toBe(204)
})