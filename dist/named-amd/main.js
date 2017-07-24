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
      chargeMonth: 11,
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
      spring,
      summer,
      fall,
      winter
    ];

    function buildSeasons() {
      /**
       * Build all seasons for each available year
       */

      var seasons = years.map(function (year) {
        var suffix = year - 2000;

        return defaults.map(function (season) {
          var chargeYear = year;
          var shipYear = year;

          if (season.code === 'SP') {
            chargeYear -= 1;
          }
          var inStoreDate = new Date(chargeYear, season.inStoreMonth, inStoreDay);
          return {
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
          };
        });
      });
      return _.flatten(seasons);
    }

    /**
     * Calendar
     */
    function Calendar(id) {
      this.years = years;
      this.seasons = buildSeasons();

      this.activeShirtSeason = this.findSeason(id);
      var activeIndex = this.seasons.indexOf(this.activeShirtSeason);
      this.previousShirtSeason = this.seasons[activeIndex - 1];
      this.upcomingShirtSeason = this.seasons[activeIndex + 1];

      this.activeSuitSeason = this.findSuitSeason(id);
      var activeSuitIndex = this.seasons.indexOf(this.activeSuitSeason);
      this.previousSuitSeason = this.seasons[activeSuitIndex - 2];
      this.upcomingSuitSeason = this.seasons[activeSuitIndex + 2];
    }

    /**
     * Find seaosn using season code
     * @param  {String} id Season Code (e.g. WN11)
     * @return {Season}
     */
    Calendar.prototype.findSeason = function (id) {
      if (!id) {
        throw Error('season id not specified');
      }
      return _.find(this.seasons, { id: id });
    }

    Calendar.prototype.findSuitSeason = function (seasonId) {
      const season = seasonId.slice(0, 2)
      const seasonYear = seasonId.slice(2)
      switch (season) {
        case 'SP':
        case 'SM':
          return this.findSeason(`SM${seasonYear}`)
        case 'FA':
        case 'WN':
          return this.findSeason(`WN${seasonYear}`)
      }
    }

    __exports__["default"] = Calendar;
  });