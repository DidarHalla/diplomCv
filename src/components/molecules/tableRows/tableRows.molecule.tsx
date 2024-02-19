import { TableRow } from "@mui/material"
import { Data } from "../../pages/users/users.types"

interface TableRowsProps {
    setSelected:React.Dispatch<React.SetStateAction<number|null>>
    row:Data
    selected: number|null
    children:JSX.Element[]
    setAnchorPos:React.Dispatch<React.SetStateAction<{
        top: number;
        left: number;
    }>>
}
export const TableRowsMolecule = function ( prop:TableRowsProps){
    const {row,selected,setSelected,children,setAnchorPos}=prop

    const isSelected = (id: number) => selected === id;

    const isItemSelected = isSelected(+row.id);

    const handleClick = (even: React.MouseEvent<unknown>, id: number) => {
        setAnchorPos({top:even.clientY+5,left:even.clientX-100})
        setSelected(id!=selected?id:null);
        
    };
    return (

        <TableRow
            hover
            onClick={(event) => {
                return handleClick(event, +row.id)
            }}
            role="button"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
            
        >
            {children}
        </TableRow>
        
        )
}