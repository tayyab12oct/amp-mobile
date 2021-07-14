import { Box, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ImageComponent from './Images';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    margin: '10px',
  },
  card: {
    color: '#150835',
    background: '#100627 0% 0% no-repeat padding-box',
    border: '1px solid #35147A',
    borderRadius: 8,
    opacity: '0.9',
    margin: 6,
    '&.active, &.active:hover': {
      '& $title': {
        color: '#03F87E !important',
        fontSize: 'clamp(13px, 1.2vw, 18px)',
        lineHeight: 'clamp(16px, 1.5vw, 18px)',
        fontWeight: 700,
      },
      '& $providerTitle': {
        color: '#03F87E !important',
        fontSize: 'clamp(10px, 1.2vw, 16px)',
        fontWeight: 700,
        lineHeight: 'clamp(16px, 1.5vw, 18px)',
      },
      '& $icon_box': {
        backgroundColor: 'rgb(3, 248, 126) !important',
      },
      '& $icon': {
        color: 'rgb(1, 2, 3) !important',
      },
      background:
        'transparent radial-gradient(closest-corner at 50% 50%, #4E44BE 0%, #1B0D3A 100%) 0% 0% no-repeat padding-box',
      border: '1px solid #4A3FB3',
    },
    '&:hover': {
      '& $title': {
        fontSize: 'clamp(13px, 1.2vw, 18px)',
        lineHeight: 'clamp(16px, 1.5vw, 18px)',
        fontWeight: 700,
      },
      '& $providerTitle': {
        fontSize: 'clamp(10px, 1.2vw, 16px)',
        fontWeight: 700,
        lineHeight: 'clamp(16px, 1.5vw, 18px)',
      },
      '& $icon_box': {
        backgroundColor: 'rgb(1, 2, 3) !important',
        '& $icon': {
          color: '#A89ABF !important',
        },
      },
      background: '#100627 0% 0% no-repeat padding-box',
      border: '1px solid #35147A',
    },
  },
  title: {
    fontSize: 'clamp(13px, 1.2vw, 18px)',
    color: '#A89ABF',
    fontWeight: 400,
    marginLeft: 8,
  },
  nameTitle: {
    fontSize: 'clamp(13px, 1.2vw, 18px)',
    color: '#A89ABF',
    fontWeight: 400,
    marginLeft: 8,
  },
  providerTitle: {
    fontSize: 'clamp(10px, 1.2vw, 16px)',
    color: '#BEB4D6',
    fontWeight: 400,
    lineHeight: '18px',
    marginLeft: 8,
  },
  icon: {
    font: 'normal normal normal 22px Montserrat',
    fontWeight: 600,
  },
  nameLogo: {
    height: 30,
    width: 40,
  },
  providerLogo: {
    height: 40,
    maxWidth: 70,
  },
  channelProviderImage: {
    height: '49px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // background: '#000000 0% 0% no-repeat padding-box',
    borderRadius: '10%',
    marginLeft: -4,
  },
  channelLanguageImage: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card_selected: {
    color: '#35147A',
    margin: 6,
    '& $title': {
      color: '#03F87E !important',
      fontSize: 'clamp(13px, 1.2vw, 18px)',
      fontWeight: 700,
      lineHeight: 'clamp(16px, 1.5vw, 18px)',
      marginLeft: 8,
    },
    '& $providerTitle': {
      color: '#03F87E !important',
      fontSize: 'clamp(10px, 1.2vw, 16px)',
      fontWeight: 700,
      lineHeight: 'clamp(16px, 1.5vw, 18px)',
      marginLeft: 8,
    },
    '& $nameTitle': {
      color: '#03F87E !important',
      fontSize: 'clamp(13px, 1.2vw, 18px)',
      fontWeight: 700,
      lineHeight: 'clamp(16px, 1.5vw, 18px)',
      marginLeft: 8,
    },
    borderRadius: 8,
    background:
      'transparent radial-gradient(closest-corner at 50% 50%, #4E44BE 0%, #1B0D3A 100%) 0% 0% no-repeat padding-box',
    border: '1px solid #4A3FB3',
  },
  icon_box: {
    width: 43,
    height: 43,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      height: 'auto',
    },
    title: {
      whiteSpace: 'normal',
      fontWeight: 500,
      marginLeft: 4,
    },
    nameTitle: {
      whiteSpace: 'normal',
      marginTop: 5,
      marginBottom: 5,
    },
    providerTitle: {
      whiteSpace: 'normal',
      marginLeft: 4,
    },
    card_selected: {
      borderRadius: 5,
      '& $title': {
        fontWeight: 600,
        marginLeft: 4,
      },
      '& $providerTitle': {
        fontWeight: 600,
        marginLeft: 4,
      },
    },
    nameLogo: {
      height: 20,
      width: 30,
    },
    providerLogo: {
      width: 26,
      height: 26,
    },
    card: {
      borderRadius: 5,
      '&.active, &.active:hover': {
        '& $title': {
          fontWeight: 600,
        },
        '& $providerTitle': {
          fontWeight: 600,
        },
      },
      '&:hover': {
        '& $icon_box': {
          backgroundColor: 'rgb(1, 2, 3) !important',
          '& $icon': {
            color: '#A89ABF !important',
          },
        },
        '& $title': {
          color: '#A89ABF !important',
          fontWeight: 600,
        },
        '& $providerTitle': {
          color: '#A89ABF !important',
          fontWeight: 600,
        },
        '& $nameTitle': {
          color: '#A89ABF !important',
          fontWeight: 600,
        },
        background: '#100627 0% 0% no-repeat padding-box',
        border: '1px solid #35147A',
      },
    },
    channelProviderImage: {
      borderRadius: 5,
      width: 40,
      height: 25,
      marginLeft: 0,
    },
    icon: {
      fontSize: 16,
    },
    icon_box: {
      width: 30,
      height: 30,
    },
  },
}));

