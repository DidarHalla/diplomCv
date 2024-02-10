import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(auth: { email: $email, password: $password }) {
      access_token
    }
  }
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLazyQuery(LOGIN);
const navigation=useNavigate()
  
  return (
    <>
      <form
        id="form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          login({variables: { email: email, password: password }, onCompleted(data) {
            localStorage.setItem("token", data.login.access_token);
            navigation("/users")
          }});
        

        

        
        }}
        style={{marginTop:20+"px"}}
      >
        <input
          name="email"
          type="email"
          placeholder="email"
          className="email"
          value={email}
          onChange={(ev) => {
            setEmail(ev.target.value);
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="password"
          value={password}
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
        />
        <button
          type="submit"
          // onClick={(e) => {
          //   e.preventDefault();
          // }}
        >
          Login
        </button>
      </form>
    </>
  );
};
