import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";


export const PageContainer = styled.div`
  display: flex;
  color: #fff;
  font-size: 0.75rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  background-color: #171616;
`;

export const Grid = styled.div`
  color: #ffbb00;
  text-decoration: none;
  margin: 0 auto;
  padding: 0;
  height: 100%;
  cursor: pointer;
  display: grid;
  place-items: center;
  grid-template-areas: "inner-div";
  align-content: center;
  justify-items: left;
}
`;

export const TextRow = styled.p`
  color: #ffbb00;
  display: flex;
  cursor: pointer;
  margin: 0 auto;
  padding: 0;
`;

