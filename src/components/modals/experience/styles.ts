import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap-y: 5px;

  margin-bottom: 10px;
`;

export const CompanyName = styled.a`
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

export const Button = styled.button`
  position: relative;
  min-width: 24px;
  min-height: 48px;
  height: 100%;
  width: auto;
  z-index: 2;
  transition: linear 0.1s;

  svg {
    height: 100%;
    width: auto;
    transition: linear 0.1s;
  }

  &:hover::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 2px solid ${({ theme }) => theme.secondColor};
  }

  &:hover:not([disabled]) {
    svg {
      fill: ${({ theme }) => theme.secondColor};
    }
  }
`;

export const Project = styled.div`
  width: 100%;
  height: 100%;
`;

export const ProjectTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items; center;
  height: 80px;
`;

export const ProjectTitleInfoCarouselContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const ProjectTitleInfoCarousel = styled.div`
  position: relative;
  display: flex;
  transition: linear 0.3s;
`;

export const ProjectTitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  min-width: 100%;
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProjectTitle = styled.span`
  font-weight: 600;
`;

export const ProjectTechnologies = styled.span`
  font-style: italic;
`;

export const ProjectListContainer = styled.div`
  position: relative;
`;

export const ProjectList = styled.ul<{ isVisible: boolean }>`
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

export const ProjectItem = styled.li`
  margin-bottom: 4px;

  &:last-child {
    margin: 0;
  }

  &::marker {
    color: ${({ theme }) => theme.secondColor};
  }
`;
