'use client';

import React from 'react';

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

const Label = ({ htmlFor, children, className = '' }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-1 text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
