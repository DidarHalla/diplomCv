import { User } from "cv-graphql"
import { HeadCell ,Data} from "../../pages/users/users.types"
export interface TableProps {
    data: { users: [User] | [] },
    loading: boolean,
    headCells:readonly HeadCell[],
    rows:Data[] | []
}
