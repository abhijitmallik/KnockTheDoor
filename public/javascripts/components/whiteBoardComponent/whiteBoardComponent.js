
import React,{Component} from 'react';
import './whiteBoardComponent.css';
import socket from '../../socket.js';

let lastX = 0;
let lastY = 0;
let lineThickness = 1;
let canvas;
let ctx;
let coordinatesArr = [];
let rtcConnection;
let constraints = {video:false,audio:false};
let connectedUser;
let callee;
let caller;
let stream;
 
export default class WhiteBoardComponent extends Component{
    static defaultProps = {
        width: 800,
        height: 400
    };
    constructor(props){
       super(props);
       this.state = {isPainting:false,showVideoAudio:false,videoSrc:"",localStream:"",remoteStreamSrc:"",remoteStream:"",enableVideoCall:false,voiceClass:"mute-audio",videoClass:"stop-video",constraints:{video:true,audio:true}};
    }
    componentDidMount() {
      console.log("=====adminInfo===this.props.adminInfo===",this.props.adminInfo);
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
    audioVideoCall(){
       if(this.state.showVideoAudio){
         this.setState({showVideoAudio:false});
         this.closeConnection();
       }else{
         this.setState({showVideoAudio:true});
       }
       let room =  "Online Session";
       if (room !== "") {
            if(this.props.adminInfo.status){  
              this.messageSend({
                type:'create or join',
                room:room,
                adminId:this.props.adminInfo.id,
                clientId:this.props.invitedIds
              });
            }else{
              this.messageSend({
                type:'create or join',
                room:room,
                adminId:this.props.userInfo.adminId,
                clientId:this.props.invitedIds
              });
            }
            this.initConnection();
            // Send 'create or join' to the server
            
        }
    }

    initConnection(){
       socket.on('message',(obj)=>{
          switch(obj.type){
            case 'created':
             caller = obj.adminId;
             callee = obj.clientId;
             this.startConnection();
             break;
            case 'joined' :
              if(this.props.adminInfo.status){
                caller = obj.adminId;
                callee = obj.clientId;
                this.setState({enableVideoCall:true});
              }else{
                callee = obj.adminId;
                caller = obj.clientId;
                connectedUser = obj.clientId;
                this.startConnection();
              }
             break; 
            case "candidate":
             this.onCandidate(obj.candidate);
             break; 
            case "offer" :
              this.onOffer(obj); 
              break; 
            case "answer":
              this.onAnswer(obj.answer);  
              break;
            case "leave":
              this.onLeave();
              break;  
          }
       })
    }
    startConnection(){
       if(this.hasUserMedia()){
          navigator.getUserMedia(this.state.constraints,(myStream)=>{
             this.setState({"videoSrc":window.URL.createObjectURL(myStream)});
             if(this.hasRTCPeerConnection()){
                this.setupPeerConnection(myStream);
                stream = myStream;
             }
          },(error)=>{
            console.log("error",error);
          })
       }
    }
    hasUserMedia() {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      return !!navigator.getUserMedia;
    }
    setupPeerConnection(stream){
      console.log("====caller====",caller);
      console.log("====callee====",callee);
      let configuration = {
        "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
      };
      rtcConnection = new RTCPeerConnection(configuration);
      rtcConnection.addStream(stream);
      rtcConnection.onaddstream = (e)=>{
        this.setState({remoteStreamSrc:window.URL.createObjectURL(e.stream)});
      }
      rtcConnection.onicecandidate = (event) => {
        if(event.candidate){
          this.messageSend({
            type:"candidate",
            candidate:event.candidate,
            caller:caller,
            callee:callee
          })
        }
      }
    }
    hasRTCPeerConnection() {
      window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
      window.RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription;
      window.RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate;
      return !!window.RTCPeerConnection;
    }
    createOffer(){
        rtcConnection.createOffer().then((offer) => {
        rtcConnection.setLocalDescription(offer);
         this.messageSend({
           type:"offer",
           offer:offer,
           callee:callee,
           caller:caller
         });
         
      })
    }
    onOffer(obj){
      rtcConnection.setRemoteDescription(new RTCSessionDescription(obj.offer));
      rtcConnection.createAnswer().then((answer)=>{
        rtcConnection.setLocalDescription(answer);
        this.messageSend({
          type:"answer",
          answer:answer,
          callee:obj.callee,
          caller:obj.caller
        })
      })
    }
    onAnswer(answer){
        rtcConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
    onCandidate(candidate) {
        rtcConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
    messageSend(obj){
      socket.emit('message', obj);
    }
    enableAudio(){
      if(this.state.voiceClass == "mute-audio"){
        this.setState({voiceClass:"audio-call"})
      }else{
        this.setState({voiceClass:"mute-audio"})
      }
      //this.enableAudioVideo();
      //stream.getVideoTracks()[0].enabled = this.setState.constraints.video;
      this.createOffer();
    } 
    videoCall(){
      if(this.state.videoClass == "stop-video"){
        this.setState({videoClass:"video-call"})
      }else{
        this.setState({videoClass:"stop-video"})
      }
      console.log("=====stream====",stream);
      //this.enableAudioVideo();
      //stream.getAudioTracks()[0].enabled = this.setState.constraints.audio;
      this.createOffer();
    }
    enableAudioVideo(){
      this.setState({constraints:{video:true,audio:true}});
      if(this.state.videoClass == "stop-video"){
        this.setState({constraints:{video:false,audio:true}});
      }
      if(this.state.voiceClass == "mute-audio"){
        this.setState({constraints:{video:true,audio:false}});
      }
      if(this.state.videoClass == "stop-video" && this.state.voiceClass == "mute-audio"){
        this.setState({constraints:{video:false,audio:false}});
      }
      if(!this.state.constraints.audio){
        stream.removeTrack(stream.getAudioTracks()[0]);
      }
      if(!this.setState.constraints.video){
        stream.removeTrack(stream.getVideoTracks()[0]);
      }
      
      
      //stream.getAudioTracks()[0].enabled = this.state.constraints.audio;
      //stream.getVideoTracks()[0].enabled = this.setState.constraints.video;
      
    }
    closeConnection(){
      rtcConnection.close();
      rtcConnection.onicecandidate = null;
      rtcConnection.onaddstream = null;
      this.setState({remoteStreamSrc:null});
      this.messageSend({
          type:"leave",
          callee:callee,
          caller:caller
      })
      caller = null;
    }
    onLeave(){
      console.log("=======call here leave ==========");
      callee = null;
      rtcConnection.close();
      rtcConnection.onicecandidate = null;
      rtcConnection.onaddstream = null;
      this.setState({remoteStreamSrc:null});
      this.setState({voiceClass:"mute-audio"});
      this.setState({videoClass:"stop-video"});
      //this.startConnection();
      this.setupPeerConnection(stream);
      this.setState({enableVideoCall:false});
    }
   
    render() {
        return (
          <div className='canvas_outer'>
                <div className='video-audio'><span className="conference-call" title="Audio/Video call" onClick={this.audioVideoCall.bind(this)}></span></div>
                {this.state.showVideoAudio ?
                  <div className='video-display'>
                    {this.state.enableVideoCall ?
                      <div className='video-audio-icons'><span className={this.state.voiceClass} title="Voice Call" onClick={this.enableAudio.bind(this)}></span><span className={this.state.videoClass} title="Video Call" onClick={this.videoCall.bind(this)}></span></div>
                    : ""}
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