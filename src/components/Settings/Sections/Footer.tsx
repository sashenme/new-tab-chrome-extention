import React from 'react'

const Footer: React.FC<{handleSave: ()=> void}> = ({handleSave}) => {
  return (
    <div className="grid grid-cols-2 gap-2 self-end pr-8">
        <button
          className="px-4 py-3 bg-cyan-500 text-sm font-bold rounded-md"
          onClick={handleSave}
        >
          Save changes
        </button>
        <button className="px-4 py-3 bg-slate-500 text-sm font-bold rounded-md">
          Reset to all
        </button>
      </div>
  )
}

export default Footer