const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication API
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: ahmad
 *               email:
 *                 type: string
 *                 example: ahmad@gmail.com
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Username atau email salah
 */
router.post("/login", authController.login);

module.exports = router;