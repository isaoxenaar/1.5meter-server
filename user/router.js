const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = new Router();
const User = require("./model");

router.post("/user", (request, response, next) => {
  const password = bcrypt.hashSync(request.body.password, 10);

  const user = { ...request.body, password };

  User.create(user)
    .then((user) => response.send(user))
    .catch(next);
});

router.get("/user", async (request, response, next) => {
  try {
    const users = await User.findAll(request.body);
    response.send(users);
  } catch (error) {
    next(error);
  }
});

router.put("/user/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await User.findByPk(id);

    const updated = await user.update(request.body);

    response.send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
