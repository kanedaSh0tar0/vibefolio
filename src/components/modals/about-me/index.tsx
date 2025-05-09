import styled from "styled-components";
import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";

const Content = styled.div`
  padding: 10px;
`;

function AboutMe({ modal }: { modal?: Modal }) {
  return (
    <Wrapper modal={modal}>
      <Content>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt sint
        aperiam blanditiis molestias fugiat aliquid delectus in! Asperiores
        maxime natus adipisci, explicabo, assumenda, aut nesciunt tempora vel
        quis officia cum. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Nesciunt sint aperiam blanditiis molestias fugiat aliquid delectus
        in! Asperiores maxime natus adipisci, explicabo, assumenda, aut nesciunt
        tempora vel quis officia cum. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Nesciunt sint aperiam blanditiis molestias fugiat
        aliquid delectus in! Asperiores maxime natus adipisci, explicabo,
        assumenda, aut nesciunt tempora vel quis officia cum.
      </Content>
    </Wrapper>
  );
}

export default AboutMe;
