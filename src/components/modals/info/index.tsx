import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";

function InfoModal({ modal }: { modal?: Modal }) {
  return (
    <Wrapper modal={modal} type="info">
      Test Info Modal
    </Wrapper>
  );
}

export default InfoModal;
