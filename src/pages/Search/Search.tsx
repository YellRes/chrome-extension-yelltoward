import React, { useEffect, useState, useContext, createContext, useRef} from 'react';
import { getAllChromeTabs } from './search'
import { Select } from 'antd';
import type { SelectProps, RefSelectProps } from 'antd';
import './index.css'


const ContainerContext = createContext<Array<chrome.tabs.Tab>>([])

/**
 * 
 * question: 
 * 1. input 输入框没有autoFocus
 * answer:
 * 1. 放弃sidebar.html 直接放入popup.html页面(template)
 * 
*/
const SearchInput: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<number>();
  // TODO: searchRef什么时候是有内容的？
  // useEffect 中就有内容 searchRef能使用
  const searchRef = useRef<RefSelectProps>(null)
  const browserTabs = useContext(ContainerContext)  

  const handleSearch = (newValue: string) => {
 
    setData(browserTabs.filter(item => item.title?.includes(newValue) || item.url?.includes(newValue)).map(item => ({
      value: item.id,
      text: item.title,
      label: item.title,
      ...item
    })))
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
    // chrome 中跳转指点标签页面
    chrome.tabs.update(newValue, {
      active: true
    })

  };

  useEffect(() => { 
    searchRef.current?.focus()
  }, [])

  return (
    <>
    <Select
      showSearch
      autoFocus
      ref={searchRef}
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
       
      </>
  );
};


// 搜索面板
const Panel: React.FC = () => {

  const [browserTabs, setBrowserTabs] = useState<Array<chrome.tabs.Tab>>([])
  const init = async () => {
    const res = await getAllChromeTabs()
    setBrowserTabs(res)
   }

  useEffect(() => { 
    init()
  }, [])
  return (

    <ContainerContext.Provider value={browserTabs}>
      <div className="container">

        <SearchInput style={{marginTop: '8px'}} placeholder="开始键入..." style={{ width: 300 }}/>
      </div>
    </ContainerContext.Provider>
  );
};

export default Panel;
