"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const apigatewayswagger_1 = __importDefault(require("./swagger/apigatewayswagger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(apigatewayswagger_1.default));
// Define your routes here
app.use('/api', require('./routes/index'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
