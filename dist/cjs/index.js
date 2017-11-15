"use strict";
/**
 * Module Dependencies
 */
var _ = require("lodash")["default"] || require("lodash");

/**
 * Locals
 */
const today = new Date();
const chargeDay = 15;
const shipDay = 1;
const inStoreDay = 1;

/**
 * Years
 */
const firstYear = 2011;
const currentYear = today.getFullYear();
const nextTwoYears = currentYear + 2;
const years = [];

for (let i = nextTwoYears - firstYear; i >= 0; i--) {
  years.push(nextTwoYears - i);
}

/**
 * Season Defaults
 */
const winter = {
  type: 'shirt',
  code: 'WN',
  title: 'Winter',
  chargeMonth: 8,
  shipMonth: 11,
  inStoreMonth: 6,
  kind: 'winter'
};

const suitWinter = {
  type: 'suit',
  code: 'WN',
  title: 'Winter',
  chargeMonth: 8,
  shipMonth: 11,
  inStoreMonth: 3,
  kind: 'winter'
};

const spring = {
  type: 'shirt',
  code: 'SP',
  title: 'Spring',
  chargeMonth: 11,
  shipMonth: 2,
  inStoreMonth: 9,
  kind: 'spring'
};

const summer = {
  type: 'shirt',
  code: 'SM',
  title: 'Summer',
  chargeMonth: 2,
  shipMonth: 5,
  inStoreMonth: 0,
  kind: 'summer'
};

const suitSummer = {
  type: 'suit',
  code: 'SM',
  title: 'Summer',
  chargeMonth: 2,
  shipMonth: 5,
  inStoreMonth: 9,
  kind: 'summer'
};

const fall = {
  type: 'shirt',
  code: 'FA',
  title: 'Fall',
  chargeMonth: 5,
  shipMonth: 8,
  inStoreMonth: 3,
  kind: 'fall'
};

const defaults = [
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

  const seasons = years.map(function (year) {
    const suffix = year - 2000;

    return defaults.map(function (season) {
      let inStoreYear = year;
      let chargeYear = year;
      const shipYear = year;

      if (season.code === 'SP') {
        chargeYear -= 1;
        inStoreYear -= 1;
      } else if (season.code === 'SM' && season.type === 'suit') {
        inStoreYear -= 1;
      }
      const inStoreDate = new Date(inStoreYear, season.inStoreMonth, inStoreDay);

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
  const season = seasonId.slice(0, 2);
  const seasonYear = seasonId.slice(2);
  switch (season) {
    case 'SP':
    case 'SM':
      return this.findSeason(`SM${seasonYear}`, 'suit');
    case 'FA':
    case 'WN':
      return this.findSeason(`WN${seasonYear}`, 'suit');
  }
}

exports["default"] = Calendar;