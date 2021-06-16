import React from "react";
import styled from "styled-components";

import { getColor } from "../../theme/theme";

const NavLinkWrapperLink = styled.a`
  text-decoration: none;
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  overflow: hidden;
  background: ${({ isActive }) =>
    getColor(isActive ? "indigoDarkest" : "indigoDark")};
  border-left: 4px solid
    ${({ isActive }) => (isActive ? getColor("blueLight") : "transparent")};

  &:hover {
    background: ${getColor("indigoDarkest")};
  }

  @media (min-width: 1280px) {
    opacity: 1;
    visibility: visible;
  }
`;

export const IconWrapper = styled.div`
  color: ${getColor("white")};
  font-size: 20px;
  line-height: 20px;
  display: ${({ display }) => display || 'flex'};
  align-items: center;
  justify-content: center;
  width: 60px;
`;

export const NavLink = ({ icon: Icon, isExpanded, title, isActive }) => {
  return (
    <NavLinkWrapperLink aria-label={`Navigate to ${title}`} href="#">
      <NavLinkContainer isActive={isActive} isExpanded={isExpanded}>
        <IconWrapper>
          <Icon arial-label={`${title} icon`} />
        </IconWrapper>
      </NavLinkContainer>
    </NavLinkWrapperLink>
  );
};
