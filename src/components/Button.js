import styled from "styled-components";

import { IconWrapper } from "../_starter/Navigation/LeftNav/NavLink";
import { getColor } from "../_starter/theme/theme";

const Divider = styled.div`
  height: 2rem;
  width: 1px;
  background: ${getColor("greyLightest")};
  margin: auto 1rem;
`;

export const ButtonGroup = ({ children, divide }) => {
    let dividedButtons = children;
    if(divide && children.length > 1) {
      dividedButtons =  children.reduce((all, curr, index) => {
        all.push(curr);
        const isAtEnd = index === (children.length-1);
        if(!isAtEnd) all.push(<Divider key={`divider-${index}`} />);
        return all;
      }, []);
    }
  
    return (
      <div className="flex">
        {dividedButtons}
      </div>
    );
  }
  
  export const Button = styled.button`
    display: flex;
    align-items: center;
    padding: .5rem .75rem;
    height: 2rem;
    cursor: pointer;
    background: ${getColor("blue")};
    color: ${getColor("white")};
    font-weight: 600;
    border-radius: .25rem;
    border-color: transparent;
  
    ${({ isActive }) => isActive && `
      background: transparent;
      color: ${getColor("greyDarkest")};
      border: 1px solid ${getColor("greyLightest")};
    `}
  
    ${({ isGhost }) => isGhost && `
      background: transparent;
      color: ${getColor("blue")};
      border: none;
    `}
  
    & > ${IconWrapper} {
      width: auto;
      font-weight: 100;
      ${({ isGhost }) => isGhost && `
        color: inherit;
      `}
    }
  `;
