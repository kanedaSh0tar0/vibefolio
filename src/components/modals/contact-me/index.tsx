import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { Container, Content } from "./styles";
import ContactForm from "./contact-form";
// import MailsList from "./mails-list";

// const tabs = [
//   { name: "Contact Me", color: "#345995", component: ContactForm },
//   { name: "Inbox", color: "#62A87C", component: MailsList },
//   { name: "Outbox", color: "#9C0D38", component: MailsList },
//   { name: "Spam", color: "#FCBA04", component: MailsList },
//   { name: "Trash", color: "#CAA8F5", component: MailsList },
// ];

function ContactMe({ modal }: { modal: Modal }) {
  // const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Wrapper modal={modal}>
      <Container>
        {/* <Tabs>
          <div style={{ display: "flex" }}>
            {tabs.map((item, index) => {
              return (
                <AsideButton
                  className="cursor-pointer"
                  onClick={() => setActiveTab(item)}
                  isActive={activeTab.name === item.name}
                  zIndex={tabs.length - index}
                  backgroundColor={item.color}
                >
                  {item.name}
                </AsideButton>
              );
            })}
          </div>
        </Tabs> */}
        {/* <Content backgroundColor={activeTab.color}> */}
        <Content backgroundColor="#345995">
          {/* {<activeTab.component />} */}
          <ContactForm />
        </Content>
      </Container>
    </Wrapper>
  );
}

export default ContactMe;
