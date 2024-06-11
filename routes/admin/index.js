import { Router } from "express";
import protectRoute, {
  generateToken,
  csrfSynchronisedProtection,
} from "../../utils/protectRoute.js";
import home from "./home.js";
import login from "./login.js";
import dashboard from "./dashboard.js";
import logOut from "./logout.js";
import moderatePost from "./moderate-post.js";
import signUpAdmin from "./signup-admin.js";
import {
  loginAdminValidation,
  signUpAdminValidation,
} from "../../utils/validation.js";

const router = Router();

router.get("/", home);
router
  .route("/login")
  .get((req, res) => {
    res.render("login", { csrfToken: generateToken(req) });
  })
  .post(csrfSynchronisedProtection, loginAdminValidation, login);

router
  .route("/signup")
  .get((req, res) => res.render("signup"))
  .post(signUpAdminValidation, signUpAdmin);

router.get(
  "/dashboard",
  protectRoute("/admin/login"),
  (req, res, next) => {
    req.csrfToken = () => generateToken(req);
    next();
  },
  dashboard
);
router.get("/logout", logOut);
router.post("/moderate", csrfSynchronisedProtection, moderatePost);

export default router;
