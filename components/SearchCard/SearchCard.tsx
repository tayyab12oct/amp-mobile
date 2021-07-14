import Card from 'react-bootstrap/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import ImageComponent from '../Images';
import React from 'react';
import { ViewportContext } from '../ViewportProvider';

export function SearchCard({ details, ...props }) {
  const { width } = React.useContext(ViewportContext);
  const [load, setLoad] = React.useState(false);

  const renderMobileSearch = () => {
    return (
      <Grid container direction="row" xs={12} onClick={props.onClick}>
        <Grid container direction="row" xs={2}>
          <Card className="searchCardroot">
            <CardMedia
              className="cardImage"
              style={{
                maxHeight:
                  width > 1300 ? '240px' : width > 600 ? '210px' : '90',
                height: width > 1300 ? '240px' : width > 600 ? '210px' : '90',
              }}
              component="img"
              alt="card Image"
              image={
                load
                  ? props.image ||
                    'https://images.ottplay.com/static/poster_default.png'
                  : 'https://images.ottplay.com/static/poster_default.png'
              }
              title="card Image"
              onLoad={() => setLoad(true)}
            />
          </Card>
        </Grid>
        <Grid container direction="row" className="cardBox" xs={10}>
          <Card.Body>
            <Card.Title className="searchCardTitle">{props.name}</Card.Title>
            <Card.Text className="imdbmoviespan">
              <span className="cardTextRoot">
                {props.type === 'actor' ? null : props.rating ||
                  (details.details && details.details.ottplay_rating) ? (
                  <span className="imdbTag">
                    <span className="imdbText">
                      {props.rating}
                      <ImageComponent
                        src="https://images.ottplay.com/static/reel_logo.png"
                        alt="ottplay rating icon"
                        style={{ width: '18px', marginLeft: '5px' }}
                      />
                      <b className="imdbRating">OTTplay Rating</b>
                    </span>
                  </span>
                ) : null}
                <span className="searchCardtype">
                  <span className="typeText">
                    {props.type}
                    <span style={{ margin: '0 2%' }}>.</span>
                    {props.year}
                  </span>
                </span>
              </span>
            </Card.Text>
            <p className="searchDescription">
              {props.type === 'actor' ||
              props.type === 'cast' ||
              props.type === 'crew'
                ? null
                : props.description}
            </p>
          </Card.Body>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={props.className}>
      {width < 600 ? (
        renderMobileSearch()
      ) : (
        <Grid
          container
          // spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
          xs={12}
          className="searchCardBox"
        >
          <Card className="searchCardroot" onClick={props.onClick}>
            <div className="cardWrap">
              <div className="cardMainContent">
                <CardMedia
                  className={['cardImage', 'center'].join(' ')}
                  component="img"
                  alt="card Image"
                  image={
                    load
                      ? props.image ||
                        'https://images.ottplay.com/static/poster_default.png'
                      : 'https://images.ottplay.com/static/poster_default.png'
                  }
                  title="card Image"
                  onLoad={() => setLoad(true)}
                />
              </div>
            </div>

            <Card.Body>
              <Card.Title className="searchCardTitle">{props.name}</Card.Title>
              <Card.Text className="imdbmoviespan">
                <span className="cardTextRoot">
                  {props.type === 'actor' ? null : props.rating ||
                    (details.details && details.details.ottplay_rating) ? (
                    <span className="imdbTag">
                      <span className="imdbText">
                        {props.rating}
                        <ImageComponent
                          src="https://images.ottplay.com/static/reel_logo.png"
                          alt="ottplay rating icon"
                          style={{ width: '18px', marginLeft: '5px' }}
                        />
                        <b className="imdbRating">OTTplay Rating</b>
                      </span>
                    </span>
                  ) : null}
                  <span className="searchCardtype">
                    <span className="typeText">
                      {props.type}
                      <span style={{ margin: '0 2%' }}>.</span>
                      {props.year}
                    </span>
                  </span>
                </span>
              </Card.Text>
              <p className="searchDescription">
                {' '}
                {props.type === 'actor' ||
                props.type === 'cast' ||
                props.type === 'crew'
                  ? null
                  : props.description}
              </p>
            </Card.Body>
          </Card>
        </Grid>
      )}
    </div>
  );
}

export function SearchActorCard(props) {
  const [hover, setHover] = React.useState(false);
  const { width } = React.useContext(ViewportContext);
  const [load, setLoad] = React.useState(false);
  return (
    <div className={props.className}>
      <Grid
        container
        // spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        xs={12}
      >
        <Card className="searchCardroot">
          <div className="cardWrap">
            <div className="cardMainContent">
              <CardMedia
                className={['cardImage', 'center'].join(' ')}
                component="img"
                alt="card Image"
                image={
                  load
                    ? props.image ||
                      'https://images.ottplay.com/static/poster_default.png'
                    : 'https://images.ottplay.com/static/poster_default.png'
                }
                title="card Image"
                onLoad={() => setLoad(true)}
              />
            </div>
          </div>

          <Card.Body>
            <Card.Title className="searchCardTitle">{props.name}</Card.Title>
            <Card.Text className="imdbmoviespan">
              <span className="cardTextRoot">
                {/* <span className="imdbTag">
                  <span className="imdbText">
                    {props.rating || 0}
                    <ImageComponent
                      src={imdbTag}
                      alt=""
                      style={{ width: '18px', marginLeft: '5px' }}
                    />
                  </span>
                </span> */}
                <span className="searchCardtype">
                  <span className="typeText">
                    {props.type}.{props.year}
                  </span>
                </span>
              </span>
            </Card.Text>
            <p className="searchDescription">
              {props.type === 'actor' || props.type === 'cast'
                ? null
                : props.description}
            </p>
          </Card.Body>
        </Card>
      </Grid>
    </div>
  );
}
