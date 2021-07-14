// import { Theme, makeStyles } from '@material-ui/core';

// import React from 'react';
// import ImageComponent from '../Images';

// export function LeftPanel({ ...props }) {
//   const sources = [
//     {
//       sources: [
//         { label: 'All', isSelected: false },
//         { label: 'Hindustan Times', isSelected: false },
//         { label: 'Live Mint', isSelected: false },
//         { label: 'Desi Martini', isSelected: false },
//         { label: 'Film Companion', isSelected: false },
//       ],
//     },
//     {
//       sources: [
//         { label: 'Bollywood news', isSelected: false },
//         { label: 'Hollywood news', isSelected: false },
//         { label: 'Tamil news', isSelected: false },
//         { label: 'Telugu news', isSelected: false },
//         { label: 'Kannada news', isSelected: false },
//         { label: 'Malayalam news', isSelected: false },
//       ],
//     },
//     {
//       sources: [
//         { label: 'Movies', isSelected: false },
//         { label: 'shows', isSelected: false },
//         { label: 'Documentary', isSelected: false },
//         { label: 'TV', isSelected: false },
//         { label: 'Web series', isSelected: false },
//       ],
//     },
//   ];

//   const [source, setSource] = React.useState(sources);
//   const [selectedSource, setSelectedSource] = React.useState([]);
//   const { result, type } = props;
//   const classes = useStyles();

//   const handleCardClick = (url) => {
//     window.open(url, '_blank');
//   };

//   const selectCatHandler = (i, j) => {
//     const data = source;
//     const selectedSources: any = [];
//     console.log('data:********************', i, j, data);
//     if (i === 0 && j === 0) {
//       selectedSources.push('All');
//       const datas = source.map((src) => {
//         src.sources.map((item) => {
//           return (item.isSelected = !item.isSelected);
//         });
//       });
//       setSource(data);
//     } else {
//       data[i].sources[j].isSelected = !data[i].sources[j].isSelected;
//       setSource(data);
//     }

//     source.map((item, i) => {
//       item.sources.map((cat, j) => {
//         cat.isSelected && cat.label !== 'All'
//           ? selectedSources.push(cat.label)
//           : '';
//       });
//     });
//     setSelectedSource(selectedSources);
//     console.log('source:********************', i, j, source);
//     props.getSelectedSource(selectedSource);
//   };

//   React.useEffect(() => {}, [source, selectedSource]);

//   return (
//     <React.Fragment>
//       <div className={classes.newsContainer} style={{ marginTop: '5%' }}>
//         {source.map((item, i) => {
//           return (
//             <div className={classes.sourceBox}>
//               {i === 0 && <p className={classes.title}>Source</p>}
//               {item.sources.map((category, j) => {
//                 return (
//                   <div
//                     className={
//                       category.isSelected ? classes.activeLabel : classes.labels
//                     }
//                     onClick={() => selectCatHandler(i, j)}
//                   >
//                     <div>{category.label}</div>
//                     {category.isSelected && (
//                       <div className={classes.activeImage}>
//                         <ImageComponent src="https://images.ottplay.com/static/active.svg'" alt="active icon" />
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </div>
//     </React.Fragment>
//   );
// }

// const useStyles = makeStyles((theme: Theme) => ({
//   newsContainer: {
//     width: '100%',
//     display: 'grid',
//     // gridTemplateColumns: 'repeat(auto-fit, 31.33%)',
//     // gap: '0 3%',
//     padding: '0.5rem 0',
//     color: '#ffffff',
//   },
//   title: {
//     // top: '310px',
//     // left: '330px',
//     width: '61px',
//     height: '0px',
//     textAlign: 'left',
//     font: 'normal normal 600 15px/16px Montserrat',
//     letterSpacing: '0px',
//     color: '#FFFFFF',
//     textTransform: 'capitalize',
//     opacity: 1,
//     padding: '0px 17px',
//   },
//   sourceBox: {
//     top: '297px',
//     left: '310px',
//     width: '90%',
//     height: 'auto',
//     minHeight: '200px',
//     // background: '#FFFFFF 0% 0% no-repeat padding-box',
//     borderRadius: '6px',
//     // opacity: 0.03,
//     margin: '0% 0% 2% 1%',
//     backgroundColor: 'rgba(255, 255, 255, .03)',
//     backdropFilter: 'blur(5px)',
//     flexWrap: 'wrap',
//     padding: '0 0 3% 0',
//   },

