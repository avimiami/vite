import { useState } from 'react'
import './App.css'
import MyTable from './MyTable';
import RowSelectionDisplay from './rowSelectionDisplay';
import ChartComponent from './ChartComponent';
// function App() {
//   return (
//     <>
//       <div className="container">
//       <h1>My Material React Table</h1>
//       <MyTable />
//     </div>

//     </>
//   )
// }

function App() {
  const [rowSelection, setRowSelection] = useState({}); // Lift the rowSelection state to App

  return (
    <>
      <div className="container flex-container">
        <div className="table-container">
          <h1>My Material React Table</h1>
          <MyTable onRowSelectionChange={setRowSelection} />
        </div>
        <div className="chart-container">
          <h2>Chart</h2>
          <ChartComponent />
        </div>
      </div>
      <div className="container row-selection-container">
        <h2>Selected Rows</h2>
        <RowSelectionDisplay rowSelection={rowSelection} />
      </div>
    </>
  );
}

export default App
