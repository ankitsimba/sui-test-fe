import React from 'react';
import { Avatar, Tooltip } from 'antd';

import { connect } from 'umi';

import { getInitials, toTitleCase } from '@/utils/common';

const VendorDetails = ({ vendorDetails }) => {
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
        <div className="flex justify-between items-center">
          <div className="flex pt-3 items-center">
            <div className="mt-4 ml-4 mb-4">
              <Avatar
                style={{
                  background: '#34bdeb',
                }}
                size={64}
              >
                {getInitials(vendorDetails?.name)}
              </Avatar>
            </div>

            <span className="ml-4 mb-4 text-xl font-medium text-gray-600 capitalize">
              {vendorDetails?.name}
            </span>
          </div>
        </div>

        <ShowDetails label="Email" text={vendorDetails?.email} />

        <ShowDetails
          label="Phone"
          text={`${vendorDetails?.phoneNumber?.countryCode?.includes('+') ? '' : '+'}${
            vendorDetails?.phoneNumber?.countryCode
          } ${vendorDetails?.phoneNumber?.number}`}
        />
        <ShowDetails
          label="Address"
          text={
            <Tooltip
              title={toTitleCase(
                `${vendorDetails?.address?.address1 || ''}, ${
                  vendorDetails?.address?.city || ''
                }, ${vendorDetails?.address?.state || ''}, ${
                  vendorDetails?.address?.country || ''
                }, ${vendorDetails?.address?.zipCode || ''}`,
              )}
            >
              <p className="m-0 text-right font-medium  select-none w-48 truncate">
                {toTitleCase(
                  `${vendorDetails?.address?.address1 || ''}, ${
                    vendorDetails?.address?.city || ''
                  } ${vendorDetails?.address?.state || ''}, ${
                    vendorDetails?.address?.country || ''
                  }, ${vendorDetails?.address?.zipCode || ''}`,
                )}
              </p>
            </Tooltip>
          }
        />
        <ShowDetails label="Credit Limit" text={vendorDetails?.creditLimit} />
        <ShowDetails label="Due Days" text={vendorDetails?.dueDays} />
        <div className="border-t m-0" />
      </div>
    </>
  );
};

export default connect(({ vendors }) => ({
  vendorDetails: vendors?.vendorDetails,
}))(VendorDetails);
