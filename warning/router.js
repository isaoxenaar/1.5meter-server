const express = require("express");
const router = express.Router();
const auth = require("../auth/middleware");
const Warning = require("./model");

router.get("/warning", async (request, response, next) => {
  try {
    const warnings = await Warning.findAll();
    response.send(warnings);
  } catch (error) {
    next(error);
  }
});

router.post("/warning", auth, async (request, response, next) => {
  try {
    const { body } = request;
    const fullRequest = { ...body, userId: request.user.id };
    console.log("body in warnign router", request.user.id);
    const warning = await Warning.create(fullRequest);
    response.send(warning);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

module.exports = router;
