import styled from "styled-components";

export const InnerWrapper = styled.div`
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
`;

export const SkillContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
`;

export const IconText = styled.span`
  font-family: "Segoe UI", sans-serif;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.pallet.textColor};
  text-align: center;
  user-select: none;
`;
