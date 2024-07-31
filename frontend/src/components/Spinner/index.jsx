import PropTypes from 'prop-types'

export const Spinner = ({display}) => {
  return (
    <div className={`w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 ${display}`}>
  <div className="flex justify-center items-center mt-[50vh]">
    <div className="fas fa-circle-notch fa-spin fa-5x text-primary"></div>
  </div>
</div>
  )
}

Spinner.propTypes = {
    display: PropTypes.string.isRequired
}
