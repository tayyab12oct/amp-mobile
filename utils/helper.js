import { DATE_FORMATE } from '../utils/constants';
import { IMAGES } from '../public/static/newImages';
import moment from 'moment';
export const timeConvert = (num) => {
  if (num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    const hoursText = hours && hours !== 0 ? `${hours} Hr` : '';
    const minitsText = minutes && minutes !== 0 ? `${minutes} Min` : '';
    return `${hoursText} ${minitsText} `;
  }
  return '';
};

export const contentTypeList = [
  {
    id: 1,
    label: 'Movies',
    value: 'movie',
  },
  {
    id: 2,
    label: 'Shows',
    value: 'show',
  },
  // {
  //   id: 3,
  //   label: 'Documentaries',
  // },
  // { id: 4, label: 'Short Film' },
];
export const contentRatingList = [
  {
    id: 1,
    primary_title: 'Unrestricted public',
    secondary_title: 'U',
  },
  {
    id: 2,
    primary_title: 'Parental guidance',
    secondary_title: 'U/A',
  },
  {
    id: 3,
    primary_title: 'Restricted to adults',
    secondary_title: 'A',
  },
  // {
  //   id: 4,
  //   primary_title: 'Mature Audience',
  //   secondary_title: 'R, NC-17, TV-MA, AR',
  // },
];
export const newsSourceList = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'OTTplay',
  },
  {
    id: 3,
    label: 'Hindustan Times',
  },
  {
    id: 4,
    label: 'Live Mint',
  },
  {
    id: 5,
    label: 'Desi Martini',
  },
  {
    id: 6,
    label: 'Film Companion',
  },
];
export const qualityOptions = [
  {
    id: 1,
    label: 'SD',
  },
  {
    id: 2,
    label: 'HD',
  },
  {
    id: 3,
    label: '4K',
  },
  // {
  //   id: 4,
  //   label: '3D',
  // },
];

export const runtimeMinutesOptions = [
  {
    id: 1,
    name: '15 Mins',
    label: '15 Mins',
    label2: '1 Mins',
  },
  {
    id: 2,
    name: '30 Mins',
    label: '30 Mins',
    label2: '16 Mins',
  },
  {
    id: 3,
    name: '45 Mins',
    label: '45 Mins',
    label2: '31 Mins',
  },
  {
    id: 4,
    name: '60 Mins',
    label: '60 Mins',
    label2: '46 Mins',
  },
  {
    id: 5,
    name: '90 Mins',
    label: '90 Mins',
    label2: '61 Mins',
  },
  {
    id: 6,
    name: '120 Mins',
    label: '120 Mins',
    label2: '91 Mins',
  },
  {
    id: 7,
    name: '180 Mins',
    label: '180 Mins',
    label2: '121 Mins',
  },
  {
    id: 8,
    name: 'Above 180 Mins',
    label: '500 Mins',
    label2: '181 Mins',
  },
];

export const freePaidList = [
  {
    id: 1,
    label: 'Free',
    value: 'free',
  },
  {
    id: 2,
    label: 'Subscription',
    value: 'subscription',
  },
  {
    id: 3,
    label: 'Buy',
    value: 'buy',
  },
];

export const getheaderHeight = () => {
  const headerElement = document.getElementById('web-main-header');
  if (headerElement) {
    return headerElement.clientHeight + 'px';
  }
};

export const removeHTMLTags = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value
    .replace(/(<\/strong>)/gi, ': ')
    .replace(/(<([^>]+)>)/gi, ' ');
};

export const abbreviateNumber = (value) => {
  if (value > 99999) {
    const shortValue = parseFloat(value) / 1000;
    if (parseFloat(shortValue.toFixed(1)) === shortValue) {
      return parseInt(shortValue) + 'K';
    }
    return parseInt(shortValue) + 'K+';
  } else {
    return value;
  }
};

export const timeSince = (date) => {
  const currentDate = moment(new Date());
  const publishedDate = moment(date);
  const seconds = Math.floor(currentDate.diff(publishedDate, 'seconds'));
  // const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 2592000;
  if (interval > 2) {
    return getFormattedDateToDisplay(date, DATE_FORMATE.MONTH_FORMATTED);
  }
  if (Math.floor(interval) === 1) {
    return 'Month ago';
  }
  if (interval > 1) {
    return Math.floor(interval) + ` months ago`;
  }
  interval = seconds / 86400;
  if (Math.floor(interval) === 1) {
    return `Yesterday`;
  }
  if (interval > 1) {
    return Math.floor(interval) + ` days ago`;
  }
  interval = seconds / 3600;
  if (Math.floor(interval) === 1) {
    return `Hour ago`;
    // return `Hour ago ${date}`;
  }
  if (interval > 1) {
    return Math.floor(interval) + ` hours ago`;
  }
  interval = seconds / 60;
  if (Math.floor(interval) === 1) {
    return 'Min ago';
  }
  if (interval > 1) {
    return Math.floor(interval) + ` mins ago`;
  }

  return `Just now`;
};

export const getFormattedDateToDisplay = (
  date,
  format = DATE_FORMATE.MONTH_FORMATTED
) => {
  if (date)
    return moment(date)
      .format(format)
      .toString();
  else return null;
};

