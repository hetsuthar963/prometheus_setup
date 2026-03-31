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
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
// import { requestCountMiddleware } from "./metrics/requestCount";
const activeRequests_1 = require("./metrics/activeRequests");
// export const metricsMiddleware = (req: Request, res: Response, next: NextFunction):any => {
//     const startTime = Date.now();
//     res.on('finish', function() {
//         const endTime = Date.now();
//         console.log(`Request took ${endTime - startTime}ms`);
//         // Increment request counter
//         requestCountMiddleware.inc({
//             method: req.method,
//             route: req.route ? req.route.path : req.path,
//             status_code: res.statusCode
//         });
//     });
//     next();
// }
const app = (0, express_1.default)();
// app.use(express.json());
app.use(activeRequests_1.requestCount);
// app.get("/user", (req, res) => {
//     res.send({
//         name:"John Doe",
//         age: 25,
//     });
// });
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metrics = yield prom_client_1.default.register.metrics();
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(metrics);
}));
// app.post("/user", (req, res) => {
//     const user = req.body;
//     res.send({
//         ...user,
//         id:1,
//     });
// });
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    res.send({
        name: "John Doe",
        age: 25,
    });
}));
app.listen(3000);
