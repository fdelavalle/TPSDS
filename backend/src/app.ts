import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import type { SqliteDriver } from '@mikro-orm/sqlite';
import { env } from '../utils/env';
import { createExpressServer, useContainer } from 'routing-controllers';
import Container from "typedi";
import path from 'path';

(async() => {
  try {
    await MikroORM.init<SqliteDriver>({
      entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
      entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
      dbName: 'sds',
      type: 'sqlite',
    });

    useContainer(Container);

    const allControllers = path.join(__dirname, "./controllers/*.ts");
    const allServices = path.join(__dirname, "./services/*.ts");

    const app = createExpressServer({
      controllers: [allControllers, allServices],
      cors: true
    })

    app.listen(env.PORT, () => {
      console.log(`Server is running on port: ${env.PORT}`);
    });  
  } catch(err) {
    console.error(err);
  }
})();
