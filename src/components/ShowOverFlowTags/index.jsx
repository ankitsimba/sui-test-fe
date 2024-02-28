import { Input, Popover, Tag } from 'antd';

import { useState } from 'react';

export const ShowOverFlowTags = ({ data, overflowCount, className, textAlign }) => {
  const [filterData, setFilterData] = useState('');
  const [openPopover, setOpenPopover] = useState(false);
  const filterTags = data?.filter((_, index) => index + 1 <= overflowCount);
  const overflowCountTags = data?.filter((_, index) => index + 1 > overflowCount);

  const CustomTag = ({ name, color, otherText }) => {
    return (
      <Tag
        color={color || 'blue'}
        style={{
          borderRadius: '10px',
          fontWeight: '600',
          textAlign: textAlign || 'center',
          marginTop: '6px',
          textTransform: 'capitalize',
        }}
      >
        {name}
        <p className="m-0"> {otherText}</p>
      </Tag>
    );
  };
  return (
    <div className={className}>
      {filterTags?.map((item) => (
        <CustomTag name={item?.label} key={item?.label} otherText={item?.otherText} />
      ))}
      {data?.length > overflowCount ? (
        <Popover
          trigger={'click'}
          visible={openPopover}
          onVisibleChange={(visible) => setOpenPopover(visible)}
          content={
            <>
              {overflowCountTags?.length >= 7 ? (
                <>
                  <Input
                    placeholder="Enter keyword to search"
                    value={filterData}
                    autoFocus
                    allowClear
                    onChange={(e) => setFilterData(e?.target?.value)}
                  />
                  <div className="w-full h-1 bg-gray-50 my-1" />
                </>
              ) : null}
              <div
                className={`grid grid-cols-3 gap-2 ${
                  overflowCountTags?.filter((fill) =>
                    filterData
                      ? fill?.label?.toLowerCase()?.includes(filterData?.toLowerCase())
                      : true,
                  ).length >= 10
                    ? 'h-40'
                    : ''
                } overflow-y-auto items-center`}
              >
                {overflowCountTags
                  ?.filter((fill) =>
                    filterData
                      ? fill?.label?.toLowerCase()?.includes(filterData?.toLowerCase())
                      : true,
                  )
                  ?.map((element) => (
                    <CustomTag
                      name={element?.label}
                      key={element?.label}
                      otherText={element?.otherText}
                    />
                  ))}
              </div>
            </>
          }
        >
          <Tag
            color={'#005be7'}
            onClick={() => setOpenPopover(true)}
            style={{ borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
          >
            +{data?.length - overflowCount}
          </Tag>
        </Popover>
      ) : null}
    </div>
  );
};
