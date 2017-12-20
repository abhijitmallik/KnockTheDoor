import io from 'socket.io-client';
//const socket = io(`${protocol}//${hostname}:${port}`);
const socket = io("http://"+window.location.host);
export default socket;