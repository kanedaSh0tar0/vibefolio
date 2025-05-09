import styled, { useTheme } from "styled-components";
import { Modal } from "../../../store/modalSlice";
import { CircularProgressIcon } from "../../circular-progress";
import Wrapper from "../wrapper";
import IconText from "../../icon-text";
import Typescript from "../../../assets/skills-icons/typescript";
import Javascript from "../../../assets/skills-icons/javascript";
import React from "../../../assets/skills-icons/react";
import Threejs from "../../../assets/skills-icons/threejs";
import Nodejs from "../../../assets/skills-icons/nodejs";

const InnerWrapper = styled.div`
  padding: 10px 20px;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
`;

const SkillContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

function Skills({ modal }: { modal: Modal }) {
  const theme = useTheme();

  return (
    <Wrapper modal={modal}>
      <InnerWrapper>
        <SkillContainer>
          <CircularProgressIcon progress={50} Icon={<Javascript />} />
          <IconText color={theme.textColor} size="medium" text="Javascript" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={75} Icon={<Typescript />} />
          <IconText color={theme.textColor} size="medium" text="Typescript" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={0} Icon={<React />} />
          <IconText color={theme.textColor} size="medium" text="React" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon
            progress={75}
            Icon={
              <div style={{ backgroundColor: "#00D8FF", padding: 1 }}>
                <React fill="white" />
              </div>
            }
          />
          <IconText color={theme.textColor} size="medium" text="React Native" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={25} Icon={<Threejs />} />
          <IconText color={theme.textColor} size="medium" text="Three js" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={100} Icon={<Nodejs />} />
          <IconText color={theme.textColor} size="medium" text="Node js" />
        </SkillContainer>
      </InnerWrapper>
    </Wrapper>
  );
}

export default Skills;
