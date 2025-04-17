"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pompierController_1 = require("../controllers/pompierController");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.get('/profile', auth_1.default, pompierController_1.getProfile);
exports.default = router;
