import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  padding-left: 50px;
  padding-top: 10px;
  height: 50px;
`;

export const AsideButton = styled.button<{
  zIndex: number;
  isActive: boolean;
  backgroundColor: string;
}>`
  position: relative;
  width: 120px;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  border: 2px solid black;
  border-bottom: ${({ backgroundColor }) => `2px solid ${backgroundColor}`};
  border-top-left-radius: 4px;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  margin-right: -32px;
  transform: translateY(2px);

  z-index: ${({ zIndex, isActive }) => (isActive ? 10 : zIndex)};

  &:hover {
    color: var(--white-color);
  }
`;

export const Content = styled.div<{ backgroundColor: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  z-index: 5;
  border: 2px solid black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  background-color: var(--white-color);
  border-radius: 4px;
  font-weight: 600;
  color: black;

  &:disabled {
    color: gray;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  color: var(--white-color);

  span {
    display: inline-block;
    width: 70px;
  }
`;

export const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: fit-content;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  resize: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Button = styled.button`
  width: fit-content;
  padding: 4px;
  border-radius: 4px;
  color: var(--white-color);
  box-shadow: 2px 2px 0px 1px rgba(0, 0, 0, 0.75);
`;