const CustomCardContent = withStyles((theme) => ({
  root: {
    padding: '10px 16px !important',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: '8px 10px !important',
    },
  },
}))(CardContent);

export function RefineCard(props) {
  const classes = useStyles();
  const { item, type, onSelect, isSelected } = props;
  // console.log('provider', item);

  return (
    <React.Fragment>
      <Card
        className={
          isSelected
            ? [classes.root, classes.card_selected].join(' ')
            : [classes.root, classes.card].join(' ')
        }
        onClick={onSelect}
      >
        <CustomCardContent>
          <Grid
            xs={12}
            direction="row"
            alignItems="center"
            item
            container
            // style={{ marginTop: type === 'Languages' ? '1%' : '' }}
          >
            {(item.hasOwnProperty('icon') ||
              item.hasOwnProperty('logo_url') ||
              item.hasOwnProperty('language') ||
              item.hasOwnProperty('provider')) &&
              (item.icon ||
                item.logo_url ||
                (item.hasOwnProperty('provider') && item.provider.logo_url) ||
                (item.hasOwnProperty('provider') && item.provider.icon_url) ||
                (item.hasOwnProperty('language') && item.language.logo_text) ||
                (item.hasOwnProperty('language') &&
                  item.language.icon_text)) && (
                <Grid
                  xs={3}
                  lg={type === 'Languages' ? 3 : 5}
                  item
                  className={
                    type === 'Provider'
                      ? classes.channelProviderImage
                      : classes.channelLanguageImage
                  }
                >
                  {type === 'Languages' ? (
                    <Box
                      className={classes.icon_box}
                      style={{
                        backgroundColor: isSelected ? '#03F87E ' : '#010203',
                        color: isSelected ? '#000000' : '#03F87E',
                      }}
                    >
                      <Typography
                        className={classes.icon}
                        style={{
                          color: isSelected ? '#000000' : '#A89ABF',
                        }}
                      >
                        {item.language.icon_text}
                      </Typography>
                    </Box>
                  ) : (
                    <ImageComponent
                      src={
                        item.logo_url !== undefined
                          ? item.logo_url
                          : item.hasOwnProperty('provider') &&
                            item.provider.logo_url
                          ? item.provider.logo_url
                          : ''
                      }
                      className={
                        type === 'Provider'
                          ? classes.providerLogo
                          : classes.nameLogo
                      }
                      alt="streaming_service_logo"
                    />
                  )}
                </Grid>
              )}
            <Grid
              xs={
                item.icon ||
                item.logo_url ||
                (item.hasOwnProperty('language') &&
                  (item.language.icon_text || item.language.logo_text)) ||
                (item.hasOwnProperty('provider') &&
                  (item.provider.icon_url || item.provider.logo_url))
                  ? 9
                  : 12
              }
              lg={
                type === 'Languages'
                  ? item.icon ||
                    item.logo_url ||
                    (item.hasOwnProperty('language') &&
                      (item.language.icon_text || item.language.logo_text))
                    ? 9
                    : 12
                  : item.icon ||
                    item.logo_url ||
                    (item.hasOwnProperty('provider') &&
                      (item.provider.icon_url || item.provider.logo_url))
                  ? 7
                  : 12
              }
              item
            >
              {item.primary_title ? (
                <Typography noWrap className={classes.nameTitle}>
                  {item.primary_title}
                </Typography>
              ) : item.language && item.language.name ? (
                <Typography noWrap className={classes.title}>
                  {item.language.name}
                </Typography>
              ) : item.provider && item.provider.name ? (
                <Typography className={classes.providerTitle}>
                  {item.provider.name}
                </Typography>
              ) : item.name ? (
                <Typography noWrap className={classes.nameTitle}>
                  {item.name}
                </Typography>
              ) : item.label ? (
                <Typography noWrap className={classes.nameTitle}>
                  {item.label}
                </Typography>
              ) : null}
              {item.secondary_title ? (
                <Typography noWrap className={classes.title}>
                  {item.secondary_title}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </CustomCardContent>
      </Card>
    </React.Fragment>
  );
}
