"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pompierController_1 = require("../controllers/pompierController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.auth, pompierController_1.getProfile);
exports.default = router;
