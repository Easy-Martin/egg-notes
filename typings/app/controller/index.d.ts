// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Home from '../../../app/controller/home';
import Notify from '../../../app/controller/notify';
import Organization from '../../../app/controller/organization';
import Robot from '../../../app/controller/robot';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    home: Home;
    notify: Notify;
    organization: Organization;
    robot: Robot;
    user: User;
  }
}
