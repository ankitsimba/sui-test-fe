import React, { useEffect, useState } from 'react';
import { InputNumber, Popover, Form } from 'antd';

const QuantityToolTip = ({ count, children }) => {
  const [convert, setConvert] = useState(0);

  const calculatePalletsAndCrates = (sqft) => {
    const pallets = sqft / 80;
    const crates = pallets / 30;
    setConvert({
      pallets: pallets?.toFixed(2),
      crates: crates?.toFixed(2),
    });
  };
  useEffect(() => {
    if (count) {
      calculatePalletsAndCrates(count);
    }
  }, count);

  return (
    <>
      <Popover
        title={`Quantity:- ${count}`}
        content={
          <>
            <p className="font-medium m-0 text-gray-900">Pallets: {convert?.pallets || 0}</p>
            <p className="font-medium m-0 text-gray-900">Crates: {convert?.crates || 0}</p>
          </>
        }
      >
        <p className="m-0 cursor-pointer">{children || count}</p>
      </Popover>
    </>
  );
};

export default QuantityToolTip;
