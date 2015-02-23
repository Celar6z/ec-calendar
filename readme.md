#ec-calendar

A module with all the important dates for Elizabeth & Clarke

## Usage

```javascript
import EcCalendar from 'ec-calendar';

var calendar = new EcCalendar('SM15');
```

## Calendar API

### calendar.years
Years of existing seasons, from 2011 to next year

### calendar.seasons
An array of all existing seasons

### calendar.activeSeason
Currently set season, set by the constructor param

### calendar.upcomingSeason
Upcoming season based on which `calendar.activeSeason` is set

### calendar.previousSeason
Previous season based on which `calendar.activeSeason` is set

## Season API
A season looks like:

```javascript
{ id: 'WN11',
  code: 'WN',
  title: 'Winter 2011',
  dates:
   { charge: Thu Sep 15 2011 00:00:00 GMT-0500 (COT),
     ship: Thu Dec 01 2011 00:00:00 GMT-0500 (COT) },
  year: 2011,
  kind: 'winter' }
```


