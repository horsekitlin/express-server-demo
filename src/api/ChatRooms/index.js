import Created from './Created';
import { Router } from 'express';
import { checkPermision } from '../../lib/LoginBase';

var ChatRoomGroups = Router();

UserGroups.route("/created/v1/")
    .post(Created.post);

export default ChatRoomGroups;
