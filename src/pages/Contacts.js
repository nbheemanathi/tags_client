import React, { useState } from "react";
import ContactsList from "../components/ContactsList";
import { FETCH_CONTACTS } from "../util/graphql";
import ContactForm from "../components/ContactForm";

const Contacts = () => {
  const [contact, setContact] = useState(null);
 

  return (
    <div className="w-full max-w-9xl mx-auto">
      <div className=" shadow-lg rounded-sm border border-gray-200">
        {!contact ? (
          <ContactsList onAddNew={() => setContact({})} onEditUser={(contact) => setContact(contact)} />
        ) : (
          <ContactForm contact={contact} onCancel={() => setContact(null)} />
        )}
      </div>
    </div>
  );
};

export default Contacts;
