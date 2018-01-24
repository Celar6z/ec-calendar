/**
 * Module Dependencies
 */
import _ from 'lodash';

/**
 * Locals
 */
var today = new Date();
var chargeDay = 15;
var shipDay = 1;
var inStoreDay = 1;

/**
 * Years
 */
var firstYear = 2011;
var currentYear = today.getFullYear();
var nextTwoYears = currentYear + 2;
var years = [];

for (var i = nextTwoYears - firstYear; i >= 0; i--) {
  years.push(nextTwoYears - i);
}

/**
 * Season Defaults
 */
var winter = {
  type: 'shirt',
  code: 'WN',
  title: 'Winter',
  chargeMonth: 8,
  shipMonth: 11,
  inStoreMonth: 6,
  kind: 'winter'
};

var suitWinter = {
  type: 'suit',
  code: 'WN',
  title: 'Winter',
  chargeMonth: 8,
  shipMonth: 11,
  inStoreMonth: 3,
  kind: 'winter'
};

var spring = {
  type: 'shirt',
  code: 'SP',
  title: 'Spring',
  chargeMonth: 11,
  shipMonth: 2,
  inStoreMonth: 9,
  kind: 'spring'
};

var summer = {
  type: 'shirt',
  code: 'SM',
  title: 'Summer',
  chargeMonth: 2,
  shipMonth: 5,
  inStoreMonth: 0,
  kind: 'summer'
};

var suitSummer = {
  type: 'suit',
  code: 'SM',
  title: 'Summer',
  chargeMonth: 2,
  shipMonth: 5,
  inStoreMonth: 9,
  kind: 'summer'
};

var fall = {
  type: 'shirt',
  code: 'FA',
  title: 'Fall',
  chargeMonth: 5,
  shipMonth: 8,
  inStoreMonth: 3,
  kind: 'fall'
};

var defaults = [
  spring,
  summer,
  suitSummer,
  fall,
  winter,
  suitWinter
];

function buildSeasons () {
  /**
   * Build all seasons for each available year
   */

  var seasons = years.map(function (year) {
    var suffix = year - 2000;

    return defaults.map(function (season) {
      var inStoreYear = year;
      var chargeYear = year;
      var shipYear = year;

      if (season.code === 'SP') {
        chargeYear -= 1;
        inStoreYear -= 1;
      } else if (season.code === 'SM' && season.type === 'suit') {
        inStoreYear -= 1;
      }
      var inStoreDate = new Date(inStoreYear, season.inStoreMonth, inStoreDay);

      return {
        type: season.type,
        id: season.code + suffix,
        code: season.code,
        title: season.title + ' ' + year,
        dates: {
          charge: new Date(chargeYear, season.chargeMonth, chargeDay),
          ship: new Date(shipYear, season.shipMonth, shipDay),
          inStore: inStoreDate
        },
        startDate: inStoreDate,
        year: year,
        kind: season.kind
      }
    });
  });
  return _.flatten(seasons);
}

/**
 * Calendar
 */
function Calendar (id) {
  this.years = years;
  this.seasons = buildSeasons();
  this.shirtSeasons = this.seasons.filter(season => season.type === 'shirt');
  this.suitSeasons = this.seasons.filter(season => season.type === 'suit');

  this.activeShirtSeason = this.findSeason(id, 'shirt');
  var activeIndex = this.shirtSeasons.indexOf(this.activeShirtSeason);
  this.previousShirtSeason = this.shirtSeasons[activeIndex - 1];
  this.upcomingShirtSeason = this.shirtSeasons[activeIndex + 1];

  this.activeSuitSeason = this.findSuitSeason(id);
  var activeSuitIndex = this.suitSeasons.indexOf(this.activeSuitSeason);
  this.previousSuitSeason = this.suitSeasons[activeSuitIndex - 1];
  this.upcomingSuitSeason = this.suitSeasons[activeSuitIndex + 1];
}

/**
 * Find seaosn using season code
 * @param  {String} id Season Code (e.g. WN11)
 * @return {Season}
 */
Calendar.prototype.findSeason = function (id, type = 'shirt') {
  if (!id) {
    throw Error('season id not specified');
  }
  return _.find(this.seasons, { id: id, type: type });
}

Calendar.prototype.findSuitSeason = function (seasonId) {
  var season = seasonId.slice(0, 2);
  var seasonYear = seasonId.slice(2);
  switch (season) {
    case 'SP':
    case 'SM':
      return this.findSeason(`SM${seasonYear}`, 'suit');
    case 'FA':
    case 'WN':
      return this.findSeason(`WN${seasonYear}`, 'suit');
  }
}

export default Calendar;
