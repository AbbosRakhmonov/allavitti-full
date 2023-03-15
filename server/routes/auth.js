const express = require("express");
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");
const upload = require("../middleware/upload");
const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.post("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);

module.exports = router;
