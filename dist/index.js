"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var helmet_1 = __importDefault(require("helmet"));
var routes_1 = require("./routes/routes");
var constants_1 = require("./config/constants");
var app = express_1.default();
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
routes_1.RegisterRoutes(app);
try {
    var swaggerDocument = require('../dist/swagger.json');
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
catch (err) {
    console.log('Unable to load swagger.json', err);
}
app.listen(constants_1.PORT, function () {
    console.log("Server is listening on port " + constants_1.PORT);
});
