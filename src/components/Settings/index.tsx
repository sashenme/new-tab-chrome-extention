import React from 'react'
import CogIcon from '../../assets/icons/CogIcon'

const Settings = () => {
  return (
    <div>
      <button className="px-4 py-2 text-base bg-slate-800/70 text-white rounded-full flex items-center gap-1 backdrop-blur-sm mt-10 hover:bg-slate-900 transition-all ease-in duration-75">
        <CogIcon/>
        <span className='pr-1'>Settings</span>
      </button>
    </div>
  )
}

export default Settings