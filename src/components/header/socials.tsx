import { SocialContainer } from "./styles";
import TelegramIcon from "../../assets/icons/telegram";
import GithubIcon from "../../assets/icons/github";
import LinkedinIcon from "../../assets/icons/linkedin";

function Socials() {
  return (
    <SocialContainer>
      <a href="https://t.me/Nik0o_o" target="_blank">
        <TelegramIcon width={25} height={25} className="cursor-pointer" />
      </a>
      <a href="https://github.com/kanedaSh0tar0" target="_blank">
        <GithubIcon width={25} height={25} className="cursor-pointer" />
      </a>
      <a
        href="https://www.linkedin.com/in/mykyta-antonov-246736354/"
        target="_blank"
      >
        <LinkedinIcon width={25} height={25} className="cursor-pointer" />
      </a>
    </SocialContainer>
  );
}

export default Socials;
