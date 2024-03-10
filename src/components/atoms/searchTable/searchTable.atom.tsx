import * as React from 'react';
import TextField from '@mui/material/TextField';


interface SearchTableProps{
    search:string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

function debounce<T extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>(func:(event:T)=>void, timeout:number){
    let timer:ReturnType<typeof setTimeout>|undefined;
    return (even:T) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func(even); }, timeout);
      
    };
  }
  

export  function SearchTable(prop:SearchTableProps) {
const {setSearch}=prop

function saveInput(even:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setSearch(even.target.value)
    
}
    
  return (
  
        <TextField type='search' label="Search" onChange={ debounce((even) => saveInput(even),800)} />

  );
}
