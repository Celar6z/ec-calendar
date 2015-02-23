import EcCalendar from '../lib/';
import chai from 'chai';
import _ from 'lodash';

var expect = chai.expect;

var calendar = new  EcCalendar('SM15');

describe('Seasons @unit', function() {
  describe('Years', function() {

    it('should have `2011`', function() {
      expect(calendar.years).to.contain(2011);
    });

    it('should have `2012`', function() {
      expect(calendar.years).to.contain(2012);
    });

    it('should have `2013`', function() {
      expect(calendar.years).to.contain(2013);
    });

    it('should have `2014`', function() {
      expect(calendar.years).to.contain(2014);
    });

    it('should have this year', function() {
      var thisYear = new Date().getFullYear();
      expect(calendar.years).to.contain(thisYear);
    });

    it('should have next year', function() {
      var nextYear = new Date().getFullYear() + 1;
      expect(calendar.years).to.contain(nextYear);
    });

    it('should not have 2 years after this year', function() {
      var nextYear = new Date().getFullYear() + 2;
      expect(calendar.years).to.not.contain(nextYear);
    });
  });

  // winter sept 15, dec 1
  // spring dec 15, march 1
  // summer march 15, june 1
  // fall june 15, sept 1

  describe('Seasons', function() {
    context('winter 2011', function() {
      beforeEach(function() {
        this.season = calendar.findSeason('WN11');
      });

      it('should have id:WN11', function() {
        expect(this.season).to.be.ok;
      });

      it('should have title:Winter 2011', function() {
        expect(this.season).to.have.property('title', 'Winter 2011');
      });

      it('should have charge date: Sept 15 2011', function() {
        var month = 8;
        var day = 15;
        var year = 2011;
        var date = new Date(year, month, day);

        expect(this.season.dates.charge.getTime()).to.equal(date.getTime());
        expect(this.season.dates.charge.toString()).to.contain('Sep');
      });

      it('should have ship date: Dec 1 2011', function() {
        var month = 11;
        var day = 1;
        var year = 2011;
        var date = new Date(year, month, day);

        expect(this.season.dates.ship.getTime()).to.equal(date.getTime());
        expect(this.season.dates.ship.toString()).to.contain('Dec');
      });

      it('should have kind: winter', function() {
        expect(this.season).to.have.property('kind', 'winter');
      });

      it('should have year: 2011', function() {
        expect(this.season).to.have.property('year', 2011);
      });

      it('should have code: WN', function() {
        expect(this.season).to.have.property('code', 'WN');
      });
    });

    context('spring 2012', function() {
      beforeEach(function() {
        this.season = calendar.findSeason('SP12');
      });

      it('should have id:SP12', function() {
        expect(this.season).to.be.ok;
      });

      it('should have title:Spring 2012', function() {
        expect(this.season).to.have.property('title', 'Spring 2012');
      });

      it('should have chargeDate: Dec 15 2011', function() {
        var month = 11;
        var day = 15;
        var year = 2011;
        var date = new Date(year, month, day);

        expect(this.season.dates.charge.getTime()).to.equal(date.getTime());
        expect(this.season.dates.charge.toString()).to.contain('Dec');
      });

      it('should have shipDate: March 1 2012', function() {
        var month = 2;
        var day = 1;
        var year = 2012;
        var date = new Date(year, month, day);

        expect(this.season.dates.ship.getTime()).to.equal(date.getTime());
        expect(this.season.dates.ship.toString()).to.contain('Mar');
      });

      it('should have kind: spring', function() {
        expect(this.season).to.have.property('kind', 'spring');
      });

      it('should have year: 2012', function() {
        expect(this.season).to.have.property('year', 2012);
      });

      it('should have code: SP', function() {
        expect(this.season).to.have.property('code', 'SP');
      });
    });

    context('summer 2012', function() {
      beforeEach(function() {
        this.season = calendar.findSeason('SM12');
      });

      it('should have id:SM12', function() {
        expect(this.season).to.be.ok;
      });

      it('should have title:Summer 2012', function() {
        expect(this.season).to.have.property('title', 'Summer 2012');
      });

      it('should have chargeDate: March 15 2012', function() {
        var month = 2;
        var day = 15;
        var year = 2012;
        var date = new Date(year, month, day);

        expect(this.season.dates.charge.getTime()).to.equal(date.getTime());
        expect(this.season.dates.charge.toString()).to.contain('Mar');
      });

      it('should have shipDate: June 1 2012', function() {
        var month = 5;
        var day = 1;
        var year = 2012;
        var date = new Date(year, month, day);

        expect(this.season.dates.ship.getTime()).to.equal(date.getTime());
        expect(this.season.dates.ship.toString()).to.contain('Jun');
      });

      it('should have kind: summer', function() {
        expect(this.season).to.have.property('kind', 'summer');
      });

      it('should have year: 2012', function() {
        expect(this.season).to.have.property('year', 2012);
      });

      it('should have code: SM', function() {
        expect(this.season).to.have.property('code', 'SM');
      });
    });

    context('fall 2012', function() {
      beforeEach(function() {
        this.season = calendar.findSeason('FA12');
      });

      it('should have id:FA12', function() {
        expect(this.season).to.be.ok;
      });

      it('should have title:Fall 2012', function() {
        expect(this.season).to.have.property('title', 'Fall 2012');
      });

      it('should have chargeDate: June 15 2012', function() {
        var month = 5;
        var day = 15;
        var year = 2012;
        var date = new Date(year, month, day);

        expect(this.season.dates.charge.getTime()).to.equal(date.getTime());
        expect(this.season.dates.charge.toString()).to.contain('Jun');
      });

      it('should have shipDate: Sept 1 2012', function() {
        var month = 8;
        var day = 1;
        var year = 2012;
        var date = new Date(year, month, day);

        expect(this.season.dates.ship.getTime()).to.equal(date.getTime());
        expect(this.season.dates.ship.toString()).to.contain('Sep');
      });

      it('should have kind: fall', function() {
        expect(this.season).to.have.property('kind', 'fall');
      });

      it('should have year: 2012', function() {
        expect(this.season).to.have.property('year', 2012);
      });

      it('should have code: FA', function() {
        expect(this.season).to.have.property('code', 'FA');
      });
    });

    context('winter 2012', function() {
      beforeEach(function() {
        this.season = calendar.findSeason('WN12');
      });

      it('should have id:WN12', function() {
        expect(this.season).to.be.ok;
      });

      it('should have title:Winter 2012', function() {
        expect(this.season).to.have.property('title', 'Winter 2012');
      });

      it('should have chargeDate: Sept 15 2012', function() {
        var month = 8;
        var day = 15;
        var year = 2012;
        var date = new Date(year, month, day);

        expect(this.season.dates.charge.getTime()).to.equal(date.getTime());
        expect(this.season.dates.charge.toString()).to.contain('Sep');
      });

      it('should have shipDate: Dec 1 2012', function() {
        var month = 11;
        var day = 1;
        var year = 2012;
        var date = new Date(year, month, day);

        expect(this.season.dates.ship.getTime()).to.equal(date.getTime());
        expect(this.season.dates.ship.toString()).to.contain('Dec');
      });

      it('should have kind: winter', function() {
        expect(this.season).to.have.property('kind', 'winter');
      });

      it('should have year: 2012', function() {
        expect(this.season).to.have.property('year', 2012);
      });

      it('should have code: WN', function() {
        expect(this.season).to.have.property('code', 'WN');
      });
    });


    describe('seasons per year', function() {
      var years = calendar.years;
      var seasons = [
        {kind:'spring', code: 'SP'},
        {kind:'summer', code: 'SM'},
        {kind:'fall', code: 'FA'},
        {kind:'winter', code: 'WN'}
      ];

      years.forEach(function(year) {
        seasons.forEach(function(season) {
          it('has `' + season.kind + '` season for `' + year + '`', function() {
            var current = _.find(calendar.seasons, {kind:season.kind, year:year});
            var code = season.code + (year - 2000);
            expect(current).to.have.property('id', code);
          });
        });
      });
    });
  });

  describe('active season', function(){
    it('returns active season', function() {
      var calendar = new EcCalendar('WN11');
      var wn11 = calendar.findSeason('WN11');

      expect(calendar.activeSeason).to.equal(wn11);
    });
  });

  describe('upcoming season', function() {
    it('returns `SM12` as upcoming season to `SP12`', function() {
      var calendar = new EcCalendar('WN12');
      var sm12 = calendar.findSeason('SP12');

      expect(calendar.upcomingSeason).to.equal(sm12);
    });
  });

  describe('previous season', function() {
    it('returns `FA11` as previous season to `WN12`', function() {
      var calendar = new EcCalendar('WN12');
      var fa11 = calendar.findSeason('FA11');

      expect(calendar.previousSeason).to.equal(fa11);

    });
  });

  describe('findSeason', function() {
    it('returns `FA11`', function() {
      var season = calendar.findSeason('FA11');
      expect(season.id).to.equal('FA11');
    });
  })
});