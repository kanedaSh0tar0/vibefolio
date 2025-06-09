import { FormEvent, useRef, useState } from "react";
import {
  Button,
  ButtonContainer,
  Form,
  Input,
  Label,
  LetterContainer,
  TextArea,
} from "./styles";
import Loader from "../../loader";
import emailjs from "@emailjs/browser";
import { useAppDispatch } from "../../../store/hooks";
import { showToast } from "../../../store/popupSlice";

function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;
    setIsSending(true);

    try {
      await emailjs.sendForm(
        "service_lm3u50h",
        "template_7vobhdn",
        form.current,
        {
          publicKey: "omhAz0lvyswze0XoT",
        }
      );

      dispatch(
        showToast("The letter has been sent. \nI will contact you soon 😊")
      );
    } catch (error) {
      console.error(error);
      dispatch(showToast("I apologize, something went wrong 😣", "fail"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Form ref={form} onSubmit={sendEmail}>
      {isSending && <Loader />}
      <LetterContainer>
        <Label>
          <span>From:</span>
          <Input type="email" name="email" required />
        </Label>
        <Label>
          <span>To:</span>
          <Input disabled type="email" name="fake_to" value="Me" />
        </Label>
        <Label>
          <span>Name:</span>
          <Input type="text" name="name" required />
        </Label>
      </LetterContainer>

      <LetterContainer style={{ flexGrow: 1 }}>
        <Input placeholder="Title" type="text" name="title" required />
        <TextArea placeholder="Message" name="message" required />
      </LetterContainer>

      <ButtonContainer>
        <Button className="cursor-pointer" type="submit">
          Send
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default ContactForm;
