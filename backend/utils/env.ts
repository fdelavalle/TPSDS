import { envsafe, port, str } from 'envsafe';

export const env = envsafe({
  PORT: port({
    desc: 'The port the app is running on',
  }),
  DB_HOST: str({ desc: 'MongoDB host' }),
  DB_USER: str({ desc: 'MongoDB user' }),
  DB_PASS: str({ desc: 'MongoDB password' }),
  DB_NAME: str({ desc: 'MongoDB database' }),
  JWT_TOKEN: str({ desc: 'JWT token' })
});