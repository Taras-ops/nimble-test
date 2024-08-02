const TagItem = ({ tag }) => {
  return (
    <div className='bg-primary text-white px-3 py-1 font-medium rounded-sm shadow-sm'>
      {tag.tag}
    </div>
  );
};

export default TagItem;
