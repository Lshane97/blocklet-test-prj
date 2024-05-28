import { useTranslation } from 'next-i18next';
import { Button, CircularProgress, FormControl, TextField } from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import * as v from 'valibot';

import styles from './index.module.css';

export interface EditProps {
  profile: Profile;
  onSubmit: (newProfile: Profile) => Promise<void>;
}

const phoneRegex = /^1[3-9]\d{9}$/;

const Edit: FC<EditProps> = ({ profile, onSubmit }) => {
  const { t } = useTranslation(['profile', 'common']);

  const ProfileSchema = useMemo(
    () =>
      v.object({
        email: v.pipe(
          v.string(),
          v.nonEmpty(t('common:Field_Err_Length_Empty', { key: t('profile:Email_Label') })),
          v.email(t('common:Field_Err_Email_Format'))
        ),
        name: v.pipe(v.string(), v.nonEmpty(t('common:Field_Err_Length_Empty', { key: t('profile:Name_Label') }))),
        phone: v.pipe(
          v.string(),
          v.nonEmpty(t('common:Field_Err_Length_Empty', { key: t('profile:Phone_Label') })),
          v.check((input) => phoneRegex.test(input), t('common:Field_Err_Phone_Format'))
        ),
      }),
    [t]
  );

  const [_profile, setProfile] = useImmer(profile);
  const [errors, setErrors] = useImmer<Profile>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setProfile(profile);
  }, [profile]);

  const onEdit = useCallback(
    async (key: keyof Profile, value: any) => {
      setProfile((draft) => {
        draft[key] = value?.trim?.();
        const result = v.safeParse(ProfileSchema, draft, { abortPipeEarly: true });
        // 清空之前的错误
        setErrors((err) => {
          err[key] = '';
        });
        // 错误原因赋值
        result.issues?.forEach((issue) => {
          setErrors((err) => {
            const key: keyof Profile = (issue.path?.[0] as any)?.key;
            if (key) {
              err[key] = issue.message;
            }
          });
        });
      });
    },
    [t]
  );

  const [loading, setLoading] = useState(false);
  const _onSubmit = useCallback(
    async (profile: Profile) => {
      // 提交校验
      const result = v.safeParse(ProfileSchema, profile, { abortPipeEarly: true });
      if (!result.success) {
        // 触发错误原因赋值
        onEdit('name', profile.name);
        return;
      }
      setLoading(true);
      await onSubmit(profile).finally(() => {
        setLoading(false);
      });
    },
    [onSubmit, t]
  );

  useEffect(() => {
    setProfile((draft) => {
      // 文案更新，触发错误原因更新
      onEdit('name', draft.name);
    });
  }, [t]);

  return (
    <FormControl className={styles.formItem}>
      <TextField
        className={styles.formItem}
        label={t('profile:Name_Label')}
        required
        variant="outlined"
        type="text"
        fullWidth
        value={_profile.name}
        onChange={(e) => onEdit('name', e.target.value?.replaceAll?.(' ', ''))}
        sx={{ mb: 3 }}
        error={!!errors.name}
        helperText={errors.name}
        disabled={loading}
      />
      <TextField
        className={styles.formItem}
        label={t('profile:Email_Label')}
        required
        variant="outlined"
        type="email"
        value={_profile.email}
        onChange={(e) => onEdit('email', e.target.value?.replaceAll?.(' ', ''))}
        sx={{ mb: 3 }}
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
        disabled={loading}
      />
      <TextField
        className={styles.formItem}
        label={t('profile:Phone_Label')}
        required
        variant="outlined"
        type="phone"
        value={_profile.phone}
        onChange={(e) => onEdit('phone', e.target.value?.replaceAll?.(' ', ''))}
        fullWidth
        sx={{ mb: 3 }}
        error={!!errors.phone}
        helperText={errors.phone}
        disabled={loading}
      />

      <Button
        variant="outlined"
        type="submit"
        disabled={loading}
        onClick={() => _onSubmit(_profile)}
        startIcon={loading ? <CircularProgress color="inherit" size={12} /> : undefined}>
        {t('common:Save')}
      </Button>
    </FormControl>
  );
};

export default Edit;
