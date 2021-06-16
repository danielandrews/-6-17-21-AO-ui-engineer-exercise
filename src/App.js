

import React, { useRef, useEffect, useState  } from "react";
import styled from "styled-components";

import "./App.css";

import { getColor, getBreakpoint } from "./_starter/theme/theme";
import { Panel } from "./components/Panel";
import { Card } from "./components/Card";
import { Profile } from "./components/Profile";
import { Tabs, TabContentWrapper } from "./components/Tab";
import { Activities } from "./components/Activity";


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

const PeopleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: .5rem;
  main {
    order: -1; //prioritize main content on mobile
  }

  aside {
    margin-top: 1rem;
  }

  @media (min-width: ${getBreakpoint("sm")}) {
    grid-template-columns: .75fr .25fr;

    .end-section {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    aside {
      margin-top: initial;
    }
  }

  @media (min-width: ${getBreakpoint("md")}) {
    grid-template-columns: .5fr 1fr .5fr;
    main {
      order: 0; // back to normal content flow
    }
    .end-section {
      grid-column-start: initial;
      grid-column-end: initial;
    }
  }
`;

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
        const activityTypes = [ 
          {...data.upcoming_activities, url: data.upcoming_activities._href, label: 'Upcoming Activities'}, 
          {...data.activities, url: data.activities._href, label: 'Past Activities'}
        ];
        setPersonTabs([
          { 
            label: 'Activity', 
            value: 'activity', 
            Component: (
              <TabContentWrapper>
                <Activities activityTypes={activityTypes} />
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
      <PeopleWrapper className="main-content">
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
      </PeopleWrapper>
    </>
  );

  return (
    <AppWrapper>
      { isLoading.current ? <h1>Loading data ...</h1> : page }
    </AppWrapper>
  );
};
