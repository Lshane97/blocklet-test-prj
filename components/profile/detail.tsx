import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Divider, List, ListItem, ListItemText } from '@mui/material';

export interface DetailProps {
  profile: Profile;
}

const Detail: FC<DetailProps> = ({ profile }) => {
  const { t } = useTranslation('profile');

  return (
    <List sx={{ width: '100%' }}>
      <ListItem alignItems="flex-start">
        <ListItemText primary={t('profile:Name_Label')} secondary={profile.name} />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText primary={t('profile:Email_Label')} secondary={profile.email} />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText primary={t('profile:Phone_Label')} secondary={profile.phone} />
      </ListItem>
    </List>
  );
};

export default Detail;
