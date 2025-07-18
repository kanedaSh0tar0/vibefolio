import Header from "./header";
import { Modal, bringToFront } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/hooks";
import { Container, Content, Ghost, InnerWrapper, Panel } from "./styles";
import ModalButton from "./panel-button";
import useModalPositioning from "./hooks/modal-positioning";
import useModalManagement from "./hooks/modal-management";

function Wrapper({
  children,
  modal,
  buttons,
}: {
  children: React.ReactNode;
  modal: Modal;
  buttons?: { Icon: React.ReactNode; onClick: () => void; key: string }[];
}) {
  const dispatch = useAppDispatch();
  const {
    handleMouseDown,
    handleClose,
    ghostPosition,
    coordinates,
    dragging,
    isClosing,
    convertedWidth,
    convertedHeight,
  } = useModalManagement(modal);
  useModalPositioning(modal);

  return (
    <>
      <Ghost
        className="cursor-move"
        $isVisible={!!dragging && !!ghostPosition}
        $position={ghostPosition}
        $dimensions={{
          width: convertedWidth,
          height: convertedHeight,
        }}
      />

      <Container
        $index={modal.index || 1}
        $isClosing={isClosing}
        $dimensions={{
          width: convertedWidth,
          height: convertedHeight,
        }}
        $position={coordinates}
        className="cursor"
        onMouseDown={() => dispatch(bringToFront(modal.type))}
      >
        <Header
          title={modal.title}
          handleClose={handleClose}
          handleDrag={handleMouseDown}
        />
        {buttons && (
          <Panel>
            {buttons.map(({ Icon, onClick, key }) => (
              <ModalButton Icon={Icon} onClick={onClick} key={key} />
            ))}
          </Panel>
        )}
        <Content title={modal.title}>
          <InnerWrapper>{children}</InnerWrapper>
        </Content>
      </Container>
    </>
  );
}

export default Wrapper;
