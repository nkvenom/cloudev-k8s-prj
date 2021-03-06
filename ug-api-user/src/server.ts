import express, { Request, Response } from 'express';
import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import { config } from './config/config';
import { V0MODELS } from './controllers/v0/model.index';


(async () => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080; // default port to listen

  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function (req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", config.url);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get("/", async (req: Request, res: Response) => {
    res.send("/api/v0/");
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`running on port ${port}`);
    console.log(`allowing request from ${config.url}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
