import express, { NextFunction, Request, Response } from "express";
import client from "prom-client";
import { middleware } from "./middleware";
// import { requestCountMiddleware } from "./metrics/requestCount";
import { requestCount } from "./metrics/activeRequests";

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

const app = express();
// app.use(express.json());

app.use(requestCount);

// app.get("/user", (req, res) => {
    
//     res.send({
//         name:"John Doe",
//         age: 25,
//     });
// });

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

// app.post("/user", (req, res) => {
//     const user = req.body;
//     res.send({
//         ...user,
//         id:1,
//     });
// });

app.get("/user", async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    res.send({
        name: "John Doe",
        age: 25,
    });
});

app.listen(3000);