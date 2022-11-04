import { envsafe, port } from 'envsafe';

export const env = envsafe({
  PORT: port({
    desc: 'The port the app is running on',
  }),
});