import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, Button, Paper } from '@mui/material';

const initialModulesData = [
  { id: 545, name: 'Sale', description: 'Lorem Ipsum dolor sit amet', premium: false, monthlyPrice: 0, yearlyPrice: 0 },
  { id: 546, name: 'CRM', description: 'Lorem Ipsum dolor sit amet', premium: false, monthlyPrice: 0, yearlyPrice: 0 },
  { id: 547, name: 'Accounting', description: 'Lorem Ipsum dolor sit amet', premium: false, monthlyPrice: 0, yearlyPrice: 0 },
];

const Modules = () => {
  const [modules, setModules] = useState(initialModulesData);


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Premium</TableCell>
            <TableCell>Monthly Price</TableCell>
            <TableCell>Yearly Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((module) => (
            <TableRow key={module.id}>
              <TableCell>{module.id}</TableCell>
              <TableCell>{module.name}</TableCell>
              <TableCell>{module.description}</TableCell>
              <TableCell>
                <Switch checked={module.premium}
                //  onChange={() => handlePremiumChange(module.id)} 
                 />
              </TableCell>
              <TableCell>{module.monthlyPrice}</TableCell>
              <TableCell>{module.yearlyPrice}</TableCell>
              <TableCell>
              <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginRight: '8px',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'darkred',
                    },
                  }}
                >
                  Delete
                </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Modules;
