import React from "react";
import AsyncSelect from "react-select/async";

const DynamicSelect = ({ loadOptions, onChange }) => {
  return (
    <React.Fragment>
      <AsyncSelect cacheOptions onChange={onChange} loadOptions={loadOptions} />
    </React.Fragment>
  );
};

export default DynamicSelect;
