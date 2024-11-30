import React from 'react';

function Checkbox({ children, ...props }) {
  return (
    <label className="flex items-start">
      <div className="flex-shrink-0 mt-0.5">
        <input type="checkbox" className="form-checkbox text-blue-500 h-4 w-4" {...props} />
      </div>
      <span className="ml-2 text-sm flex-grow">{children}</span>
    </label>
  );
}

export default Checkbox;
