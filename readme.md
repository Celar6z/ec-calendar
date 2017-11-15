#ec-calendar

A module with all the important dates for Elizabeth & Clarke

[![Circle CI](https://circleci.com/gh/buritica/ec-calendar.svg?style=svg)](https://circleci.com/gh/buritica/ec-calendar)

## Usage

```javascript
import EcCalendar from 'ec-calendar';

var calendar = new EcCalendar('SM15');
```

## Calendar API

## Development
    For every change we made in to this lib we should compile the project again, in order to do this we need to install `broccoli` and `broccoli-cli` dependencies with the following command:
    `npm install -g broccoli@0.12.0 broccoli-cli@^0.0.1`
    and then compile our project with the following command:
    `broccoli build dist`
    The new `dist` should be added to the repo. 
    Note: The index should be formmated with `;` before to be compiled.

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


