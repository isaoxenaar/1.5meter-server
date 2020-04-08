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
    console.log("body in warnign router", body);
    const warning = await Warning.create({
      time: body.time,
      latitude: body.latitude,
      longitude: body.longitude,
      targetId: body.targetId,
      userId: request.user.id
    });
    response.send(warning);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
