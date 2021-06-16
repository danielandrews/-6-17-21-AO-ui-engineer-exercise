import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import { default as PhoneIcon } from "../_starter/shared/Icons/Phone";
import { default as ChevronSmDown } from "../_starter/shared/Icons/ChevronSmDown";
import { default as PlusIcon } from "../_starter/shared/Icons/Plus";
import { default as VoicemailIcon } from "../_starter/shared/Icons/Voicemail";
import { default as BadgeIcon } from "../_starter/shared/Icons/Badge";
import { default as PaperPlaneIcon } from "../_starter/shared/Icons/PaperPlane";
import { default as ReplyIcon } from "../_starter/shared/Icons/Reply";
import { default as RocketIcon } from "../_starter/shared/Icons/Rocket";

import { IconWrapper } from "../_starter/Navigation/LeftNav/NavLink";
import { getColor } from "../_starter/theme/theme";

import { Button, ButtonGroup } from "./Button";

const ActivityHeader = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 1.125rem;
  color: ${getColor("greyDark")};
`;

const ActivityWrapper = styled.div`
  background: ${getColor("white")};
  margin-bottom: .5rem;
  display: flex;
  
`;

const ActivityTitle = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: .875rem;
  line-height: .875rem;
  color: ${getColor("greyDark")};

  & ${Button} {
    padding-left: 0;
    display: inline-block;
    height: auto;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const ActivitySubtitle = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: .75rem;
  line-height: .75rem;
  color: ${getColor("grey")};
  margin-top: .4rem;
  margin-bottom: 0;
`;

const ActivityDateTimeMarkup = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: .75rem;
  line-height: .75rem;
  color: ${getColor("grey")};

  > p {
    margin-top: 0;
    text-align: right;
  }
`;

const ActivityDateTime = ({ time }) => {
  const dt = new Date(time);
  return (
    <ActivityDateTimeMarkup>
      <p>{dt.toDateString()}</p>
      <p>{dt.toLocaleTimeString()}</p>
    </ActivityDateTimeMarkup>
  );
};

const ActivityIconBackground = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ color }) => color};
  mix-blend-mode: normal;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActivityIcon = styled.div`
  width: 3rem;
  display: flex;
  align-items: center;
`;

const ActivityContentWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${getColor("greyLightest")};
  border-radius: 0.125rem;
  padding: .75rem 1rem;
`;

const VoicemailActivity = ({ occurred_at, dynamic_data }) => {
    const minutes = Math.floor(dynamic_data.voicemail_duration / 60);
    const seconds = dynamic_data.voicemail_duration % 60;
    const voicemailMinutes = `${minutes}:${seconds}`;
    return (
      <>      
        <ActivityIcon>
          <ActivityIconBackground color={getColor("teal")} style={{ opacity: '0.1' }}>
            <IconWrapper>            
             <VoicemailIcon color={getColor("teal")} />
            </IconWrapper>
          </ActivityIconBackground>
        </ActivityIcon>
        <ActivityContentWrapper>
          <div className="flex-col center-content">
            <ActivityTitle>Voicemail Received {voicemailMinutes}</ActivityTitle>
            <ActivitySubtitle>{dynamic_data.user_name}</ActivitySubtitle>
          </div>
          <ActivityDateTime time={occurred_at} />
        </ActivityContentWrapper>
      </>
    );
};

const SuccessActivity = ({ occurred_at, dynamic_data }) => {
    return (
        <>      
            <ActivityIcon>
                <ActivityIconBackground color={"#EDEEFA"}>
                <IconWrapper>            
                    <BadgeIcon color={"#2a409c"} />
                </IconWrapper>
                </ActivityIconBackground>
            </ActivityIcon>
            <ActivityContentWrapper>
                <div className="flex-col center-content">
                <ActivityTitle>Marked as Success</ActivityTitle>
                <ActivitySubtitle>{dynamic_data.user_name}</ActivitySubtitle>
                </div>
                <ActivityDateTime time={occurred_at} />
            </ActivityContentWrapper>
        </>
    );
};

const Components = {
    voicemail: {
      component: VoicemailActivity,
      icon: VoicemailIcon
    },
    success: {
        component: SuccessActivity,
        icon: BadgeIcon
    },
    sent_email: {
        component: 'div',
        icon: PaperPlaneIcon
    },
    email_reply: {
        component: 'div',
        icon: ReplyIcon
    },
    call: {
        component: 'div',
        icon: PhoneIcon
    },
    added_to_cadence: {
        component: 'div',
        icon: RocketIcon
    }
};

const getTypeActivities = (url) => {
    return fetch(url)
      .then(async res => {
        const response = await res.json();
        if(res.ok) return response.data;
        else throw response;
      })
};

const Activity = (props) => {
    const Component = Components[props.type].component;
    return (
      <ActivityWrapper>
        <Component {...props} />
      </ActivityWrapper>
    );
}
  
const ActivityType = ({ url, label }) => {
    const isLoading = useRef(false);
    const [ typeActivities, setTypeActivities ] = useState([]);
    useEffect(() => {
        getTypeActivities(url)
            .then(activities => {
                setTypeActivities(activities)
            })
            .finally(() => isLoading.current = false)
    }, [url]);

    return (
        <div>
            <ActivityHeader>{label}</ActivityHeader>
            {typeActivities.length > 0 && typeActivities.map(activity => (
                <Activity {...activity} key={activity.id}/>
            ))}
            {typeActivities.length === 0 && (<p className="center">Once actions are scheduled, they'll appear here.</p>)}
        </div>
    );
};
  
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
  
export const Activities = ({ activityTypes }) => {
return (
    <>
        <ActivitiesHeader />
        {activityTypes?.map(activityType => <ActivityType key={activityType.label} {...activityType} />)}
    </>
);
};
