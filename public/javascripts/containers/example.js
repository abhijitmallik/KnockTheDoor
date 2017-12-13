
import React,{Component} from 'react';
import './whiteBoardComponent.css';
import socket from '../../socket.js';

let lastX = 0;
let lastY = 0;
let lineThickness = 1;
let canvas;
let ctx;
let coordinatesArr = [];
let pc;
let browserDetected;
let pc_config;
let constraints = {video:true,audio:true};
let isChannelReady = false;
let isStarted = false;
let isInitiator = false;
let remoteStream;
if(!!window.chrome){
   pc_config = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
}else if(typeof InstallTrigger !== 'undefined'){
  pc_config = {'iceServers':[{'url':'stun:23.21.150.121'}]};
}else{
  alert("BROWSER NOT SUPPORTED");
}


let pc_constraints = {
  'optional': [
    {'DtlsSrtpKeyAgreement': true}
  ]};
let sdpConstraints = {};  
export default class WhiteBoardComponent extends Component{
    static defaultProps = {
        width: 800,
        height: 400
    };
    constructor(props){
       super(props);
       this.sendMessage = this.sendMessage.bind(this);
       this.state = {isPainting:false,showVideoAudio:false,videoSrc:"",localStream:"",remoteStreamSrc:"",remoteStream:""};
    }
    componentDidMount() {
       canvas = this.refs.canvas;
       ctx = canvas.getContext("2d");
       ctx.fillStyle = "#ffffff";
       if(this.props.invitedIds){
        socket.on('getcoordinates',(coordinates)=>{
            for(var i=0;i<coordinates.length;i++){
                var obj = coordinates[i];
                if(obj.operation == "clear"){
                    ctx.clearRect(0, 0, this.props.width, this.props.height);
                    return;
                }
                if(obj.firstCoordinate == "y"){
                   ctx.fillRect(obj.y, obj.x, obj.lineThickness , obj.lineThickness );
                }else{
                   ctx.fillRect(obj.x, obj.y, obj.lineThickness , obj.lineThickness );
                }
            }
            
        });
       }
    }
    clearWhiteBoard() {
        socket.emit("setcoordinates",[{operation:"clear"}]);
        ctx.clearRect(0, 0, this.props.width, this.props.height);
    }
    startWriting(e){
      coordinatesArr = [];
      this.setState({isPainting:true}); 
      lastX = e.nativeEvent.offsetX - canvas.offsetLeft;
      lastY = e.nativeEvent.offsetY - canvas.offsetTop;
    }
    mouseUp(e){
      socket.emit("setcoordinates",coordinatesArr);
      this.setState({isPainting:false}); 
    }
    mouseMove(e){
      if(this.state.isPainting){
        let mouseX = e.nativeEvent.offsetX - canvas.offsetLeft;
        let mouseY = e.nativeEvent.offsetY - canvas.offsetTop;
          var x1 = mouseX,
            x2 = lastX,
            y1 = mouseY,
            y2 = lastY;


        var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
        if (steep){
            var x = x1;
            x1 = y1;
            y1 = x;

            var y = y2;
            y2 = x2;
            x2 = y;
        }
        if (x1 > x2) {
            var x = x1;
            x1 = x2;
            x2 = x;

            var y = y1;
            y1 = y2;
            y2 = y;
        }

        var dx = x2 - x1,
            dy = Math.abs(y2 - y1),
            error = 0,
            de = dy / dx,
            yStep = -1,
            y = y1;
        
        if (y1 < y2) {
            yStep = 1;
        }
       
        lineThickness = 2;
     
        for (var x = x1; x < x2; x++) {
            if (steep) {
                coordinatesArr.push({id:this.props.invitedIds,x:x,y:y,lineThickness:lineThickness,firstCoordinate:"y",operation:"draw"});
                //socket.emit("setcoordinates",{id:this.props.invitedIds,x:x,y:y,lineThickness:lineThickness,firstCoordinate:y});
                ctx.fillRect(y, x, lineThickness , lineThickness);
            } else {
                coordinatesArr.push({id:this.props.invitedIds,x:x,y:y,lineThickness:lineThickness,firstCoordinate:"x",operation:"draw"});
                //socket.emit("setcoordinates",{id:this.props.invitedIds,x:x,y:y,lineThickness:lineThickness,firstCoordinate:x});
                ctx.fillRect(x, y, lineThickness , lineThickness );
            }
            
            error += de;
            if (error >= 0.5) {
                y += yStep;
                error -= 1.0;
            }
        }
        


        lastX = mouseX;
        lastY = mouseY;

      }
    }
    audioCall(){
       if(this.state.showVideoAudio){
         this.setState({showVideoAudio:false});
       }else{
         this.setState({showVideoAudio:true});
       }
    }
    videoCall(){
        let channel =  prompt("Enter signaling channel name");
        if (channel !== "") {
            console.log('Trying to create or join channel: ', channel);
            // Send 'create or join' to the server
            socket.emit('create or join', channel);
        }
        // Handle 'created' message
        socket.on('created',(channel)=>{
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        });
        socket.on('message',(message)=>{
          let myResponse = prompt('Send response to other peer');
          socket.emit('response',{
            channel:channel,
            message:myResponse
          });
        });
        socket.on('response',(response)=>{
           let chatMessage = prompt("Keep on chatting or Bye to quit conversation");
           socket.emit('response',{
            channel:channel,
            message:chatMessage
           })
        });
        socket.on('joined',(room)=>{
           console.log('This peer has joined room ' + room);
           isChannelReady = true;
           if (navigator.getUserMedia) {
                navigator.getUserMedia(constraints, this.handleUserMedia.bind(this), this.handleUserMediaError);
                isInitiator = true;
                this.checkAndStart();
            }
        });
        socket.on('join',(room) =>{
            console.log('Another peer made a request to join room ' + room);
            console.log('This peer is the initiator of room ' + room + '!');
            isChannelReady = true;
        });
    }
    handleUserMedia(stream) {
       console.log('Adding local stream.');
       this.sendMessage('got user media');
       this.setState({localStream:stream});
       this.setState({ videoSrc: window.URL.createObjectURL(stream) });
    }
    handleUserMediaError() {

    }
    sendMessage(message){
      console.log('Sending message: ', message);
      socket.emit('message', message);
    }
    checkAndStart(){
      console.log("121212121");
      console.log("this.state.videoSrc",this.state.videoSrc);
      console.log("isChannelReady===",isChannelReady);
        if(!isStarted && typeof this.state.videoSrc != "undefined" && isChannelReady){
          console.log("2222222")
           this.createPeerConnection();
           console.log("333333")
           isStarted = true;
           if(isInitiator){
            console.log("4444444");
             this.doCall();
           }
        }
    }
    doCall(){
      console.log('Creating Offer...');
      pc.createOffer(this.setLocalAndSendMessage.bind(this), this.onSignalingError.bind(this), sdpConstraints);
    }
    // PeerConnection management...
    createPeerConnection(){
      console.log("55555555");
      try{
        debugger;
        pc = new RTCPeerConnection(pc_config, pc_constraints);
        pc.addStream(this.state.localStream); 
        pc.onicecandidate = this.handleIceCandidate.bind(this);
      }
      catch(e){
        alert('Cannot create RTCPeerConnection object.');
        return;
      }
      pc.onaddstream = this.handleRemoteStreamAdded.bind(this);
      pc.onremovestream = this.handleRemoteStreamRemoved.bind(this);
       
    }
    // ICE candidates management
    handleIceCandidate(event) {
      console.log('handleIceCandidate event: ', event);
      if (event.candidate) {
        this.sendMessage({
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate});
      } else {
        console.log('End of candidates.');
      }
    }
    // Signaling error handler
    onSignalingError(error) {
       console.log('Failed to create signaling message : ' + error.name);
    }

