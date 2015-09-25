define("ec-calendar",
  ["lodash","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /**
     * Module Dependencies
     */
    var _ = __dependency1__["default"] || __dependency1__;

    /**
     * Locals
     */
    var today = new Date();
    var chargeDay = 15;
    var shipDay = 1;
    var inStoreDay = 1;
    var seasons = [];


    /**
     * Years
     */
    var firstYear = 2011;
    var currentYear = today.getFullYear();
    var nextYear = currentYear + 1;
    var nextTwoYear = currentYear + 2;
    var years = [];

    for (var i = nextTwoYear - firstYear; i >= 0; i--) {
      years.push(nextTwoYear - i);
    }

    /**
     * Season Defaults
     */
    var winter = {
      code: 'WN',
      title: 'Winter',
      chargeMonth: 8,
      shipMonth: 11,
      inStoreMonth: 7,
      kind: 'winter'
    };

    var spring = {
      code: 'SP',
      title: 'Spring',
      chargeMonth: -1,
      shipMonth: 2,
      inStoreMonth: 10,
      kind: 'spring'
    };

    var summer = {
      code: 'SM',
      title: 'Summer',
      chargeMonth: 2,
      shipMonth: 5,
      inStoreMonth: 1,
      kind: 'summer'
    };

    var fall = {
      code: 'FA',
      title: 'Fall',
      chargeMonth: 5,
      shipMonth: 8,
      inStoreMonth: 3,
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

    years.forEach(function (year) {
      var suffix = year - 2000;

      defaults.forEach(function (season) {
        var chargeYear = year;
        var shipYear = year;

        if (season.code === 'SP' && currentYear === year) {
          chargeYear += 1;
        }

        var inStoreDate = new Date(shipYear, season.inStoreMonth, inStoreDay);
        seasons.push({
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
        });
      });
    });

    /**
     * Find seaosn using season code
     * @param  {String} id Season Code (e.g. WN11)
     * @return {Season}
     */
    function findSeason(id) {
      if (!id) {
        throw Error('season id not specified');
      }
      return _.find(seasons, {
        id: id
      });
    }

    /**
     * Calendar
     */
    function Calendar(id) {
      var activeIndex;

      this.years = years;
      this.seasons = seasons;

      this.activeSeason = findSeason(id);

      activeIndex = seasons.indexOf(this.activeSeason);

      this.previousSeason = seasons[activeIndex - 1];
      this.upcomingSeason = seasons[activeIndex + 1];
    }

    Calendar.prototype.findSeason = findSeason;

    __exports__["default"] = Calendar;
  });