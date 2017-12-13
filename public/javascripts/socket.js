import io from 'socket.io-client';
//const socket = io(`${protocol}//${hostname}:${port}`);
const socket = io("http://localhost:8000");
export default socket;