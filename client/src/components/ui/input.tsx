// src/components/ui/input.tsx
'use client';

import React from 'react';

const Input = ({ type = "text", ...props }) => {
  return (
    <input
      type={type}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

export default Input;
