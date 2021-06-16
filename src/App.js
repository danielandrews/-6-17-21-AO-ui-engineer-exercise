import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import "./App.css";

import { Panel } from "./components/Panel";
import { getColor } from "./_starter/theme/theme";

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

export const App = () => {
  const isLoading = useRef(false);

  useEffect(() => {
    getPeopleInfo()
      .then(data => {
        console.log(data);
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
          <Panel>dfdf</Panel>
          <Panel>dfd</Panel>
          <Panel>dfd</Panel>
          <Panel>dfdf</Panel>
        </aside>
        <main>
          <Panel> this is the main content</Panel>
        </main>
        <aside className="end-section">
          <Panel>dfdf</Panel>
          <Panel>dfdd</Panel>
          <Panel>dffd</Panel>
          <Panel>dffx</Panel>
        </aside>
      </div>
    </>
  );

  return (<AppWrapper>
    { isLoading.current ? <h1>Loading data ...</h1> : page }
  </AppWrapper>)
};
