const Button = ({ children, type, disabled }) => {
  return (
    <button
      className={`button ${disabled ? 'opacity-50 hover:bg-primary/100' : ''}`}
      type={type}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
