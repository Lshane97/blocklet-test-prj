import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Container, IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Edit, Detail, SkeletonScreen } from '@/components/profile';
import { getUserProfile, postUserProfile } from '@/request/profile';
import message from '@/components/message';

import styles from './index.module.css';

const Profile = () => {
  const { t } = useTranslation(['profile', 'common']);
  const [inEdit, setInEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();

  const onEdit = useCallback(() => {
    setInEdit((prev) => !prev);
  }, []);

  const onSubmit = useCallback(async (newProfile: Profile) => {
    postUserProfile(newProfile).then((resp) => {
      setProfile(resp.data);
      setInEdit(false);
      message.success({ content: t('common:Success') });
    });
  }, []);

  const onLoad = useCallback(() => {
    setLoading(true);
    getUserProfile().then((resp) => {
      setLoading(false);
      setProfile(resp.data);
    });
  }, []);

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Container maxWidth="sm">
      <div className={styles.profileTitleBar}>
        <h2>{t('profile:Title')}</h2>
        {!loading && (
          <Tooltip title={!inEdit && t('common:Edit')}>
            {inEdit ? (
              <Button size="small" variant="text" onClick={onEdit}>
                {t('common:Cancel')}
              </Button>
            ) : (
              <IconButton size="small" sx={{ ml: 1 }} color="inherit" onClick={onEdit}>
                <EditIcon />
              </IconButton>
            )}
          </Tooltip>
        )}
      </div>
      {loading ? (
        <SkeletonScreen />
      ) : inEdit ? (
        <Edit onSubmit={onSubmit} profile={profile!} />
      ) : (
        <Detail profile={profile!} />
      )}
    </Container>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['profile', 'common'])),
    },
  };
}

export default Profile;
