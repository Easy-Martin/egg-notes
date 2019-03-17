// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Gzip from '../../../app/middleware/gzip';
import Jwt from '../../../app/middleware/jwt';

declare module 'egg' {
  interface IMiddleware {
    gzip: typeof Gzip;
    jwt: typeof Jwt;
  }
}
