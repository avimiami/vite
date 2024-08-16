
import React from 'react';

const RowSelectionDisplay = ({ rowSelection }) => {
  // Convert the rowSelection object keys to an array of selected row IDs
  const selectedRowIds = Object.keys(rowSelection);

  return (
    <div>
      <h3>Selected Row IDs:</h3>
      {selectedRowIds.length > 0 ? (
        <ul>
          {selectedRowIds.map(id => (
            <li key={id}>Row {id} is selected</li>
          ))}
        </ul>
      ) : (
        <p>No rows selected</p>
      )}
    </div>
  );
};

export default RowSelectionDisplay;
