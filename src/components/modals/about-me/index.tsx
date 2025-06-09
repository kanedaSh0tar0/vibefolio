import styled from "styled-components";
import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";

const Content = styled.div`
  padding: 0.5rem;
`;

function AboutMe({ modal }: { modal: Modal }) {
  return (
    <Wrapper modal={modal}>
      <Content>
        <h2>Hey there! I’m Mykyta.</h2>
        <p>
          Front-end developer with two years of experience in a dynamic
          environment as a shadow coder. Throughout my career, I have often
          taken on new projects received tasks outside of my area of expertise,
          and quickly learned new technologies and frameworks. It will not be a
          problem for me to switch to working with other technologies.
        </p>
        <p>
          I have a great desire to develop in different directions besides the
          front-end and React environment.
        </p>
      </Content>
    </Wrapper>
  );
}

export default AboutMe;
