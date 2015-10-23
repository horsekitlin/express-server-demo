const route_prefix = 'chatroom';

const server = 'http://localhost/' + route_prefix;

const img_url = server + '/data';

const root = '/var/local/web/' + route_prefix + '/data';

export default {

    server : server,

    PORT : 8888,

    data_root : root,

    mongodb : {
        url : 'mongodb://localhost:27017/' + route_prefix
    },

    language : {

        os : {
            android : 'Android',
            ios : 'IOS',
            all : '全部'
        },
        to : {

            member : '會員',
            notmember : '非會員',
            all : '全部'

        },
        lang : {

            tw : '繁體中文',
            cn : '簡體中文',
            jp : '日文',
            en : '英文'
        }
    },

    img_url : img_url
};
