import { Grid } from '@material-ui/core';
import { MoodsCards } from '../../components/MoodsCard';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Router from 'next/router';

export default function MoodsCardList() {
  const classes = useStyles();

  const moods = [
    {
      id: '01',
      image: "https://images.ottplay.com/static/cardmood1.png",
      title: 'Road trips',
    },
    {
      id: '02',
      image: "https://images.ottplay.com/static/cardmood2.png",
      title: 'Zombies',
    },
    {
      id: '03',
      image: "https://images.ottplay.com/static/cardmood3.png",
      title: 'Space',
    },
    {
      id: '04',
      image: "https://images.ottplay.com/static/cardmood4.png",
      title: '80s',
    },
    {
      id: '05',
      image: "https://images.ottplay.com/static/cardmood5.png",
      title: 'Musics',
    },
    {
      id: '06',
      image: "https://images.ottplay.com/static/cardmood6.png",
      title: 'Actions',
    },
    {
      id: '07',
      image: "https://images.ottplay.com/static/cardmood5.png",
      title: 'Musics',
    },
    {
      id: '08',
      image: "https://images.ottplay.com/static/cardmood4.png",
      title: '80s',
    },
    {
      id: '09',
      image: "https://images.ottplay.com/static/cardmood1.png",
      title: 'Road trips',
    },
    {
      id: '10',
      image: "https://images.ottplay.com/static/cardmood2.png",
      title: 'Zombies',
    },
    {
      id: '11',
      image: "https://images.ottplay.com/static/cardmood3.png",
      title: 'Space',
    },
    {
      id: '12',
      image: "https://images.ottplay.com/static/cardmood1.png",
      title: 'Road trips',
    },
    {
      id: '13',
      image: "https://images.ottplay.com/static/cardmood1.png",
      title: 'Road trips',
    },
    {
      id: '14',
      image: "https://images.ottplay.com/static/cardmood2.png",
      title: 'Zombies',
    },
    {
      id: '15',
      image: "https://images.ottplay.com/static/cardmood3.png",
      title: 'Space',
    },
    {
      id: '16',
      image: "https://images.ottplay.com/static/cardmood4.png",
      title: '80s',
    },
    {
      id: '17',
      image: "https://images.ottplay.com/static/cardmood5.png",
      title: 'Musics',
    },
    {
      id: '18',
      image: "https://images.ottplay.com/static/cardmood6.png",
      title: 'Actions',
    },
    {
      id: '19',
      image: "https://images.ottplay.com/static/cardmood5.png",
      title: 'Musics',
    },
    {
      id: '20',
      image: "https://images.ottplay.com/static/cardmood4.png",
      title: '80s',
    },
    {
      id: '21',
      image: "https://images.ottplay.com/static/cardmood1.png",
      title: 'Road trips',
    },
    {
      id: '22',
      image: "https://images.ottplay.com/static/cardmood2.png",
      title: 'Zombies',
    },
    {
      id: '23',
      image: "https://images.ottplay.com/static/cardmood3.png",
      title: 'Space',
    },
    {
      id: '24',
      image: "https://images.ottplay.com/static/cardmood1.png",
      title: 'Road trips',
    },
  ];

  return (
    <div className={classes.root}>
      <Grid xs={12} container>
        <Grid xs={2} item></Grid>
        <Grid xs={8} item container>
          <Grid xs={12} container item>
            {moods.map((mood) => {
              return (
                <Grid xs={2} item>
                  <MoodsCards
                    text={mood.title}
                    image={mood.image}
                    onClick={() => Router.push('./roadtrips')}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid xs={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
});
