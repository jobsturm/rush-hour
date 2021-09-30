import { Component } from 'preact';
import Block from './block';

class GameBoard extends Component {
    constructor() {
      super();
    }

    render(props) {
      return (
        <section class="blocks">
          {props.blocks.map((blockData, index) => (
            <Block
              handleMouseDown={props.setActiveBlock.bind(this)}
              handleMouseUp={props.setActiveBlock.bind(this)}
              {...{
                  ...blockData,
                  ...{ index: index }
              }}
            />
          ))}
        </section>
      );
    }
  }
  
  export default GameBoard;