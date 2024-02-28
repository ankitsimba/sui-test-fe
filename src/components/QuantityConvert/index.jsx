import React, { useState } from 'react';
import { InputNumber, Popover, Form } from 'antd';
import { useEffect } from 'react';

const QuantityConvert = ({ item, required, name, label, requiredMessage, disabled }) => {
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
    calculatePalletsAndCrates(document.getElementById(item).value);
  }, []);

  return (
    <>
      <Form.Item
        name={name || ['quantity', item]}
        shouldUpdate={(_, current) => {
          console.log('current', current);
        }}
        label={
          <Popover
            title={`Quantity:- ${item}`}
            content={
              <>
                <p className="font-medium m-0 text-gray-900">Pallets: {convert?.pallets}</p>
                <p className="font-medium m-0 text-gray-900">Crates: {convert?.crates}</p>
              </>
            }
          >
            <p className="formLabel m-0 truncate w-48">{label || `Quantity(sqft):- ${item}`}</p>
          </Popover>
        }
        rules={[
          {
            required: required === false ? required : true,
            message: requiredMessage || "quantity can't be blank!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: '100%',
          }}
          id={`${item}`}
          disabled={disabled}
          size="large"
          onChange={calculatePalletsAndCrates}
          placeholder="Enter square feet"
        />
      </Form.Item>
    </>
  );
};

export default QuantityConvert;
