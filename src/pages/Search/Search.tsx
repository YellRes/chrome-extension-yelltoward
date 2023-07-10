import React, { useEffect, useState} from 'react';
import { getAllChromeTabs } from './search'
import { Select } from 'antd';
import type { SelectProps } from 'antd';


const SearchInput: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    // fetch(newValue, setData);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      showSearch
      className='m-8'
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

const Panel: React.FC = () => {

  const [browserTabs, setBrowserTabs] = useState<Array<chrome.tabs.Tab>>([])
  // const init = async () => {
  //   const res = await getAllChromeTabs()
  //   setBrowserTabs(res)
  //  }

  // useEffect(() => { 
  //   init()
  // }, [])
  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">search for your tabs</h1>

      <SearchInput placeholder="开始键入..." style={{ width: 200 }}/>
    </div>
  );
};

export default Panel;
