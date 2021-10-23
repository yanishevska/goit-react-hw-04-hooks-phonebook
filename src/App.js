import {useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Container from "./components/Container";
import contactsInit from "./contacts.json";
import Filter from "./components/Filter";
import { useLS } from './hooks/useLocalStorage';


function App() {
  const [contacts, setContacts] = useLS('contacts', contactsInit);
  const [filter, setFilter] = useState("");

  const formSubmitHandler = contact => {
     setContacts([contact, ...contacts]);
  };

  const  filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  };

  const changeFilter = ({target}) => {
    setFilter(target.value);
  };
  
  const deleteContact = id => {
    setContacts(contacts.filter(contacts => contacts.id !== id))
  };

  return (
      <>
        <Container title={"Phonebook"}>
          <ContactForm onSubmit={formSubmitHandler} contacts={contacts} />
        </Container>

        <Container title={"Contacts"}>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={filterContacts()}
            onDeleteContact={deleteContact}
          />
        </Container>
      </>
    );
}

export default App;
