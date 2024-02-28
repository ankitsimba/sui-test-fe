import QuantityToolTip from '@/components/QuantityToolTip';
import React from 'react';

import { connect } from 'umi';

const ItemDetails = ({ itemDetails }) => {
  const ShowDetails = ({ label, text }) => {
    return (
      <div className="flex gap-10 border-t pt-2 justify-between">
        <div className="">
          <p className=" pl-4 pt-2 ml-1 text-sm font-semibold text-gray-600">{label}</p>
        </div>
        <div className=" ">
          <p className="mt-2 mr-4 text-right break-all" style={{ fontWeight: '500' }}>
            {text}
          </p>
        </div>
      </div>
    );
  };
  //   const ShowOtherDetails = ({ label, text, className, style, styleLabel, styleText }) => {
  //     return (
  //       <div style={style} className={`flex gap-10 ${className || ''} border-b pt-2 justify-between`}>
  //         <div className="">
  //           <p style={styleLabel} className=" pl-4 pt-2 ml-1 text-sm font-semibold text-gray-900">
  //             {label}
  //           </p>
  //         </div>
  //         <div className=" ">
  //           <p
  //             className="mt-2 mr-4 text-right break-all text-gray-600"
  //             style={{ fontWeight: '500', ...styleText }}
  //           >
  //             {text}
  //           </p>
  //         </div>
  //       </div>
  //     );
  //   };
  return (
    <>
      <div className="main bg-white  shadow-md">
        <ShowDetails label="Name" text={itemDetails?.name} />
        <ShowDetails label="Full Name" text={itemDetails?.fullName} />
        <ShowDetails label="Code" text={itemDetails?.code} />
        <ShowDetails label="HSN Code" text={itemDetails?.hsncode} />
        <ShowDetails label="Color" text={itemDetails?.color} />
        <ShowDetails label="Size" text={itemDetails?.size} />
        <ShowDetails label="Pcs" text={itemDetails?.pcs} />

        <ShowDetails
          label={'Total Back Orders'}
          text={
            <QuantityToolTip count={itemDetails?.totalQuantityToPromise}>
              {itemDetails?.totalQuantityToPromise}
            </QuantityToolTip>
          }
        />
        <ShowDetails
          label={'Total Quantity In Hand'}
          text={
            <QuantityToolTip count={itemDetails?.totalQuantityAvailable}>
              {itemDetails?.totalQuantityAvailable}
            </QuantityToolTip>
          }
        />
        <ShowDetails
          label={'Total Quantity On Sea'}
          text={
            <QuantityToolTip count={itemDetails?.totalQuantityInTransit}>
              {itemDetails?.totalQuantityInTransit}
            </QuantityToolTip>
          }
        />

        <ShowDetails label="Scale" text={itemDetails?.scale} />
        <ShowDetails label="Level" text={itemDetails?.level} />
        <ShowDetails label="Weight" text={itemDetails?.weight} />
        <ShowDetails label="Region" text={itemDetails?.region} />

        <div className="border-t m-0" />
      </div>
    </>
  );
};

export default connect(({ masterItem }) => ({
  itemDetails: masterItem?.itemDetails,
}))(ItemDetails);
