const { Router } = require("express");
const router = new Router();
const passport = require("passport");
const {
  getSignup,
  postSignup,
  getLogout,
  getLogin,
  getFailLogin,
  postLogin,
} = require("../controllers/controllerAuth");

router.get("/", getLogin);
// Login
router.get("/login", getLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failLogin",
  }),
  postLogin
);
router.get("/failLogin", getFailLogin);

// Signup
router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/dashboard", getLogin);

router.post("/logout", getLogout);

module.exports = router;