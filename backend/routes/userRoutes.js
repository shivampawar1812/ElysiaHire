const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { updateUserProfile } = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, (req, res) => {

  res.json(req.user);

});

router.put("/profile", protect, updateUserProfile);

module.exports = router;