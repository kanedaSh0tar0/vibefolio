import styled from "styled-components";
import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { data } from "./data";
import Company from "./company";

const Container = styled.div`
  padding: 0.5rem;
`;

function Experience({ modal }: { modal: Modal }) {
  return (
    <Wrapper modal={modal}>
      <Container>
        {data.map((company) => (
          <Company key={company.company} company={company} />
        ))}
      </Container>
    </Wrapper>
  );
}

export default Experience;
