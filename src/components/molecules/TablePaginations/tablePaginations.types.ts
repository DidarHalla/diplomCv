import { Data } from "../../pages/users/users.types";
export interface TablePaginationsProps{
    page: number;
    rowsPerPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    rows: Data[] | undefined;
}