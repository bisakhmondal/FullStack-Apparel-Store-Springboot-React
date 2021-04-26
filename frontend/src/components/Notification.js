import {notification} from "antd"

const putNotification = (Header, Text) => {
    notification.open({
        message: Header,
        description: Text,
        placement: 'bottomRight',
    });
};


export default putNotification
