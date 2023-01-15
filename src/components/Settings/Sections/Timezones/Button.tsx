import React from 'react'
import PlusIcon from '../../../../assets/icons/PlusIcon'

const Button: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
    onClick={onClick}
    type="button"
    className="bg-black hover:bg-gray-900 rounded-full px-4 py-2 flex items-center gap-1 w-full max-w-[8rem] mx-auto mt-4"
  >
    <PlusIcon />
    <span>Add timezone</span>
  </button>
  )
}

export default Button