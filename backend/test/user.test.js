const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "root", passwordHash });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    //   const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: "abcdefgh",
      name: "abcdefgh",
      password: "abcdefgh",
    };

    const result = await api.post("/api/users").send(newUser);
    expect(result.status).toBe(201);
    expect(result.header["content-type"]).toMatch(/application\/json/);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
