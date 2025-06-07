import { useTheme } from "styled-components";
import { Modal } from "../../../store/modalSlice";
import { CircularProgressIcon } from "../../circular-progress";
import Wrapper from "../wrapper";
import IconText from "../../icon-text";
import Typescript from "../../../assets/skills-icons/typescript";
import Javascript from "../../../assets/skills-icons/javascript";
import React from "../../../assets/skills-icons/react";
import Threejs from "../../../assets/skills-icons/threejs";
import Nodejs from "../../../assets/skills-icons/nodejs";
import { InnerWrapper, SkillContainer } from "./styles";

function Skills({ modal }: { modal: Modal }) {
  const theme = useTheme();

  return (
    <Wrapper modal={modal}>
      <InnerWrapper>
        <SkillContainer>
          <CircularProgressIcon progress={80} Icon={<Javascript />} />
          <IconText color={theme.pallet.textColor} size="medium" text="Javascript" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={60} Icon={<Typescript />} />
          <IconText color={theme.pallet.textColor} size="medium" text="Typescript" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={70} Icon={<React />} />
          <IconText color={theme.pallet.textColor} size="medium" text="React" />
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
          <IconText color={theme.pallet.textColor} size="medium" text="React Native" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={25} Icon={<Threejs />} />
          <IconText color={theme.pallet.textColor} size="medium" text="Three js" />
        </SkillContainer>
        <SkillContainer>
          <CircularProgressIcon progress={25} Icon={<Nodejs />} />
          <IconText color={theme.pallet.textColor} size="medium" text="Node js" />
        </SkillContainer>
      </InnerWrapper>
    </Wrapper>
  );
}

export default Skills;
