import ContactItem from './ContactItem';

const ContactsList = ({ contacts }) => {
  return (
    <div className='flex-1'>
      <h2>Contacts</h2>
      <div className='w-full flex flex-col gap-4'>
        {contacts?.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
