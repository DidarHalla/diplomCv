import { makeVar } from '@apollo/client';
import { User } from 'cv-graphql';

 function reactiveAuth() {
        
  const token$ = makeVar<string | null>('');
  const user$ = makeVar<null | User>(null);

  const deleteAuth=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token$(null);
    user$(null);
  }

  const setAuth = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)??"");
    token$(token);
    user$(user);
    return { token$, user$ };
  };

  const getAuth = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') ?? "null");
    token$(token);
    user$(user);
    return { token$, user$ };
  };

  return { setAuth, getAuth,deleteAuth };
}

export const authReactive = reactiveAuth()