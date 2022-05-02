import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  background-color: #171616;
`;

export const SignUpBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LoginInputText = styled.input`
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

export const LoginSubmit = styled.input`
  margin-top: 10px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  background: #ffbb00;
  color: #00000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    border : 1px solid #fff;
    transition: all 0.2s ease-in-out;
    background: #7600ff;
    color: #000000;
  }
`;

export const LoginButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoginForm = styled.div`
  background-color: #7600ff;
  padding: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  &:hover {
    background: #7600ff;
  }
`;

export const LoginError = styled.div`
  color: red;
  font-size: 12px;
`;

export const LoginTitle = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
`;

export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px;
`;
