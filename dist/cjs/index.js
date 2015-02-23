"use strict";
/**
 * Module Dependencies
 */
var _ = require("lodash")["default"] || require("lodash");
var debug = require("debug")["default"] || require("debug");

debug = debug('ec:calendar');

/**
 * Locals
 */
var today = new Date();
var chargeDay = 15;
var shipDay = 1;
var seasons = [];


/**
 * Years
 */
var firstYear = 2011;
var currentYear = today.getFullYear();
var nextYear = currentYear + 1;
var years = [];

for (var i = nextYear - firstYear; i >= 0; i--) {
  years.push(nextYear - i);
}

/**
 * Season Defaults
 */
var winter = {
  code: 'WN',
  title: 'Winter',
  chargeMonth: 8,
  shipMonth: 11,
  kind: 'winter'
};

var spring = {
  code: 'SP',
  title: 'Spring',
  chargeMonth: 11,
  shipMonth: 2,
  kind: 'spring'
};

var summer = {
  code: 'SM',
  title: 'Summer',
  chargeMonth: 2,
  shipMonth: 5,
  kind: 'summer'
};

var fall = {
  code: 'FA',
  title: 'Fall',
  chargeMonth: 5,
  shipMonth: 8,
  kind: 'fall'
};

var defaults = [
  winter,
  spring,
  summer,
  fall
];

/**
 * Build all seasons for each available year
 */

years.forEach(function(year) {
  var suffix = year - 2000;

  defaults.forEach(function(season) {
    var chargeYear = year;
    var shipYear = year;

    // in spring we charge the year before we ship
    if (season.code === 'SP') {
      chargeYear = year - 1;
    }

    seasons.push({
      id: season.code + suffix,
      code: season.code,
      title: season.title + ' ' + year,
      dates: {
        charge: new Date(chargeYear, season.chargeMonth, chargeDay),
        ship: new Date(shipYear, season.shipMonth, shipDay)
      },
      year: year,
      kind: season.kind
    });
  });
});

class Calendar {
  constructor(id) {
    this.activeSeason = this.findSeason(id);
  }

  get years() {
    return years;
  }

  get seasons() {
    return seasons;
  }

  get upcomingSeason() {
    var activeIndex = seasons.indexOf(this.activeSeason);
    var upcomingSeason = seasons[activeIndex + 1];
    debug('upcomingSeason: %s', upcomingSeason.id);
    return upcomingSeason;
  }

  get previousSeason() {
    var activeIndex = seasons.indexOf(this.activeSeason);
    var previousSeason = seasons[activeIndex - 1];
    debug('previousSeason: %s', previousSeason.id);
    return previousSeason;
  }

  findSeason(id) {
    if (!id) {
      throw Error('season id not specified');
    }
    return _.find(seasons, {id:id});
  }
}

exports["default"] = Calendar;