export const formatTimeAgo = (inputDate) => {
  let formattedDateResult = '';
  // let formattedData = inputDate.substring(0, 10);
  // formattedData = `${formattedData} ${inputDate.substring(11, 19)}`

  const givenYear = Number(inputDate.substring(0, 4));
  const givenMonth = Number(inputDate.substring(5, 7));
  const givenDay = Number(inputDate.substring(8, 10));
  const givenHour = Number(inputDate.substring(11, 13));
  const givenMinutes = Number(inputDate.substring(14, 16));
  const givenSeconds = Number(inputDate.substring(17, 19));

  const dateToday = new Date();
  const CurrentYear = dateToday.getFullYear();
  let currentMonth = dateToday.getMonth() < 12 ? dateToday.getMonth() + 1 : 1;
  currentMonth = Number(currentMonth);
  let currentDay =
    dateToday.getDate() < 10
      ? `0${dateToday.getDate()}`
      : `${dateToday.getDate()}`;
  currentDay = Number(currentDay);
  let currentHour =
    dateToday.getHours() < 12
      ? `0${dateToday.getHours()}`
      : `${dateToday.getHours()}`;
  currentHour = Number(currentHour);
  const currentMinute = dateToday.getMinutes();
  const currentSeconds = dateToday.getSeconds();

  if (givenYear === CurrentYear) {
    if (givenMonth === currentMonth) {
      if (currentDay === givenDay) {
        if (currentHour === givenHour) {
          if (currentMinute === givenMinutes) {
            if (currentSeconds === givenSeconds) {
              formattedDateResult = 'Just now';
            }
            formattedDateResult =
              60 - givenSeconds === 1
                ? `${givenSeconds} Second ago`
                : `${givenSeconds} Seconds ago`;
          }
          formattedDateResult =
            60 - givenMinutes === 1
              ? `${givenMinutes} Min ago`
              : `${givenMinutes} Mins ago`;
        }
        formattedDateResult =
          24 - givenHour === 1
            ? `${givenHour} Hour ago`
            : `${givenHour} Hours ago`;
      } else if (currentDay - givenDay === 1) {
        formattedDateResult = 'Yesterday';
      } else {
        formattedDateResult =
          currentDay - givenDay === 1
            ? `${currentDay - givenDay} day ago`
            : `${currentDay - givenDay} days ago`;
      }
    } else if (givenMonth < 3) {
      formattedDateResult =
        givenMonth === 1
          ? `${givenMonth} Month ago`
          : `${givenMonth} Months ago`;
    } else {
      formattedDateResult = `${givenDay}-${givenMonth}-${givenYear}`;
    }
  } else {
    formattedDateResult = `${givenDay}-${givenMonth}-${givenYear}`;
  }
  return formattedDateResult;
};

export const hideForProduction = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    return false;
  } else return true;
};

export const envSetup = () => {
  process.env['production'] = JSON.stringify({
    production: { REACT_APP_ENV: 'production' },
  });
};

export const getCardSize = (array, type = null, gridCount) => {
  if (gridCount) {
    return `repeat(${gridCount}, minmax(150px, 1fr))`;
  } else if (type && (type === 'home' || type === 'widget')) {
    return 'repeat(10, minmax(190px, 1fr))';
  } else if (array && array.length < 6) {
    return 'repeat(auto-fit, minmax(150px, 170px))';
  } else {
    return 'repeat(auto-fit, minmax(150px, 1fr))';
  }
};

export const getWebpUrl = (
  imageUrl,
  dimension = { width: null, height: null }
) => {
  if (dimension.width && dimension.height) {
    return `${imageUrl}?impolicy=ottplay-20210210&width=${dimension.width}&height=${dimension.height}`;
  } else if (dimension.width) {
    return `${imageUrl}?impolicy=ottplay-20210210&width=${dimension.width}`;
  } else if (dimension.height) {
    return `${imageUrl}?impolicy=ottplay-20210210&height=${dimension.height}`;
  }
  return `${imageUrl}?impolicy=ottplay-20210210`;
};

// export const getWebpUrl = (
//   imageUrl,
//   dimension = { width: null, height: null }
// ) => {
//   if (dimension.width && dimension.height) {
//     return `${imageUrl}`;
//   } else if (dimension.width) {
//     return `${imageUrl}`;
//   } else if (dimension.height) {
//     return `${imageUrl}`;
//   }
//   return `${imageUrl}`;
// };

export const getJustString = (value) => {
  return value.replace(/\s/g, '').toLowerCase();
};

export const getNewsSourceLogo = (source) => {
  switch (getJustString(source)) {
    case 'desimartini':
      return IMAGES.sourceLogo.desimartiniLogo;
    case 'filmcompanion':
      return IMAGES.sourceLogo.filmCompaionLogo;
    case 'hindustantimes':
      return IMAGES.sourceLogo.hindustanTimesLogo;
    case 'livemint':
      return IMAGES.sourceLogo.liveMintLogo;
    case 'ottplay':
      return IMAGES.sourceLogo.ottplayLogo;
  }
};

export const removeAllHTMLTags = (str) => {
  if (str === null || str === '') return false;
  str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
};

export const handleStringlength = (str, wordCount = 200) => {
  //check if a string is blank, null or undefined
  if (!str || /^\s*$/.test(str)) {
    return '';
  } else {
    return str
      .split(' ')
      .slice(0, wordCount)
      .join(' ');
  }
};

export const combinations = (array) => {
  return new Array(1 << array.length).fill().map(
    (e1, i) => array.filter((e2, j) => i & 1 << j).sort());
}