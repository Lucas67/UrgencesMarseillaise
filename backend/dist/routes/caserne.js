"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const caserneControllers_1 = __importDefault(require("../controllers/caserneControllers"));
const router = (0, express_1.Router)();
router.get('/:id', caserneControllers_1.default.getCaserne);
exports.default = router;
