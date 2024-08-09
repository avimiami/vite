//import { useMemo } from 'react';
import React, { useMemo, useState, useEffect } from 'react';
//import { Box, TextField  } from '@mui/material';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

// Define the card component for expanded row
const ExpandedRowContent = ({ row }) => {
    const { name, address, city, state, age, wealth } = row.original;
  
    return (
      <Card sx={{ margin: '1rem', padding: '1rem' }}>
        <CardContent>
          <Typography variant="h6">{`${name.firstName} ${name.lastName}`}</Typography>
          <Typography variant="body1">{`Address: ${address}`}</Typography>
          <Typography variant="body1">{`City: ${city}`}</Typography>
          <Typography variant="body1">{`State: ${state}`}</Typography>
          <Typography variant="body1">{`Age: ${age}`}</Typography>
          <Typography variant="body1">{`Wealth: ${wealth.toLocaleString('en-US')}`}</Typography>
        </CardContent>
      </Card>
    );
  };


const MyTable  = () => {
  //should be memoized or stable
  const [data, setData] = useState([]);
//   const [expanded, setExpanded] = useState({}); // Manage expanded rows
    const [expandedData, setExpandedData] = useState({});

  // Fetch data from the JSON file when the component mounts
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData); // Initialize filteredData with the fetched data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    fetch('/data_expand_row.json')
      .then((response) => response.json())
      .then((jsonData) => {
        const dataMap = jsonData.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
        setExpandedData(dataMap);
      })
      .catch((error) => console.error('Error fetching expanded data:', error));
  }, []);


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor: cell.getValue() === 'Doe' ? theme.palette.primary.main : theme.palette.secondary.main,
              borderRadius: '0.25rem',
              color: '#fff',
              p: '0.25rem 0.5rem', // Add padding
              display: 'inline-block', // Ensure it's not stretched out
            })}
          >
            {cell.getValue()}
          </Box>
        ),
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
        filterVariant : 'select',
      },

    {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
        filterFn: 'between',
        size: 80,
      },
      
      {
        accessorKey: 'wealth',
        header: 'Wealth',
        size : 100,
        // Cell: ({ cell }) => (
        //     cell.getValue<number>().toLocaleString('en-US')
        //   ),
        filterVariant: 'range-slider',
        muiFilterSliderProps: {
            marks: true,
            max: 150_000, // Custom max value for the slider
            min: 100_000,   // Custom min value for the slider
            step: 5_000,  // Step increment for the slider
            valueLabelFormat: (value) => value.toLocaleString('en-US'), // Format value without currency symbol
            //value: [5_000, 150_000], // Default range for the slider
          },
      }
      

    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableFacetedValues: true,
    initialState: {
      expanded: { 0: true },
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    //initialState: { expanded: { 0: true } }, // Optionally set initial expanded rows
    muiTableBodyRowProps: {
      sx: {
        '.Mui-TableBodyCell-DetailPanel': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
        },
      },
    },
//     renderDetailPanel: ({ row }) => (
//       <Card sx={{ margin: '1rem', padding: '1rem' }}>
//         <CardContent>
//           <Typography variant="h6">{`${row.original.name.firstName} ${row.original.name.lastName}`}</Typography>
//           <Typography variant="body1">{`Address: ${row.original.address}`}</Typography>
//           <Typography variant="body1">{`City: ${row.original.city}`}</Typography>
//           <Typography variant="body1">{`State: ${row.original.state}`}</Typography>
//           <Typography variant="body1">{`Age: ${row.original.age}`}</Typography>
//           <Typography variant="body1">{`Wealth: ${row.original.wealth.toLocaleString('en-US')}`}</Typography>
//         </CardContent>
//       </Card>
//     ),
//   });
    renderDetailPanel: ({ row }) => {
        const rowData = expandedData[row.original.id] || {};
        return (
        <Card sx={{ margin: 2 }}>
            <CardContent>
            <Typography variant="h6">Description</Typography>
            <Typography paragraph>{rowData.description}</Typography>
            <Typography variant="h6">Favorite Quote</Typography>
            <Typography paragraph>"{rowData.favoriteQuote}"</Typography>
            </CardContent>
        </Card>
        );
    },
    });

    return <MaterialReactTable table={table} />;
//   return (
//     <div style={{ width: '4000', overflowX: 'auto' }}>
//       <MaterialReactTable table={table} />
//     </div>
//   );
};

export default MyTable ;
