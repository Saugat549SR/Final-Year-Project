import React from 'react';
import { styled, Box, Stack, Typography } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const SocialBox = styled(Box)({
  display: 'flex',
  gap: 10,
  color: 'white',
});

const Footer = () => {
  return (
    <Box
      sx={{ background: '#202029', height: '300px' }}
      mt={5}

      // direction={{ xs: 'row', sm: 'row' }}
    >
      <Stack direction={{ xs: 'row', md: 'row' }} p={7}>
        <Box flex={2}>
          <Typography color={'white'}>Contact Us</Typography>
          <Typography color={'white'}>Contact Us</Typography>
          <Typography color={'white'}>Contact Us</Typography>
          <Typography color={'white'}>Contact Us</Typography>
        </Box>
        <Box flex={2}>
          <Typography color={'white'}>Data Policy</Typography>
          <Typography color={'white'}>Data Safty</Typography>
          <Typography color={'white'}>Email</Typography>
        </Box>
        <Box>
          <Typography color={'white'}>Follow Us</Typography>
          <SocialBox>
            <Facebook />
            <Instagram />
            <Twitter />
          </SocialBox>
        </Box>
      </Stack>
      <hr />
      <Typography color={'white'} variant={'body2'} align="center">
        &copy;{new Date().getFullYear()} BikeBarn | All right reserved | Terms
        of Service | Privacy
      </Typography>
    </Box>
  );
};

export default Footer;
