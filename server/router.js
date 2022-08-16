// @ts-check
import { images, ifNotExistsMakeDir } from './images.js';
import compression from 'compression';
import express from 'express';

export default class Router {
  constructor(service) {
    this.service = service;

    ifNotExistsMakeDir('./images');

    const router = express();

    router.use(compression());
    router.use(express.static('client'));
    router.use(express.static('shared'));
    router.use(express.static('images'));
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.post('/register', async (request, response) => {
      response.json( await service.register(request.body) );
    });
    
    router.post('/login', async (request, response) => {
      response.json( await service.login(request.body) );
    });
    
    router.post('/workorders/add', async (request, response) => {
      response.json( await service.addWorkOrder(request.body) );
    });

    router.post('/workorders/save', async (request, response) => {
      response.json( await service.saveWorkOrder(request.body));
    });

    router.get('/workorders/user/:id', (request, response) => {
      response.json(service.listWorkOrdersByUserId(request.params.id) );
    });
    
    router.get('/workorders/:number', async (request, response) => {
      response.json( await service.getWorkOrderByNumber(request.params.number) );
    });
    
    router.post('/users/save', async (request, response) => {
      response.json( await service.saveUser(request.body) );
    });

    router.post('/image/save', images.single('image'), async (request, response) => {
      const url = '/images/' + request.file.filename
      const number = request.body.number;
      console.log('*** image: ', request.file);
      console.log('*** url: ', url);
      console.log('*** number: ', number);
      response.json( await service.saveImage(url, number) );
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