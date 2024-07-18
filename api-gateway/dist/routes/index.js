"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
const authServiceUrl = 'http://auth-service:5001';
const postServiceUrl = 'http://post-service:5002';
const userServiceUrl = 'http://user-service:5003';
// Route to handle authentication-related requests
router.use('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: req.method,
            url: `${authServiceUrl}${req.path}`,
            data: req.body,
            headers: req.headers,
        });
        res.status(response.status).json(response.data);
    }
    catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}));
// Route to handle post-related requests
router.use('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: req.method,
            url: `${postServiceUrl}${req.path}`,
            data: req.body,
            headers: req.headers,
        });
        res.status(response.status).json(response.data);
    }
    catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}));
// Route to handle user-related requests
router.use('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: req.method,
            url: `${userServiceUrl}${req.path}`,
            data: req.body,
            headers: req.headers,
        });
        res.status(response.status).json(response.data);
    }
    catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}));
exports.default = router;
