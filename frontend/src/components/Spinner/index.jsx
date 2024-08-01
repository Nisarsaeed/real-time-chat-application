import PropTypes from 'prop-types'

export const Spinner = ({display, isVariantSm}) => {
  return (
    <div className={` z-50 ${display} ${isVariantSm ?'h-7 w-7 inline':'w-full h-full fixed top-0 left-0 bg-white opacity-75'}`}>
      <div className={`  ${isVariantSm? 'inline': 'mt-[50vh] flex justify-center items-center'}`}>
       <div className={`fas fa-circle-notch fa-spin text-primary ${isVariantSm?'text-black font-bold fa-xl':'fa-4x'}`}></div>
      </div>
    </div>
  )
}

Spinner.propTypes = {
    display: PropTypes.string.isRequired,
    isVariantSm: PropTypes.bool
}
