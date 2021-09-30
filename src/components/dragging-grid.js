import { Component } from 'preact';

class GameBoard extends Component {
    constructor() {
      super();
    }
  
    render(props) {
      const className = `dragging-grid ${props.draggingBlock ? 'is-dragging' : ''}`;

      return (
        <section class={className}>
          {Array.from({ length: props.dimensions.height }, (_, y) => (
            <div class="row">
              {Array.from({ length: props.dimensions.width }, (_, x) => (
                <div
                  class="cell"
                  onMouseOver={() => props.setActiveCoordinates({ x, y })}
                  onMouseUp={() => props.setActiveBlock(null)}
                ></div>
              ))}
            </div>
          ))}
        </section>
      );
    }
  }
  
  export default GameBoard;