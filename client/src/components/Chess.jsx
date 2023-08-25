import React, { useState } from "react";

function Chess() {
  const [selectedCell, setSelectedCell] = useState(null);
  const generateGrid = () => {
    // initialize empty grid for adding the rows and columns
    const grid = [];
    for (let row = 0; row < 8; row++) {
      // initialize empty grid for adding cells of the row
      const rowCells = [];
      for (let col = 0; col < 8; col++) {
        // validation for the black cell
        const isBlack = (row + col) % 2 === 0;
        // adding cell properties
        const cellStyle = {
          backgroundColor: isBlack ? "black" : "white",
          width: "50px",
          height: "50px",
          border: "1px solid black",
        };

        // comparing which cell is selected with div key and changing background color to red.
        if (selectedCell === `${row}-${col}`) {
          cellStyle.backgroundColor = "red";
        }

        // adding properties to cells
        rowCells.push(
          <div
            key={`${row}-${col}`}
            style={cellStyle}
            onClick={() => setSelectedCell(`${row}-${col}`)}
          />
        );
      }

      // adding properties to rows
      grid.push(
        <div key={row} style={{ display: "flex" }}>
          {rowCells}
        </div>
      );
    }
    // returning the created grid
    return grid;
  };

  // returning the computed jsx for the chess board by calling generatedGrid function
  return <div className="App">{generateGrid()}</div>;
}

export default Chess;
