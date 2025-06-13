import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  // padding-left: 50px;
  // padding-top: 10px;
  // height: 50px;
`;

export const AsideButton = styled.button<{
  zIndex: number;
  isActive: boolean;
  backgroundColor: string;
}>`
  position: relative;
  // width: 120px;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  border: 2px solid ${({ theme }) => theme.pallet.textColor};
  border-bottom: ${({ backgroundColor }) => `0.15rem solid ${backgroundColor}`};
  border-top-left-radius: 4px;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  // margin-right: -32px;
  // transform: translateY(2px);

  z-index: ${({ zIndex, isActive }) => (isActive ? 10 : zIndex)};

  color: ${({ isActive }) => (isActive ? "var(--white-color)" : "inherit")};

  &:hover {
    color: var(--white-color);
  }
`;

export const Content = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || "var(--white-color)"};
  z-index: 100;
  border: 2px solid ${({ theme }) => theme.pallet.textColor};
  // border-top-left-radius: 10px;
  // border-top-right-radius: 10px;
  // border-bottom-left-radius: 0;
  // border-bottom-right-radius: 0;
  border-radius: 0.3rem;
  padding: 0.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 1.5rem;
  background-color: var(--white-color);
  border-radius: 0.2rem;
  font-weight: 600;
  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
  outline: none;
  padding: 1rem 0.5rem;

  &:disabled {
    color: gray;
    cursor: url("/vibefolio/cursor/Win95Stop.cur"), not-allowed;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  color: var(--white-color);

  span {
    display: inline-block;
    width: 5rem;
  }
`;

export const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  height: fit-content;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
  resize: none;
  outline: none;
  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Button = styled.button`
  width: fit-content;
  padding: 0.25rem;
  font-weight: 600;
  border-radius: 0.2rem;
  color: var(--white-color);
  box-shadow: 2px 2px 0px 1px rgba(0, 0, 0, 0.75);
`;

export const MailListContainer = styled.div`
  display: grid;
  // grid-template-columns: 150px 1fr;
  width: 100%;
  background-color: ${({ theme }) => theme.pallet.thirdColor};
  border-radius: 0.2rem;
`;

export const MailList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-right: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
`;

export const MailButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  width: 100%;
  height: min-content;
  line-height: 1.2;
  // padding: 4px 2px;
`;

export const MailName = styled.span`
  display: inline-block;
  font-weight: 900;

  max-width: 98%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;

export const MailTitle = styled.span`
  display: inline-block;
  font-weight: 600;
  font-family: "monospace";

  max-width: 98%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;

export const MailMessage = styled.span`
  display: inline-block;
  opacity: 0.7;

  max-width: 98%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;

export const MailContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
