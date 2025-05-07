import styled from "styled-components";
import Close from "../../assets/icons/close";
import { useAppDispatch } from "../../store/hooks";
import { closeAllModals } from "../../store/modalSlice";

const Container = styled.header`
  height: 40px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.thirdColor};
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
`;

const NavItem = styled.li`
  font-weight: 800;
`;

function Header() {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <NavContainer>
        <NavList>
          <NavItem
            className="cursor-pointer"
            onClick={() => console.log("CLICK")}
          >
            Home
          </NavItem>
          <NavItem className="cursor-pointer">About</NavItem>
          <NavItem className="cursor-pointer">Contact</NavItem>
        </NavList>

        <Close onClick={() => dispatch(closeAllModals())} />
      </NavContainer>
    </Container>
  );
}

export default Header;
