import styled from "styled-components";
import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { data } from "./data";
import Company from "./company";

const Container = styled.div`
  padding: 10px;
`;

function Experience({ modal }: { modal: Modal }) {
  return (
    <Wrapper modal={modal}>
      <Container>
        {data.map((company) => (
          <Company company={company} />
        ))}
      </Container>
    </Wrapper>
  );
}

export default Experience;
