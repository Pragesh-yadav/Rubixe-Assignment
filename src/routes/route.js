const express = require("express")
const router = express.Router()
const services = require("../services/userServices");
const imageUpload = require("../middleware/imageUpload")

//------------User Route -----------//
router.post("/user",imageUpload.upload, services.userRegistrationService);
router.post ("/login", services.userLogin);
router.get("/getall", services.getALL )

module.exports = router