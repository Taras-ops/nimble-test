const InputGroup = ({
  label,
  value,
  onChange,
  id,
  type,
  validateError,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-1'>
      {label ? (
        <label htmlFor={id} className='text-sm'>
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={`input ${
          validateError
            ? 'ring-danger border-danger ring-2 focus:ring-danger placeholder:text-danger'
            : null
        }`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default InputGroup;
