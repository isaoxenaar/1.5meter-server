const express = require("express");
const router = express.Router();
const auth = require("../auth/middleware");

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
    const warning = await Warning.create({
      time: body.time,
      targetId: body.targetId,
      userId: request.user.id
    });
    response.send(warning);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
