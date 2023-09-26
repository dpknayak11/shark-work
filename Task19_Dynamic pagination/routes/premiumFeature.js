const express = require("express");
const premiumFeatureController = require("../controllers/premiumFeature")
const userauthenticate = require("../middleware/auth");

const router = express.Router();
router.get('/showLeaderBoard', userauthenticate,premiumFeatureController.showLeaderBoard);
module.exports = router;