import styled from "styled-components";
import Header from "./header";
import { ModalType } from "../../store/modalSlice";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 300px;

  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.mainColor};

  left: 30%;
  top: 30%;
`;

const Content = styled.div`
  padding: 10px;
`;

function Wrapper({
  children,
  type,
}: {
  children: React.ReactNode;
  type: ModalType;
}) {
  return (
    <Container className="cursor">
      <Header type={type} />
      <Content>{children}</Content>
    </Container>
  );
}

export default Wrapper;
