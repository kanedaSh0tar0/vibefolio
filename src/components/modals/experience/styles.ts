import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem 0;
  margin-bottom: 0.5rem;
`;

export const CompanyName = styled.a`
  color: blue;
  text-decoration: underline;

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

export const LengthOfService = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
`;

export const Position = styled.span`
  font-size: 0.8rem;
`;

export const Button = styled.button`
  position: relative;
  height: 100%;
  width: auto;
  z-index: 2;

  svg {
    height: 100%;
    width: auto;
  }

  &:hover:not([disabled]) {
    svg {
      fill: ${({ theme }) => theme.pallet.secondColor};
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
  height: 5rem;
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
  align-items: center;
  transition: linear 0.3s;
  width: 100%;
`;

export const ProjectTitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  min-width: 100%;
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProjectTitle = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
`;

export const ProjectTechnologies = styled.span`
  font-style: italic;
  font-size: 0.7rem;
`;

export const ProjectListContainer = styled.div`
  position: relative;
  font-size: 0.8rem;
`;

export const ProjectList = styled.ul<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding-top: 0.8rem;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  transition: opacity 0.4s ease-in-out, visibility 0.3s ease-in-out;
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
`;

export const ProjectItem = styled.li`
  margin-bottom: 0.2rem;

  &:last-child {
    margin: 0;
  }

  &::marker {
    color: ${({ theme }) => theme.pallet.secondColor};
  }
`;
