import { User,Cv, Project, Department } from "cv-graphql";
import { Data } from "../../pages/users/users.types";


type Order = 'asc' | 'desc';

export interface TableBodyProps {
    selected: number|null
    setSelected: React.Dispatch<React.SetStateAction<number|null>>
    page: number
    rows: Data[] | []
    rowsPerPage: number
    order: Order
    orderBy: number
    search:string
    setAnchorPos:React.Dispatch<React.SetStateAction<{
        top: number;
        left: number;
    }>>
  data:  User[]|Cv[] |Project[] |Department[]| [] ;

}