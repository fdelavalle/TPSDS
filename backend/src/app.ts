import express from 'express';
import cors from 'cors';

(async() => {
  try {
    const app = express();

    app.use(cors());
  
    app.get('/api/test', (_, res) => {
      return res.status(200).json({
        message: 'Test',
      });
    });
    
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });  
  } catch(err) {
    console.error(err);
  }
})();
