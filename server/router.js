// @ts-check
import compression from 'compression';
import express from 'express';

export default class Router {
  constructor(service) {
    this.service = service;

    const router = express();

    router.use(compression());
    router.use(express.static('client'));
    router.use(express.static('shared'));
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.post('/register', (request, response) => {
      response.send(service.register(request.body));
    });
    
    router.post('/login', (request, response) => {
      response.send(service.login(request.body));
    });
    
    router.post('/workorders/add', (request, response) => {
      response.send(service.addWorkOrder(request.body));
    });

    router.post('/workorders/save', (request, response) => {
      response.send(service.saveWorkOrder(request.body));
    });

    router.get('/workorders/user/:id', (request, response) => {
      response.send(service.listWorkOrdersByUserId(request.params.id));
    });
    
    router.get('/workorders/:number', (request, response) => {
      response.send(service.getWorkOrderByNumber(request.params.number));
    });
    
    router.post('/users/save', (request, response) => {
      response.send(service.saveUser(request.body));
    });

    router.post('/image/save', (request, response) => {
      response.send(service.saveImage(request.body));
    });
    
    const port = parseInt(process.env.PORT) || 3000;
    const host = process.env.BIND_IP || '127.0.0.1';
    const http = router.listen(port, host, () =>
      console.log(`*** server and router listening on http://${host}:${port}/`)
    );
    
    process.on('SIGINT', () => {
      shutdown('sigint');
    });
    
    process.on('SIGTERM', () => {
      shutdown('sigterm');
    });

    function shutdown(signal) {
      http.close(() => {
        console.log(`*** [${signal}] server and router shutting down ...`);
        service.store.disconnect();
        console.log('*** server and router shutdown.');
        process.exit();
      });
    }
  }
}