import { useState } from 'react';
import { useAddContactMutation } from '../services/contact';
import { Button, InputGroup } from '.';

const CreateContactForm = () => {
  const [addContact, { isLoading: isUpdating }] = useAddContactMutation();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [formValuesValidateErros, setFormValuesValidateErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const onSubmitForm = (e) => {
    e.preventDefault();

    const data = {
      record_type: 'person',
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,
      fields: {
        'first name': [
          { value: formValues.firstName, modifier: '', label: 'first name' },
        ],
        'last name': [
          { value: formValues.lastName, modifier: '', label: 'last name' },
        ],
        email: [{ value: formValues.email, modifier: '', label: 'email' }],
      },
    };

    addContact(data);

    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
    });
  };

  const isButtonDisabled = () =>
    formValues.firstName?.length === 0 ||
    formValues.lastName?.length === 0 ||
    formValues.email?.length === 0 ||
    formValuesValidateErros.firstName ||
    formValuesValidateErros.lastName ||
    formValuesValidateErros.email;

  return (
    <div className='max-w-72 h-fit lg:sticky lg:top-4 max-lg:max-w-full max-lg:w-full'>
      <h2>Create Contact</h2>
      <form
        action=''
        onSubmit={onSubmitForm}
        className='w-full flex flex-col gap-4'>
        <InputGroup
          id='firstName'
          label='First Name'
          type='text'
          value={formValues.firstName}
          validateError={formValuesValidateErros.firstName}
          onChange={(val) =>
            setFormValues((prev) => ({ ...prev, firstName: val }))
          }
          onBlur={() =>
            setFormValuesValidateErrors((prev) => ({
              ...prev,
              firstName:
                !formValues?.firstName || formValues.firstName?.length === 0,
            }))
          }
        />
        <InputGroup
          id='lastName'
          label='Last Name'
          type='text'
          value={formValues.lastName}
          validateError={formValuesValidateErros.lastName}
          onChange={(val) =>
            setFormValues((prev) => ({ ...prev, lastName: val }))
          }
          onBlur={() =>
            setFormValuesValidateErrors((prev) => ({
              ...prev,
              lastName:
                !formValues?.lastName || formValues.lastName?.length === 0,
            }))
          }
        />
        <InputGroup
          id='email'
          label='Email'
          type='email'
          value={formValues.email}
          validateError={formValuesValidateErros.email}
          onChange={(val) => setFormValues((prev) => ({ ...prev, email: val }))}
          onBlur={() =>
            setFormValuesValidateErrors((prev) => ({
              ...prev,
              email: !String(formValues.email)
                .toLowerCase()
                .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ),
            }))
          }
        />
        <Button type='submit' disabled={isButtonDisabled() || isUpdating}>
          Add Contact
        </Button>
      </form>
    </div>
  );
};

export default CreateContactForm;
