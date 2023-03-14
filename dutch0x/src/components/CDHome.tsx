import React from 'react';
import Navbar from './Navbar';
import Event from './Event';
import Overview from './Overview';

const CDHome = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 p-6 bg-[#F5F5F5]">
        <Event />
        <Overview />
      </div>
    </>
  );
};

export default CDHome;