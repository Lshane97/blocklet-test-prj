import { useContext } from 'react';
import { ThemeContext } from './context';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);

  const router = useRouter();
  const { locales, locale: currentLocale } = router;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        p: 3,
      }}>
      <Select value={currentLocale} sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}>
        {locales?.map((v) => (
          <MenuItem key={v} value={v}>
            <Link href={router.asPath} locale={v} passHref style={{ width: '100%' }}>
              {v.toUpperCase()}
            </Link>
          </MenuItem>
        ))}
      </Select>
      <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default Header;