    // Create Answer
    doAnswer() {
      console.log('Sending answer to peer.');
      pc.createAnswer(this.setLocalAndSendMessage.bind(this), this.onSignalingError.bind(this), sdpConstraints);
    }

    // Success handler for both createOffer()
    // and createAnswer()
    setLocalAndSendMessage(sessionDescription) {
      pc.setLocalDescription(sessionDescription);
      this.sendMessage(sessionDescription);
    }

    // Remote stream handlers...

    handleRemoteStreamAdded(event) {
      console.log('Remote stream added.');
      //attachMediaStream(remoteVideo, event.stream);
      console.log('Remote stream attached!!.');
      this.setState({"remoteStreamSrc":window.URL.createObjectURL(event.stream)});
    }

    handleRemoteStreamRemoved(event) {
      console.log('Remote stream removed. Event: ', event);
    }
    render() {
        return (
          <div className='canvas_outer'>
                <div className='video-audio'><span className="audio-call" title="Audio call" onClick={this.audioCall.bind(this)}></span></div>
                {this.state.showVideoAudio ?
                  <div className='video-display'>
                    <span className="video-call" title="Video Call" onClick={this.videoCall.bind(this)}></span>
                    <video  autoPlay="true"   class='local-video' src={this.state.remoteStreamSrc}></video>
                    <div className="local-video-display"><video  autoPlay="true"  src={this.state.videoSrc}></video></div>
                  </div> : ""
                }
                <div className='canvas_inner'>
                   <canvas ref="canvas" width={this.props.width} height={this.props.height} onMouseUp={this.mouseUp.bind(this)} onMouseMove={this.mouseMove.bind(this)} onMouseDown={this.startWriting.bind(this)}/>
                   <div className="canvas-button-group">
                     <button className="canvas_button_clear" onClick={this.clearWhiteBoard.bind(this)}>Clear</button>
                     <button className="canvas_button" onClick={this.props.closeCanvasPopup}>close me</button>
                   </div>
                </div>
            </div>   
        );
    }

} 