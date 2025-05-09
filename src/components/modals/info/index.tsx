import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";

function InfoModal({ modal }: { modal?: Modal }) {
  return <Wrapper modal={modal}>Test Info Modal</Wrapper>;
}

export default InfoModal;
