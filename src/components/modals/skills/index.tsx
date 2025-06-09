import { Modal } from "../../../store/modalSlice";
import { CircularProgressIcon } from "../../circular-progress";
import Wrapper from "../wrapper";
import Typescript from "../../../assets/skills-icons/typescript";
import Javascript from "../../../assets/skills-icons/javascript";
import React from "../../../assets/skills-icons/react";
import Threejs from "../../../assets/skills-icons/threejs";
import Nodejs from "../../../assets/skills-icons/nodejs";
import { InnerWrapper, SkillContainer, IconText } from "./styles";

function Skills({ modal }: { modal: Modal }) {
  return (
    <Wrapper modal={modal}>
      <InnerWrapper>
        <SkillContainer>
          <CircularProgressIcon progress={80} Icon={<Javascript />} />
          <IconText>Javascript</IconText>
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={60} Icon={<Typescript />} />
          <IconText>Typescript</IconText>
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={70} Icon={<React />} />
          <IconText>React</IconText>
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon
            progress={50}
            Icon={
              <div style={{ backgroundColor: "#00D8FF", padding: 1 }}>
                <React fill="white" />
              </div>
            }
          />
          <IconText>React Native</IconText>
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={25} Icon={<Threejs />} />
          <IconText>Three js</IconText>
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={25} Icon={<Nodejs />} />
          <IconText>Node js</IconText>
        </SkillContainer>
      </InnerWrapper>
    </Wrapper>
  );
}

export default Skills;
