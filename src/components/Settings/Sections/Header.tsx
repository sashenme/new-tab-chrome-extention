import React from 'react'
import CloseIcon from '../../../assets/icons/CloseIcon'

const Header: React.FC<{onClose:()=>void}> = ({onClose}) => {
  return (
    <header className="flex justify-between items-center pr-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <button className="px-2" onClick={onClose}>
            <CloseIcon />
          </button>
        </header>
  )
}

export default Header