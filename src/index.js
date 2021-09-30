import cloneDeep from 'clone-deep';
import './style';
import GameBoard from './components/game-board';
import DraggingGrid from './components/dragging-grid';
import Blocks from './components/blocks';
import { Component } from 'preact';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dimensions: { width:  6, height: 6 },
      blocks: [
        { color: 'rgb(255, 0, 0)', width: 2, height: 1, x: 0, y: 2 },
        { color: 'rgb(0, 255, 0)', width: 1, height: 3, x: 2, y: 0 },
        { color: 'rgb(0, 255, 0)', width: 3, height: 1, x: 0, y: 3 },
        { color: 'rgb(0, 255, 0)', width: 1, height: 3, x: 5, y: 3 },
      ],
      activeBlockIndex: null,
    };

    document.documentElement.style.setProperty('--columns', this.state.dimensions.width);
    document.documentElement.style.setProperty('--rows', this.state.dimensions.height);  
  }

  getOccupyingCoordinates = ({ width, height, x, y }) => {
    const xAxis = Array.from({ length: width }, (u, index) => x + index);
    const yAxis = Array.from({ length: height }, (u, index) => y + index );
    return { xAxis, yAxis };
  }
  hasCollision = (block, index) => {
    const { xAxis, yAxis } = this.getOccupyingCoordinates(block);
    const collisionMap = this.state.blocks.map((block, index) => this.getOccupyingCoordinates(block));
    let collisionCount = 0;
    collisionMap.forEach((occupyingCoordinatesB, collisionIndex) => {
      if (index !== collisionIndex) {
        xAxis.forEach((x) => {
          occupyingCoordinatesB.xAxis.forEach(xB => {
            // Check for X matches
            if(x === xB) {
              // Check for Y match
              occupyingCoordinatesB.yAxis.forEach(y => {
                if (yAxis.includes(y)) collisionCount += 1;
              })
            }
          })
        });
      }
    });
    console.log(collisionCount);
    return (collisionCount > 0);
  }
  isOutOfBounds = block => {
    const { xAxis, yAxis } = this.getOccupyingCoordinates(block);
    return (xAxis.includes(this.state.dimensions.width) || yAxis.includes(this.state.dimensions.height));
  }

  setActiveBlock = index => this.setState(prev => ({ activeBlockIndex: prev.activeBlockIndex = index }));
  setActiveCoordinates = coords => {
    if (this.state.activeBlockIndex === null) return;
    const newState = cloneDeep(this.state);
    const { activeBlockIndex } = newState;
    let activeBlock = newState.blocks[activeBlockIndex];
    const allowedDirection = activeBlock.width > activeBlock.height ? 'x' : 'y';
    const setCoords = { x: activeBlock.x, y: activeBlock.y };
    setCoords[allowedDirection] = coords[allowedDirection];

    // Update coordinates of active block.
    newState.blocks[activeBlockIndex] = {
      ...newState.blocks[activeBlockIndex],
      ...setCoords,
    }
    
    activeBlock = newState.blocks[activeBlockIndex];

    if (this.hasCollision(activeBlock, this.state.activeBlockIndex)) return;
    // Checks if block move would be more than 1 step.
    if (Math.abs(
      this.state.blocks[activeBlockIndex][allowedDirection]
      - newState.blocks[activeBlockIndex][allowedDirection]
    ) > 1) return;
    // Checks if block is not out of bound
    if (this.isOutOfBounds(activeBlock)) return;

    this.setState(newState);
  }
	render() {
    let draggingBlock = this.state.activeBlockIndex !== null;
    return(
      <div class="hitbox-overlay">
        <main>
          <Blocks blocks={this.state.blocks} setActiveBlock={this.setActiveBlock}/>
          <DraggingGrid
            draggingBlock={draggingBlock}
            dimensions={this.state.dimensions}
            setActiveCoordinates={this.setActiveCoordinates}
            setActiveBlock={this.setActiveBlock}
          />
          <GameBoard dimensions={this.state.dimensions}/>
        </main>
      </div>
    )
  }
}

export default App;