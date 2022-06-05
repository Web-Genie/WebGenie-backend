const express = require("express");
const router = express.Router();

router.post("/", websitesController.create);

router.get("/:website_id", websitesController.get);

router.patch("/:website_id", websitesController.update);

router.delete("/:website_id", websitesController.delete);

router.post("/:website_id/deploy", websitesDeployController.create);

module.exports = router;
