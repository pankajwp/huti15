import React from 'react';

export default ({input, label, meta}) => {
  //{(meta.touched === true)? meta.error: undefined}
  // similar to (meta.touched && meta.error)
  // {...input} including existing redux form input properties in my custom field component
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{marginBottom: '10px'}}>
        {meta.touched && meta.error}
      </div>
    </div>
  );
};
