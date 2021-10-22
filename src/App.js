import { Component } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Container from "./components/Container";
import contacts from "./contacts.json";
import shortid from "shortid";
import Filter from "./components/Filter";

class App extends Component {
  state = {
    contacts: contacts,
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
      }
  }
  
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    contacts.find((newContact) => newContact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.find((newContact) => newContact.number === number)
      ? alert(`${number} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };
  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contacts) => contacts.id !== id),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  render() {
    console.log('render');
    const visibleContacts = this.filterContacts();
    const { filter } = this.state;

    return (
      <>
        <Container title={"Phonebook"}>
          <ContactForm onSubmit={this.formSubmitHandler} />
        </Container>

        <Container title={"Contacts"}>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Container>
      </>
    );
  }
}

export default App;
