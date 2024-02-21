import { HeadCell } from "../../pages/users/users.types";

type Order = 'asc' | 'desc';


export interface TableHeadProps {
    order: Order;
    orderBy: number;
    headCells:readonly HeadCell[];
    setOrderBy: React.Dispatch<React.SetStateAction<number>>;
    setOrder:  React.Dispatch<React.SetStateAction<Order>>;
  }