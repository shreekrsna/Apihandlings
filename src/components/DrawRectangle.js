import React, { useRef, useState } from 'react';
 
import { about02 } from '../asset';
const DrawRectangle = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [rectangles, setRectangles] = useState([]);
  const [startCoordinates, setStartCoordinates] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStartCoordinates({ x: offsetX, y: offsetY });
    setDrawing(true);
    setRectangles([...rectangles, { start: { x: offsetX, y: offsetY }, end: { x: offsetX, y: offsetY } }]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const width = offsetX - startCoordinates.x;
    const height = offsetY - startCoordinates.y;

    const updatedRectangles = [...rectangles];
    const currentRect = updatedRectangles.pop(); // Get the last drawn rectangle
    updatedRectangles.push({
      ...currentRect,
      end: { x: offsetX, y: offsetY },
    });
    setRectangles(updatedRectangles);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const clearRectangles = () => {
    setRectangles([]);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Display image */}
      <img
        src={about02} // replace with the actual path to your image
        alt="Your Image"
        style={{ width: '800px', height: '600px' }}
      />

      {/* Canvas for drawing rectangles */}
      <canvas
        ref={canvasRef}
        width={800} // Set your canvas width
        height={600} // Set your canvas height
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          border: '1px solid #000',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />

      {/* Display all rectangles and their coordinates on the canvas */}
      {rectangles.map((rect, index) => (
        <div key={index}>
          <div
            style={{
              position: 'absolute',
              left: rect.start.x,
              top: rect.start.y,
              width: rect.end.x - rect.start.x,
              height: rect.end.y - rect.start.y,
              border: '2px solid red',
              pointerEvents: 'none', // Allow clicking through the rectangles to the canvas
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: rect.start.x,
              top: rect.start.y - 20,
              color: 'blue',
              pointerEvents: 'none',
            }}
          >
            {`Start: (${rect.start.x}, ${rect.start.y})`}
          </div>
          <div
            style={{
              position: 'absolute',
              left: rect.end.x,
              top: rect.end.y,
              color: 'blue',
              pointerEvents: 'none',
            }}
          >
            {`End: (${rect.end.x}, ${rect.end.y})`}
          </div>
        </div>
      ))}
      <button onClick={clearRectangles}>Clear Rectangles</button>
    </div>
  );
};

export default DrawRectangle;
