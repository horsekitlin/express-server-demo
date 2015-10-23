import _ from 'lodash';
import Collection from '../lib/MongoBase';
import Promise from 'bluebird';
import config from '../config';
import { now } from '../lib/TimeBase';
import { Schema } from 'mongoose';

class RoomClass extends Collection{
    constructor(name, schema){
        super(name, schema);
    }
    userlogin(room, user){
        room.users.unshift({
            uid : user.id,
            name : user.name,
            login_time : now()
        });
        return room.syncSave();
    }
    userlogout(room, user){
        room.users = _.filter(room.users, {uid : user.id});
        return room.syncSave();
    }
    globalmsg(room, user, message, file){
        let query = {
            from : user.id,
            created_time : now(),
            content : message,
        };
        if(!_.Undefined(file)){
            query.filename = file.filename;
            query.type = file.type;
            query.url = config.img_url + "/" + query.filename;
        }
        room.msg.unshift(query);
        return room.syncSave();
    }
    privatemsg(room, user, message, to, file){
        let query = {
            from : user.id,
            created_time : now(),
            content : message,
            to : to.id
        };
        if(!_.Undefined(file)){
            query.filename = file.filename;
            query.type = file.type;
            query.url = config.img_url + "/" + query.filename;
        }
        room.msg.unshift(query);
        return room.syncSave();
    }
}
const MessageSchema = new Schema({
    from : {
        uid : {type : String},
        account : {type : String}
    },
    to : {
        uid : {type : String},
        account : {type : String}
    },
    created_time : {
        type : Number
    },
    content : {
        type : String,
        required : true
    },
    filename : {
        type : String
    },
    file_path : {
        type : String
    }
});

const UsersSchema = new Schema({
    uid : {type : String},
    login_time : {type : Number},
    name : {type : String}
});

let RoomSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    created_by : {
        uid : {type : String},
        name : {type : String}
    },
    created_time : {
        type : Number
        required : true
    },
    users : [UsersSchema],
    msg : [MessageSchema]
});

let Room = new RoomClass('room', RoomClass);

export default Room;

