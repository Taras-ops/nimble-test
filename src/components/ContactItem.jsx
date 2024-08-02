import { Link } from 'react-router-dom';
import { useDeleteContactMutation } from '../services/contact';
import { TagItem } from '.';

import DeleteSvgIcon from '../assets/icons/delete.svg';

const ContactItem = ({ contact }) => {
  const { fields, avatar_url, tags, id } = contact;
  const [deleteContact] = useDeleteContactMutation();

  const onDeleteContact = () => {
    deleteContact(id);
  };

  return (
    <div className='bg-secondary/80 pl-6 pr-8 py-5 rounded-lg relative shadow-md transition-shadow hover:shadow'>
      <Link to={`/${contact.id}`}>
        <div className='flex gap-5 '>
          <div className='w-14 h-14'>
            <img
              className='w-full rounded-full'
              src={avatar_url}
              alt='avatar image'
            />
          </div>
          <div className=''>
            <div className='flex gap-1 items-center font-bold text-lg mb-1'>
              <p>{fields?.['first name']?.[0]?.value}</p>
              <p>{fields?.['last name']?.[0]?.value}</p>
            </div>
            <p>{fields?.email?.[0]?.value}</p>
            {tags?.length > 0 ? (
              <div className='mt-8 flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <TagItem key={tag.id} tag={tag} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Link>
      <div
        className='absolute right-4 top-3 cursor-pointer'
        onClick={onDeleteContact}>
        <img src={DeleteSvgIcon} alt='delete icon' />
      </div>
    </div>
  );
};

export default ContactItem;
