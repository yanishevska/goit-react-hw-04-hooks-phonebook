import React from "react";
import PropTypes from "prop-types";
import s from "./ContactList.module.css";

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.contactItem}>
          <span className={s.nameForm}>{name}:</span>
          <span className={s.numberForm}>{number}</span>
          <button
            className={s.btnDelete}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            <img
              className={s.svgBtnDelete}
              src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-lineal-color-kiranshastry.png"
              alt="delete button"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
ContactList.defaultProps = {
  name: "Name Surname",
  number: "123 456 789",
};

ContactList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
export default ContactList;
