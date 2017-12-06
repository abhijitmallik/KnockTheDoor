
import React,{Component} from 'react';
import './whiteBoardComponent.css';

let lastX;
let lastY;
export default class WhiteBoardComponent extends Component{
  constructor(props){
       super(props);
       this.state = {isPainting:false};
  }
  componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        
    }
    startWriting(e){
      this.setState({isPainting:true}); 
      console.log("=======e=========",e.currentTarget);
      this.refs.canvas.fillStyle = "#ffffff";
      lastX = e.target.pageX - e.target.offsetLeft;
      lastY = e.pageY - this.offsetTop;
    }
    mouseUp(e){
      this.setState({isPainting:false}); 
      console.log("===============mouse up=========",e.currentTarget);
    }
    mouseMove(e){
      console.log("===============mouse move=========",e.currentTarget);
      if(this.state.isPainting) {
        let ctx = this.refs.canvas;
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        // find all points between        
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

        let lineThickness = 5 - Math.sqrt((x2 - x1) *(x2-x1) + (y2 - y1) * (y2-y1))/10;
        if(lineThickness < 1){
            lineThickness = 1;   
        }

        for (var x = x1; x < x2; x++) {
            if (steep) {
                ctx.fillRect(y, x, lineThickness , lineThickness );
            } else {
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