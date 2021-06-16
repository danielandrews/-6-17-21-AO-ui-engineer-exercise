import { default as PhoneIcon } from "../_starter/shared/Icons/Phone";
import { default as ChevronSmDown } from "../_starter/shared/Icons/ChevronSmDown";
import { default as PlusIcon } from "../_starter/shared/Icons/Plus";

import { IconWrapper } from "../_starter/Navigation/LeftNav/NavLink";
import { getColor } from "../_starter/theme/theme";

import { Button, ButtonGroup } from "./Button";
  
const ActivitiesHeader = () => {
    return (
        <div className="flex flex-between">
        <ButtonGroup divide={true}>
            <Button>
            Person
            <IconWrapper display="inline">
                <ChevronSmDown />
            </IconWrapper>
            </Button>
            <Button isActive={true}>
            Activity
            <IconWrapper display="inline">
                <ChevronSmDown color={getColor("greyDarkest")} />
            </IconWrapper>
            </Button>
        </ButtonGroup>
        <ButtonGroup>
            <Button isGhost={true}>
            <IconWrapper>
            <PhoneIcon color={getColor("blue")} />
            </IconWrapper>
            Log a Call
            </Button>
            <Button isGhost={true}>
            <IconWrapper>
                <PlusIcon color={getColor("blue")} />
            </IconWrapper>
            Add a Note
            </Button>
        </ButtonGroup>
        </div>
    );
};

export const Activities = () => {
    return (
        <ActivitiesHeader />
    );
};