import { User,Cv, Project, Department } from "cv-graphql";
import { HeadCell, Data } from "../../pages/users/users.types";
export interface TableProps { 
  data:  User[]|Cv[] |Project[] |Department[]| [] ;
  loading: boolean;
  headCells: readonly HeadCell[];
  rows: Data[] | [];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  TableDdialogButton:(props:{selected:number | null})=>JSX.Element
}
