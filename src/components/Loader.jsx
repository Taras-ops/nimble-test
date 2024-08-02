import SpinnerIcon from '../assets/icons/spinner.png';

const Loader = () => {
  return (
    <section className='w-full h-[100vh] flex items-center justify-center'>
      <img src={SpinnerIcon} className='w-20 h-20 animate-spin' />
    </section>
  );
};

export default Loader;
