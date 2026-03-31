// import { NextFunction, Request, Response } from 'express';
// import client from 'prom-client';
// import { activeRequestsGauge } from './activeRequests';

// // creating a new counter metric
// const requestCounter = new client.Counter({
//     name: 'http_requests_total',
//     help: 'Total number of users whose request hasnt yet resolved',
//     labelNames: ['method', 'route', 'status_code']
// });

// //@ts-ignore
// export function requestCountMiddleware(req, res, next){
        
//         //Increment request counter
//         activeRequestsGauge.inc({
//             method: req.method,
//             route: req.route ? req.route.path : req.path,
//             status_code: res.statusCode
//         }); 
        
//         res.off("finish", () => {
//             activeRequestsGauge.dec({
//             method: req.method,
//             route: req.route ? req.route.path : req.path
//         });
//     });
//     next();
// };
