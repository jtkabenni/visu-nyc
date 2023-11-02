"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const {
  ensureCorrectUserOrAdmin,
  ensureAdmin,
  ensureLoggedIn,
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Map = require("../models/map");
const { createToken } = require("../helpers/tokens");
const mapNewSchema = require("../schemas/mapNew.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, mapNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const map = await Map.create(req.params.username, req.body);
    return res.status(201).json({ map });
  } catch (err) {
    return next(err);
  }
});

// /** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
//  *
//  * Returns list of all users.
//  *
//  * Authorization required: admin
//  **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const maps = await Map.findAll();
    return res.json({ maps });
  } catch (err) {
    return next(err);
  }
});

// /** GET /[username] => { user }
//  *
//  * Returns { username, firstName, lastName, isAdmin, jobs }
//  *   where jobs is { id, title, companyHandle, companyName, state }
//  *
//  * Authorization required: admin or same user-as-:username
//  **/

// router.get("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
//   try {
//     const user = await Map.get(req.params.username);
//     return res.json({ user });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
