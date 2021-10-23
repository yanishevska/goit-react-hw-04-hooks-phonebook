import { useState } from "react";
import shortid from "shortid";
import s from "./ContactForm.module.css";


function ContactForm({onSubmit,contacts}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactInputId = shortid.generate();

   const handleSubmit = e => {
    e.preventDefault();
    reset();
    checkedContact();
  };

  const checkedContact = () => {
    const normalizedName = name.toLowerCase();
    contacts.find(
      contact => contact.name.toLowerCase() === normalizedName,
    )
      ? alert(`${name} is already in contacts`)
      :contacts.find(
      contact => contact.number.toLowerCase() === number,
    )
      ? alert(`${number} is already in contacts`)
      : addNewContact();
  };

  const addNewContact = () => {
    const newContact = { name, number, id: contactInputId };
    onSubmit(newContact);
  };

  const handleChange = ({target}) => {
    const { name, value } = target;

   switch (name) {
     case "name":
       setName(value);
       break;
     
     case "number":
       setNumber(value);
       break;
     default:
       return;
   }
  };

  const reset = () => {
    setName("");
    setNumber("");
  };
 
  return (
      <form onSubmit={handleSubmit} className={s.form}>
        <label htmlFor={contactInputId} className={s.labelForm}>
          Name
        </label>
        <input
          className={s.formInput}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          id={contactInputId}
          required
        />
        <br />
        <label htmlFor={contactInputId} className={s.labelForm}>
          {" "}
          Number
        </label>
        <input
          className={s.formInput}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          id={contactInputId}
          required
        />
        <br />
        <button className={s.btnAdd} type="submit">
          Add contact
        </button>
      </form>
    );
}

export default ContactForm;
