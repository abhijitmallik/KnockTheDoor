import io from 'socket.io-client';
//const socket = io(`${protocol}//${hostname}:${port}`);
//io(window.location.protocol+"//"+window.location.hostname+":56432");
const socket = io("https://enigmatic-reaches-28313.herokuapp.com:56432");
export default socket;