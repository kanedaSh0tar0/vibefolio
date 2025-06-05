import { useState } from "react";
import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { Container, Content, Tabs, AsideButton } from "./styles";
import ContactForm from "./contact-form";

const tabs = [
  { name: "Contact Me", color: "#345995", component: ContactForm },
  { name: "Inbox", color: "#62A87C", component: () => <div>test 1</div> },
  { name: "Outbox", color: "#9C0D38", component: () => <div>test 4</div> },
  { name: "Spam", color: "#FCBA04", component: () => <div>test 2</div> },
  { name: "Trash", color: "#CAA8F5", component: () => <div>test 3</div> },
];

function ContactMe({ modal }: { modal: Modal }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Wrapper modal={modal}>
      <Container>
        <Tabs>
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
        </Tabs>
        <Content backgroundColor={activeTab.color}>
          {<activeTab.component />}
        </Content>
      </Container>
    </Wrapper>
  );
}

export default ContactMe;