//   labels: {
//     top: '310px',
//     left: '330px',
//     // width: '61px',
//     height: '19px',
//     textAlign: 'left',
//     font: 'normal normal medium 14px/16px Montserrat',
//     letterSpacing: '0px',
//     color: '#A89ABF',
//     textTransform: 'capitalize',
//     opacity: 1,
//     padding: '17px',
//     display: 'flex',
//     cursor: 'pointer',
//   },
//   activeImage: {
//     position: 'absolute',
//     right: '20px',
//   },
//   activeLabel: {
//     top: '310px',
//     left: '330px',
//     height: '19px',
//     textAlign: 'left',
//     font: 'normal normal medium 14px/16px Montserrat',
//     letterSpacing: '0px',
//     textTransform: 'capitalize',
//     opacity: 1,
//     padding: '17px',
//     display: 'flex',
//     cursor: 'pointer',
//     color: '#29F87E',
//   },
// }));

import { Theme, makeStyles } from '@material-ui/core';

import React from 'react';

import ImageComponent from '../Images';

export function LeftPanel({ ...props }) {
  const sources = [
    {
      sources: [
        { label: 'All', isSelected: false },
        { label: 'Hindustan Times', isSelected: false },
        { label: 'Live Mint', isSelected: false },
        { label: 'Desi Martini', isSelected: false },
        { label: 'Film Companion', isSelected: false },
      ],
    },
    {
      sources: [
        { label: 'Bollywood news', isSelected: false },
        { label: 'Hollywood news', isSelected: false },
        { label: 'Tamil news', isSelected: false },
        { label: 'Telugu news', isSelected: false },
        { label: 'Kannada news', isSelected: false },
        { label: 'Malayalam news', isSelected: false },
      ],
    },
    {
      sources: [
        { label: 'Movies', isSelected: false },
        { label: 'shows', isSelected: false },
        { label: 'Documentary', isSelected: false },
        { label: 'TV', isSelected: false },
        { label: 'Web series', isSelected: false },
      ],
    },
  ];

  const [source, setSource] = React.useState(sources);
  const [selectedSource, setSelectedSource] = React.useState([]);
  const { result, type } = props;
  const classes = useStyles();

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  const selectCatHandler = (i, j) => {
    const data = source;
    const selectedSources: any = [];
    if (i === 0 && j === 0) {
      selectedSources.push('All');
      const datas = source.map((src) => {
        src.sources.map((item) => {
          return (item.isSelected = !item.isSelected);
        });
      });
      setSource(data);
    } else {
      data[i].sources[j].isSelected = !data[i].sources[j].isSelected;
      setSource(data);
    }

    source.map((item, i) => {
      item.sources.map((cat, j) => {
        cat.isSelected && cat.label !== 'All'
          ? selectedSources.push(cat.label)
          : '';
      });
    });
    setSelectedSource(selectedSources);
    props.getSelectedSource(selectedSource);
  };

  React.useEffect(() => {}, [source, selectedSource]);

  return (
    <>
      <div className={classes.newsContainer} style={{ marginTop: '5%' }}>
        {source.map((item, i) => {
          return (
            <div className={classes.sourceBox}>
              {i === 0 && <p className={classes.title}>Source</p>}
              {item.sources.map((category, j) => {
                return (
                  <div
                    className={
                      category.isSelected ? classes.activeLabel : classes.labels
                    }
                    onClick={() => selectCatHandler(i, j)}
                  >
                    <div>{category.label}</div>
                    {category.isSelected && (
                      <div className={classes.activeImage}>
                        <ImageComponent src="https://images.ottplay.com/static/active.svg" alt="active icon" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  newsContainer: {
    width: '100%',
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fit, 31.33%)',
    // gap: '0 3%',
    padding: '0.5rem 0',
    color: '#ffffff',
  },
  title: {
    // top: '310px',
    // left: '330px',
    width: '61px',
    height: '0px',
    textAlign: 'left',
    font: 'normal normal 600 15px/16px Montserrat',
    letterSpacing: '0px',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    opacity: 1,
    padding: '0px 17px',
  },
  sourceBox: {
    top: '297px',
    left: '310px',
    width: '90%',
    height: 'auto',
    minHeight: '200px',
    // background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '6px',
    // opacity: 0.03,
    margin: '0% 0% 2% 1%',
    backgroundColor: 'rgba(255, 255, 255, .03)',
    backdropFilter: 'blur(5px)',
    flexWrap: 'wrap',
    padding: '0 0 3% 0',
  },

  labels: {
    top: '310px',
    left: '330px',
    // width: '61px',
    height: '19px',
    textAlign: 'left',
    font: 'normal normal medium 14px/16px Montserrat',
    letterSpacing: '0px',
    color: '#A89ABF',
    textTransform: 'capitalize',
    opacity: 1,
    padding: '17px',
    display: 'flex',
    cursor: 'pointer',
  },
  activeImage: {
    position: 'absolute',
    right: '20px',
  },
  activeLabel: {
    top: '310px',
    left: '330px',
    height: '19px',
    textAlign: 'left',
    font: 'normal normal medium 14px/16px Montserrat',
    letterSpacing: '0px',
    textTransform: 'capitalize',
    opacity: 1,
    padding: '17px',
    display: 'flex',
    cursor: 'pointer',
    color: '#29F87E',
  },
}));
