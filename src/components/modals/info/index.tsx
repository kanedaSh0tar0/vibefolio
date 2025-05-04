import { ModalType } from "../../../store/modalSlice";
import Wrapper from "../wrapper";

function InfoModal({ type }: { type: ModalType }) {
  return <Wrapper type={type}>Test Info Modal</Wrapper>;
}

export default InfoModal;
