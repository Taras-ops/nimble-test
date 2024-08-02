import { CreateContactForm, ContactsList, Loader } from '../components';
import { useGetAllContactsQuery } from '../services/contact';

const Root = () => {
  const { data: allContractsData, error, isLoading } = useGetAllContactsQuery();

  if (isLoading) return <Loader />;

  if (error) return 'Error!';

  return (
    <section className='py-8'>
      <div className='container max-w-7xl mx-auto px-4'>
        <div className='flex flex-1 gap-9 max-lg:flex-col'>
          <CreateContactForm />
          <ContactsList contacts={allContractsData.resources} />
        </div>
      </div>
    </section>
  );
};

export default Root;
