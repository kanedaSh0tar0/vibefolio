import styled from "styled-components";
import Chevron from "../../../assets/icons/chevron";
import { ExperienceDataType } from "./data";
import { useEffect, useRef, useState } from "react";

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap-y: 5px;

  margin-bottom: 10px;
`;

const CompanyName = styled.a`
  color: blue;
  text-decoration: underline;
  font-size: 18px;

  &:link {
    color: blue;
    text-decoration: underline;
  }

  &:visited {
    color: purple;
    text-decoration: underline;
  }

  &:hover {
    color: darkblue;
    text-decoration: underline;
  }

  &:active {
    color: red;
    text-decoration: underline;
  }
`;

const Button = styled.button`
  min-width: 24px;
  min-height: 48px;
  height: 100%;
  width: auto;
  z-index: 2;

  svg {
    height: 100%;
    width: auto;
    transition: linear 0.1s;
  }

  &:hover:not([disabled]) {
    svg {
      fill: ${({ theme }) => theme.secondColor};
    }
  }
`;

const Project = styled.div`
  width: 100%;
  height: 100%;
`;

const ProjectTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items; center;
  height: 80px;
`;

const ProjectTitleInfoCarouselContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const ProjectTitleInfoCarousel = styled.div`
  position: relative;
  display: flex;
  transition: linear 0.3s;
`;

const ProjectTitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  min-width: 100%;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.span`
  font-weight: 600;
`;

const ProjectTechnologies = styled.span`
  font-style: italic;
`;

const ProjectListContainer = styled.div`
  position: relative;
`;

const ProjectList = styled.ul<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding-top: 16px;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition: opacity 0.4s ease-in-out, visibility 0.3s ease-in-out;
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
`;

const ProjectItem = styled.li`
  margin-bottom: 4px;

  &:last-child {
    margin: 0;
  }

  &::marker {
    color: ${({ theme }) => theme.secondColor};
  }
`;

function Company({ company }: { company: ExperienceDataType }) {
  const { company: companyName, lengthOfService, position, projects } = company;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeListRef = useRef<HTMLUListElement>(null);
  const [listHeight, setListHeight] = useState(0);
  const prevDisabled = currentProjectIndex === 0;
  const nextDisabled = currentProjectIndex === projects.length - 1;

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      const title = carousel.children[0];
      carousel.style.left = `-${title.clientWidth * currentProjectIndex}px`;
    }

    if (activeListRef.current) {
      setListHeight(activeListRef.current.scrollHeight);
    }
  }, [currentProjectIndex]);

  const handleChangeProject = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentProjectIndex((prev) =>
        projects.length - 1 === prev ? prev : prev + 1
      );
    }

    if (direction === "prev") {
      setCurrentProjectIndex((prev) => (prev === 0 ? prev : prev - 1));
    }
  };

  return (
    <>
      <Title>
        <span>
          <CompanyName
            className="cursor-pointer"
            target="_blank"
            href="https://incora.software/"
          >
            {companyName}
          </CompanyName>{" "}
          · {lengthOfService}
        </span>
        <span>{position}</span>
      </Title>

      <Project>
        <ProjectInfo>
          <ProjectTitleContainer>
            <Button
              onClick={() => handleChangeProject("prev")}
              disabled={prevDisabled}
              className={prevDisabled ? "not-allowed" : "cursor-pointer"}
            >
              <Chevron style={{ transform: "rotate(180deg)" }} />
            </Button>
            <ProjectTitleInfoCarouselContainer>
              <ProjectTitleInfoCarousel ref={carouselRef}>
                {projects.map((project) => (
                  <ProjectTitleInfo key={project.name}>
                    <ProjectTitle>{project.name}</ProjectTitle>
                    <ProjectTechnologies>
                      {project.technologies}
                    </ProjectTechnologies>
                  </ProjectTitleInfo>
                ))}
              </ProjectTitleInfoCarousel>
            </ProjectTitleInfoCarouselContainer>
            <Button
              onClick={() => handleChangeProject("next")}
              disabled={nextDisabled}
              className={nextDisabled ? "not-allowed" : "cursor-pointer"}
            >
              <Chevron />
            </Button>
          </ProjectTitleContainer>

          <ProjectListContainer style={{ height: listHeight }}>
            {projects.map((project, index) => (
              <ProjectList
                key={project.name}
                isVisible={index === currentProjectIndex}
                ref={index === currentProjectIndex ? activeListRef : null}
              >
                {project.features.map((feature) => (
                  <ProjectItem key={feature}>{feature}</ProjectItem>
                ))}
              </ProjectList>
            ))}
          </ProjectListContainer>
        </ProjectInfo>
      </Project>
    </>
  );
}

export default Company;
