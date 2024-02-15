import * as React from 'react';

import { visuallyHidden } from '@mui/utils';
import TableHead from '@mui/material/TableHead';
import { Box, TableCell, TableRow } from '@mui/material';
import { TableHeadProps } from './tableHead.types'; 
import { SortTable } from '../../atoms/sortTable.atoms';




 




 export function TableHeadUI(props: TableHeadProps) {
    const { order, orderBy,headCells } = props;
    

    return (
      <TableHead>
        <TableRow>
  
          {headCells.map((headCell) => 
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === +headCell.id ? order : false}
            >
           
                <SortTable {...props} headCell={headCell}>
                  <>
                  
                {headCell.label}
                {orderBy === +headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
                </>
                
                </SortTable>
          
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  }
