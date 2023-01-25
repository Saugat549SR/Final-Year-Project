import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Banner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '98.9 %',
  height: '100%',
  padding: '2px 8px',

  backgroundColor: '#D3D3D3',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

const BannerContent = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'centre',
  flexDirection: 'column',
  padding: '30px',
  maxWidth: '420',
}));

const Title = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: '70px',
  marginBottom: '20px',
  marginRight: '100px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '35px',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
  },
}));

const Image = styled('img')(({ src, theme }) => ({
  flex: 1,
  src: `url(${src})`,
  width: '100%',
  height: '50vh',
  objectFit: 'contain',
  [theme.breakpoints.down('md')]: {
    width: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '180px',
  },
}));

const Wrapper = styled('div')`
  display: flex;
  justifycontent: center;
`;

export const Feed = () => {
  return (
    <Banner>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Thumbs, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        effect={'slide'}
        sx={{ display: 'flex' }}
      >
        {sliderItems.map((product) => (
          <SwiperSlide key={product.id}>
            <Wrapper>
              <Image src={product.img} />
              <BannerContent>
                <Typography fontSize={{ xs: '9px', sm: '18px' }}>
                  Own your dream bike
                </Typography>
                <Title variant="h2">{product.title}</Title>
                <Description fontSize={{ xs: '9px', sm: '18px' }}>
                  {product.desc}
                </Description>
              </BannerContent>
            </Wrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Banner>
  );
};

const sliderItems = [
  {
    id: 1,
    title: 'BUY',
    img: 'https://cdn.enepsters.com/wp-content/uploads/2020/09/ktm-duke-200-2020-1.jpg',
    desc: 'Ride better',
  },
  {
    id: 2,
    title: 'SELL',
    img: 'https://www.pngitem.com/pimgs/m/478-4787859_supreme-honda-dirt-bike-hd-png-download.png',
    desc: 'Ride better',
  },
  {
    id: 3,
    title: 'RENT',
    img: 'https://cdp.azureedge.net/products/USA/HD/2022/MC/SOFTAIL/HERITAGE_CLASSIC_114/50/BLACK_CHROME_TRIM_OPTION_-_LACE_WHEEL_OPTIONS/2000000001.jpg',
    desc: 'Ride better',
  },
];
