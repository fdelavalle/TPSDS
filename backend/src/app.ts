import express from 'express';
import cors from 'cors';
import { env } from '../utils/env';

(async() => {
  try {
    const app = express();

    app.use(cors());
  
    app.get('/api/test', (_, res) => {
      return res.status(200).json({
        message: 'Test',
      });
    });
    
    app.listen(env.PORT, () => {
      console.log(`Server is running on port: ${env.PORT}`);
    });  
  } catch(err) {
    console.error(err);
  }
})();
