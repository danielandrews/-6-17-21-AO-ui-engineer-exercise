import styled from "styled-components";
import { getColor } from "../_starter/theme/theme";

export const Panel = styled.section`
    background: ${getColor("bgGrey")};
    border: 1px solid ${getColor("greyLightest")};
`;
