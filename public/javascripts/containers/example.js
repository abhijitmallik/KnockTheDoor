
import React,{Component} from 'react';
import './whiteBoardComponent.css';

let lastX = 0;
let lastY = 0;
let lineThickness = 1;
let canvas;
let ctx;
export default class WhiteBoardComponent extends Component{
    constructor(props){
       super(props);
       this.state = {isPainting:false};
    }
    componentDidMount() {
       canvas = this.refs.canvas;
       ctx = canvas.getContext("2d");
       ctx.fillStyle = "#ffffff";
    }
    updateCanvas() {
        
    }
    startWriting(e){
      this.setState({isPainting:true}); 
      console.log("==========this.offsetLeft=====",this.offsetLeft);
      lastX = e.nativeEvent.offsetX - canvas.offsetLeft;
      lastY = e.nativeEvent.offsetY - canvas.offsetTop;
      console.log("========canvas=====",canvas);
      console.log("=======e.pageX======",e.nativeEvent.offsetX,"=====e.pageY===",e.nativeEvent.offsetY);
      console.log("========lastX======",lastX,"=====lastY====",lastY);
    }
    mouseUp(e){
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
                console.log("========y=====",y,"==========x=====",x);
                ctx.fillRect(y, x, lineThickness , lineThickness );
            } else {
                console.log("========x=====",x,"==========y=====",y);
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
    render() {
        return (
          <div className='canvas_outer'>
        <div className='canvas_inner'>
                   <canvas ref="canvas" className='canvas-component' onMouseUp={this.mouseUp.bind(this)} onMouseMove={this.mouseMove.bind(this)} onMouseDown={this.startWriting.bind(this)}/>
                </div>
                <button className="canvas_button" onClick={this.props.closeCanvasPopup}>close me</button>
            </div>   
        );
    }

} 