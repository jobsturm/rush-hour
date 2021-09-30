import { Component } from 'preact';

class GameBoard extends Component {
    constructor() {
      super();
    }
    
    render(props) {
      const blockSize = window.innerWidth * 0.042;

      const style = {
        top: props.y * blockSize,
        left: props.x * blockSize,
        width: props.width * blockSize,
        height: props.height * blockSize,
        backgroundColor: props.color,
      }


      return (
        <button
          onMouseDown={() => props.handleMouseDown(props.index)}
          onMouseUp={() => props.handleMouseDown(null)}
          class="block"
          style={{...style}}
        ></button>
      );
    }
  }
  
  export default GameBoard;