process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let list = require("../fakeDb")
let item = { name: "milk", price:3.50 }

beforeEach(async () => {
  list.push(item)
});

afterEach(async () => {
  list = []
});

// Test for returning the entire list.
describe("GET /list", function () {
  test("Returns the list of all items", async function () {
    const res = await request(app).get(`/list`);
    const { list } = res.body;
    expect(list).toHaveLength(1);
    expect(res.statusCode).toBe(200);
  });
});

// Test for adding an item to the list.
describe("POST /list", function () {
  test("Creates a new item in the list", async function () {
    const res = await request(app)
      .post(`/list`)
      .send({
        name: "eggs",
        price: 4.60
      });
    expect(res.body.list).toHaveProperty("name");
    expect(res.body.list).toHaveProperty("price");
    expect(res.body.list.name).toEqual("eggs");
    expect(res.body.list.price).toEqual(4.60);
    expect(res.statusCode).toBe(200);
  });
});

// Test for returning a single item in the list.
describe("GET /list/:name", function () {
  test("Returns a single item if name matches item in list", async function () {
    const res = await request(app).get(`/list/${item.name}`);
    expect(res.body.list).toEqual(item);
    expect(res.statusCode).toBe(200);
  });

  test("Responds with 404 error if item cannot be found", async function () {
    const res = await request(app).get(`/list/none`);
    expect(res.statusCode).toBe(404);
  });
});

// Test for updating a single item in the list.
describe("PATCH /list/:name", function () {
  test("Updates a single item in the list", async function () {
    const res = await request(app)
      .patch(`/list/${item.name}`)
      .send({
        name: "eggs"
      });
    expect(res.body.list).toEqual({
      name: "eggs"
    });
    expect(res.statusCode).toBe(200);
  });

  test("Responds with 404 error if item cannot be found", async function () {
    const res = await request(app).patch(`/list/none`);
    expect(res.statusCode).toBe(404);
  });
});

// Test for removing a single item from the list.
describe("DELETE /list/:name", function () {
  test("Deletes a single a item from the list", async function () {
    const res = await request(app)
      .delete(`/list/${item.name}`);
    expect(res.body).toEqual({ message: `${item.name} Has Been Deleted` });
    expect(res.statusCode).toBe(200);
  });
});