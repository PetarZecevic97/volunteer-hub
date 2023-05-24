import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 500px;
  height: auto;
  min-height: 200px;
  justify-content: center;
  align-items: center;
`;
export const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CheckBoxContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  max-width: 100%;
  grid-template-columns: auto auto auto;
  justify-content: center;
`;

export const StyledCheckMark = styled.span`

`;

export const StyledCheckBoxContainer = styled.span`

`;

export const StyledCheckBox = styled.input`

  
`;
export const StyledRadioBox = styled.div`
  display: flex;
  flex: 1 1 20px;
  min-height: 60px;
  min-width: 120px;
  padding-left: 35px;
  padding-bottom: 1px;
  padding-top: 10px;
  margin: 9px;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const DebugContainer = styled.div`
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  background-color: #171616;
`;

export const SignUpBtn = styled.input`
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  background: #ffbb00;
  color: #000000;
  outline: none;
  border: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    border: 1px solid #fff;
    transition: all 0.2s ease-in-out;
    background: #7600ff;
    color: #000000;
  }
`;

export const DebugInputText = styled.input`
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

export const DebugSubmit = styled.input`
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  background: #ffbb00;
  color: #000000;
  font-size: 18px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    border: 1px solid #fff;
    transition: all 0.2s ease-in-out;
    background: #7600ff;
    color: #000000;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const DebugForm = styled.div`
  background-color: #7600ff;
  padding: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;

  &:hover {
    background: #7600ff;
  }
`;

export const DebugError = styled.div`
  color: red;
  font-size: 12px;
`;

export const DebugTitle = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
`;

export const DebugInputContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px;
`;
