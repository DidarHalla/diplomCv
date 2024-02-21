import TableSortLabel from '@mui/material/TableSortLabel';
import { HeadCell } from "../../pages/users/users.types";


type Order = 'asc' | 'desc';


interface SortTableProps {
    setOrder: React.Dispatch<React.SetStateAction<Order>>
        setOrderBy: React.Dispatch<React.SetStateAction<number>>
    orderBy: number
    order: Order
    headCell: HeadCell
    children: JSX.Element


}
export function SortTable(props: SortTableProps): JSX.Element {
    const { order, orderBy, setOrder, setOrderBy, headCell, children } = props
    const createSortHandler =
        (property: string) => (event: React.MouseEvent<unknown>) => {
            handleRequestSort(event, property);
        };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string,
    ) => {

        const isAsc = orderBy === +property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        
        setOrderBy(+property);
    };
    return (
        <TableSortLabel
            active={orderBy === +headCell.id}
            direction={orderBy === +headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
        >
            {children}
        </TableSortLabel>
    )

}