import { FC, useCallback, useEffect, useState } from "react";
import { PopupComponent } from ".";
import { useAppDispatch } from "../../store/hooks";
import {
  Description,
  MarkContainer,
  Title,
  ToastContent,
  ToastWrapper,
} from "./styles";
import { closePopup, ResultType } from "../../store/popupSlice";
import SuccessImage from "../../assets/icons/success";
import FailImage from "../../assets/icons/fail";

const marks: Record<ResultType, FC<React.SVGProps<SVGSVGElement>>> = {
  success: SuccessImage,
  fail: FailImage,
};
// TODO: success and fail colors
function Toast({ text, id, result = "success", sound }: PopupComponent) {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (sound) {
      sound();
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => dispatch(closePopup(id)), 400);
  }, [dispatch, id]);

  useEffect(() => {
    const autoClose = setTimeout(handleClose, 5000);
    return () => clearTimeout(autoClose);
  }, [dispatch, handleClose, id]);

  const Mark = marks[result];

  return (
    <ToastWrapper
      className="cursor-pointer"
      onClick={handleClose}
      isVisible={isVisible}
    >
      <MarkContainer>
        <Mark fill={result === "success" ? "green" : "red"} />
      </MarkContainer>
      <ToastContent>
        <Title>{result.charAt(0).toUpperCase() + result.slice(1)}</Title>
        <Description>{text}</Description>
      </ToastContent>
    </ToastWrapper>
  );
}

export default Toast;
