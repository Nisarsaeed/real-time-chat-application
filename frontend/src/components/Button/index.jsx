import PropTypes from 'prop-types';

export const Button = ({
  type = 'button',
  className = '',
  title = 'Submit',
  onClick = () => {}
}) => {
  return (
    <button
      type={type}
      className={`bg-primary hover:bg-primary-light focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 my-3 focus:outline-none text-white w-1/2 ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
