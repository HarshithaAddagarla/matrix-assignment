import React, { useState } from 'react';
import './App.css';

const Matrix = () => {
  const [matrix, setMatrix] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill('white'))
  );
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    if (matrix[row][col] === 'green' || matrix[row][col] === 'orange') return;

    const newMatrix = matrix.map((r, i) =>
      r.map((box, j) => (i === row && j === col ? 'green' : box))
    );

    setMatrix(newMatrix);
    setClickOrder([...clickOrder, { row, col }]);
    if (clickOrder.length === 8) {
      triggerOrangeSequence([...clickOrder, { row, col }]);
    }
  };

  const triggerOrangeSequence = (order) => {
    order.forEach((box, index) => {
      setTimeout(() => {
        setMatrix((prevMatrix) =>
          prevMatrix.map((r, i) =>
            r.map((color, j) =>
              i === box.row && j === box.col ? 'orange' : color
            )
          )
        );
      }, index * 500);
    });
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((box, colIndex) => (
            <div
              key={colIndex}
              className="box"
              style={{ backgroundColor: box }}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;

