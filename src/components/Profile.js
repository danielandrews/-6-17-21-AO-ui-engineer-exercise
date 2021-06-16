import styled from "styled-components";

import { IconWrapper } from "../_starter/Navigation/LeftNav/NavLink";
import { getColor } from "../_starter/theme/theme";

import { default as SalesForceLogo } from "../_starter/shared/Icons/Cloud";
import { default as LinkedLogo } from "../_starter/shared/Icons/LinkedIn";
import { default as TwitterLogo } from "../_starter/shared/Icons/Twitter";
import { default as LinkIcon } from "../_starter/shared/Icons/Link";

const ProfileHeader = styled.header`
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
`;

const ProfileContent = styled.p`
  font-size: .875rem;
  text-align: center;
  margin-top: .5rem;
  margin-bottom: 0;
`;

const ProfileCompanyLink = styled.a`
  font-size: .875rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  color: #337AB7;
  :visited{ 
    color: #337AB7;
    text-decoration: none;
  }
  :hover {
    text-decoration: underline;
  }
`;

const ProfileContactsWrapper = styled.div`
  width: 100%;
  margin: 1rem auto;
`;

const ProfileContactLink = ({ Icon, color, label, link }) => {
  return (
    <a aria-label={`${label} profile`} href={link} target="_blank" rel="noreferrer" className="ml-1">
      <IconWrapper display="inline">
          <Icon color={getColor(color)} />
      </IconWrapper>
    </a>
  );
};

const ProfileContactLinks = ({ linkedInUrl, crmUrl, twitterHandle, personalWebsite }) => {
  const profileContacts = [
    {
      label: 'SalesForce',
      Icon: SalesForceLogo,
      color: 'vendorSalesforceBlue',
      link: crmUrl
    },
    {
      label: 'LinkedIn',
      Icon: LinkedLogo,
      color: 'vendorLinkedInBlue',
      link: linkedInUrl
    },
    {
      label: 'Twitter',
      Icon: TwitterLogo,
      color: 'vendorTwitterBlue',
      link: `//twitter.com/${twitterHandle}`
    },
    {
      label: 'Personal Website',
      Icon: LinkIcon,
      color: 'greyDarkest',
      link: personalWebsite
    }
  ];

  return (
    <ProfileContactsWrapper>
      {profileContacts.map(contact => (
        <ProfileContactLink key={contact.label} {...contact} />
      ))}
    </ProfileContactsWrapper>
  );
};

const ProfileWrapper = styled.div`
    text-align: center;
    height: 100%;
`;

export const Profile = ({ profile }) => {
  const { display_name, title, person_company_name, person_company_website, linkedin_url, crm_url, twitter_handle, personal_website } = profile;
  return (
    <ProfileWrapper>
      <ProfileHeader>{display_name}</ProfileHeader>
      <ProfileContent>{title}</ProfileContent>
      <ProfileCompanyLink href={person_company_website} target="_blank" rel="noreferrer">{person_company_name}</ProfileCompanyLink>
      <ProfileContactLinks linkedInUrl={linkedin_url} crmUrl={crm_url} twitterHandle={twitter_handle} personalWebsite={personal_website} />
    </ProfileWrapper>
  )
};