import 'reflect-metadata';
import { env } from '../utils/env';
import { createExpressServer, useContainer } from 'routing-controllers';
import Container from "typedi";
import path from 'path';
import connectToDatabase from '../utils/dbConnection';
import authorizationChecker from './middleware/authorizationChecker';
import getCurrentUser from './middleware/getCurrentUser';

(async() => {
  try {
    await connectToDatabase().then(() => console.info("Connected to database"));

    useContainer(Container);

    const allControllers = path.join(__dirname, "./controllers/*.ts");
    const allServices = path.join(__dirname, "./services/*.ts");

    const app = createExpressServer({
      controllers: [allControllers, allServices],
      cors: true,
      authorizationChecker,
      currentUserChecker: getCurrentUser,
    })

    app.listen(env.PORT, () => {
      console.log(`Server is running on port: ${env.PORT}`);
    });  
  } catch(err) {
    console.error(err);
  }
})();
