import apisauce from 'apisauce'

const create = (baseURL = 'http://192.75.240.58:3000') => {
    const api = apisauce.create({
        baseURL,
        timeout: 10000
    });

    const logIn = (username, password) => api.post('/login', {userName: username, password: password});
    const getChatRooms = () => api.get('/listofrooms');
    const getMessages = () => api.get('/getmessages');
    const sendMessage = (username, message) => api.post('/sendmessage', {user: username, message: message});
    return {
        logIn,
        getChatRooms,
        getMessages,
        sendMessage
    }
};

export default {
    create
}
