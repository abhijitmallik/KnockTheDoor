import io from 'socket.io-client';
//const socket = io(`${protocol}//${hostname}:${port}`);
//io(window.location.protocol+"//"+window.location.hostname+":56432");
const socket = io(window.location.origin,{'force new connection': true});
export default socket;