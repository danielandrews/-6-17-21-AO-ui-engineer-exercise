import styled from "styled-components";
import { IconWrapper } from "../_starter/Navigation/LeftNav/NavLink";
import { getColor } from "../_starter/theme/theme";
import { default as EllipsisHorizontalIcon } from "../_starter/shared/Icons/EllipsisHorizontal";
import { default as StarIcon } from "../_starter/shared/Icons/StarOutlined";

const cardHeaderHeight = "2rem";

const CardHeader = styled.header`
    height: ${cardHeaderHeight};
    background: ${getColor("white")};
    border-bottom: 1px solid #E1E7EA;
    display: flex;
    justify-content: space-between;
`;

const ActionButton = styled.button`
    padding: 0;
    background: transparent;
    border: none;
`;

const HeaderButton = ({ color, Icon }) => {
    return (
        <ActionButton>
            <IconWrapper height="100%">
                <Icon color={getColor(color)} />
            </IconWrapper>
        </ActionButton>
    );
}

const CardWrapper = styled.div`
    height: 100%;
`;

const CardBody = styled.div`
    background: ${getColor("white")};
    height: calc(100% - ${cardHeaderHeight});
`;

export const Card = ({ children }) => {
    return (
        <CardWrapper>
            <CardHeader>
                <HeaderButton color="orange" Icon={StarIcon}></HeaderButton>
                <HeaderButton color="greyDark" Icon={EllipsisHorizontalIcon}></HeaderButton>
            </CardHeader>
            <CardBody>{children}</CardBody>
        </CardWrapper>
    )
}
