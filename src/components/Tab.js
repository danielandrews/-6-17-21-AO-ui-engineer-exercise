import styled from "styled-components";
import { useState, useEffect } from "react";

import { getColor } from "../_starter/theme/theme";

const TabsWrapper = styled.div`
  background-color: ${getColor("white")};
  height: 100%;
  border: 1px solid ${getColor("greyLightest")};
`;

const tabControlHeight = '3rem';
const TabControlWrapper = styled.div`
  height: ${tabControlHeight};
  border-bottom: 1px solid ${getColor("greyLightest")};
  display: flex;
  & input[type="radio"] {
    display: none;
  }
`;

const Tab = styled.label`
  font-style: normal;
  font-size: .875rem;
  line-height: 1rem;
  color: ${getColor("greyDarkest")};
  height: 100%;
  display: inline-block;

  padding-top: 1rem;
  padding-bottom: 0;
  padding-left: 1rem;
  padding-right: 1rem;

  display: flex;
  cursor: pointer;

  input[type="radio"]:checked + & {
    font-weight: 600;
  }
`;

const TabLabelText = styled.span`
  position: relative;
  height: 100%;
  display: inline-block;

  input[type="radio"]:checked + label > &:after {
    content: ' ';
    width: 100%;
    display: block;
    position: absolute;
    bottom: 0;
    border-bottom: .2rem solid ${getColor("blueLight")};
  }
`;

export const TabContentWrapper = styled.div`
  padding: 1rem 1.3rem;
`;

export const Tabs = ({ options, id }) => {
  const [ selectedTab, setSelectedTab ] = useState(options?.[0]?.value || '');
  const [ tabContent, setTabContent ] = useState(options?.[0]?.Component || null);

  const handleTabChange = (evt, Component) => {
    setSelectedTab(evt.target.value);
    setTabContent(Component);
  };

  useEffect(() => {
    setTabContent(options?.[0]?.Component || null);
  }, [options])

  return (
    <TabsWrapper>
      <TabControlWrapper>
        {options?.map(({ label, value, Component }) => (
          <div key={value}>
            <input type="radio" id={`tab-${id}-${value}`} value={value} onChange={e => handleTabChange(e, Component)} checked={selectedTab === value} />
            <Tab htmlFor={`tab-${id}-${value}`}>
              <TabLabelText>{label}</TabLabelText>
            </Tab>
          </div>
          )
        )}
      </TabControlWrapper>
      {tabContent}
    </TabsWrapper>
  );
};