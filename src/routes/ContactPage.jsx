import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useGetContactQuery,
  useAddContactTagMutation,
  contactApi,
} from '../services/contact';
import { Button, InputGroup, Loader, TagItem } from '../components';

const ContactPage = () => {
  const dispatch = useDispatch();
  const { contactId } = useParams();
  const [tagValue, setTagValue] = useState('');
  const [isTagValidateError, setIsTagValidateError] = useState(false);
  const { data, isLoading, isError } = useGetContactQuery(contactId);
  const [addTag, { isLoading: isUpdating, isSuccess }] =
    useAddContactTagMutation();

  const contactData = data?.resources?.[0];

  const onTagInputBlur = () => {
    setIsTagValidateError(!tagValue || tagValue.length === 0);
  };

  const onSubmitTagForm = (e) => {
    e.preventDefault();

    if (isTagValidateError) return;

    const tags = contactData?.tags?.map((tag) => tag.tag) ?? [];
    tags.push(tagValue);

    addTag({ contactId, tags });

    setTagValue('');
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        contactApi.util.prefetch('getContact', contactId, { force: true })
      );
    }
  }, [isSuccess, contactId, dispatch]);

  if (isLoading) return <Loader />;

  if (isError) return 'Error!';

  return (
    <section className='py-8'>
      <div className='container max-w-2xl mx-auto px-4'>
        <div className=''>
          <div className='flex items-center justify-center gap-6 mb-8'>
            <div className='w-20 h-20'>
              <img
                className='w-full rounded-full'
                src={contactData?.avatar_url}
                alt='avatar image'
              />
            </div>
            <div className=''>
              <div className='flex gap-1 items-center font-bold text-lg mb-1'>
                <p>{contactData?.fields?.['first name']?.[0]?.value}</p>
                <p>{contactData?.fields?.['last name']?.[0]?.value}</p>
              </div>
              <p>{contactData?.fields?.email?.[0]?.value}</p>
            </div>
          </div>
          {contactData?.tags?.length > 0 ? (
            <div className=''>
              <p className='font-bold mb-1'>Tags</p>
              <div className='flex flex-wrap gap-2'>
                {contactData.tags.map((tag) => (
                  <TagItem key={tag.id} tag={tag} />
                ))}
              </div>
            </div>
          ) : null}
          <form
            action=''
            className='mt-14 flex flex-col gap-4'
            onSubmit={onSubmitTagForm}>
            <InputGroup
              value={tagValue}
              onChange={(val) => setTagValue(val)}
              type='text'
              placeholder='Add New Tag'
              validateError={isTagValidateError}
              onBlur={onTagInputBlur}
            />
            <Button type='submit' disabled={isUpdating || isTagValidateError}>
              Add Tag
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
