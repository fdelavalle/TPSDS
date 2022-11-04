import express from 'express';

(async() => {
  try {
    const app = express();

    app.use((_, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
      );
      next();
    });
  
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
