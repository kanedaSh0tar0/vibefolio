import Chevron from "../../../assets/icons/chevron";
import { ExperienceDataType } from "./data";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  CompanyName,
  LengthOfService,
  Position,
  Project,
  ProjectInfo,
  ProjectItem,
  ProjectList,
  ProjectListContainer,
  ProjectTechnologies,
  ProjectTitle,
  ProjectTitleContainer,
  ProjectTitleInfo,
  ProjectTitleInfoCarousel,
  ProjectTitleInfoCarouselContainer,
  Title,
} from "./styles";

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
          · <LengthOfService>{lengthOfService}</LengthOfService>
        </span>
        <Position>{position}</Position>
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
                $isVisible={index === currentProjectIndex}
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
