export type Data ={id:string ,data:(string|JSX.Element)[]}
export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

export type CreateData = (
  id: string,
  name: string,
  calories: string,
  fat: string,
  carbs: string,
  protein: string
) => Data;
