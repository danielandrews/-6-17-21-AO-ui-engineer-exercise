import React, { useRef, useEffect, useState  } from "react";
import styled from "styled-components";

import "./App.css";

import { getColor } from "./_starter/theme/theme";
import { Panel } from "./components/Panel";
import { Card } from "./components/Card";
import { Profile } from "./components/Profile";
import { Tabs, TabContentWrapper } from "./components/Tab";


const PageHead = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.125rem;
  color: ${getColor("greyDarkest")};
  height: 3.5rem;
  margin: 0;
  padding: 1rem;
  background-color: ${getColor("white")};
`;

const AppWrapper = styled.div`
  background-color: ${getColor("blueGreyLightest")};
  height: 100%;
`;

const getPeopleInfo = () => {
  return fetch('https://ui-offline-exercise.s3.amazonaws.com/data/people.json')
    .then(async res => {
      const response = await res.json();
      if(res.ok) return response;
      else throw response;
    })
};

const Activities = styled.div``;

export const App = () => {
  const isLoading = useRef(false);
  const [ pageData, setPageData ] = useState({});
  const [ personTabs, setPersonTabs ] = useState([
    { label: 'Activity', value: 'activity', Component: null },
    { label: 'Tracking', value: 'tracking', Component: null },
    { label: 'Reminders', value: 'reminders', Component: null }
  ]);

  useEffect(() => {
    getPeopleInfo()
      .then(data => {
        setPageData(data);
        setPersonTabs([
          { 
            label: 'Activity', 
            value: 'activity', 
            Component: (
              <TabContentWrapper>
                <Activities>Hello</Activities>
              </TabContentWrapper>
            )
          },
          { label: 'Tracking', value: 'tracking', Component:  <TabContentWrapper /> },
          { label: 'Reminders', value: 'reminders', Component:  <TabContentWrapper /> }
        ]);
      })
      .finally(() => isLoading.current = false)
  }, []);

  const page = (
    <>
      <Panel>
        <PageHead>People</PageHead>
      </Panel>
      <div className="main-content people-wrapper">
        <aside className="start-section">
          <Panel>
          <Card>
            <Profile profile={pageData} />
          </Card>
          </Panel>
          <Panel>&nbsp;</Panel>
          <Panel>&nbsp;</Panel>
          <Panel>&nbsp;</Panel>
        </aside>
        <main>
          <Panel>
            <Tabs options={personTabs} id="personTabs" />
          </Panel>
        </main>
        <aside className="end-section">
          <Panel>&nbsp;</Panel>
          <Panel>&nbsp;</Panel>
          <Panel>&nbsp;</Panel>
          <Panel>&nbsp;</Panel>
        </aside>
      </div>
    </>
  );

  return (
    <AppWrapper>
      { isLoading.current ? <h1>Loading data ...</h1> : page }
    </AppWrapper>
  );
};
