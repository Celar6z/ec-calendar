import EcCalendar from '../lib/';
import chai from 'chai';
import sinon from 'sinon';

var expect = chai.expect;
describe('Future change seasons year', function () {
  context('winter 2016', function () {
    var clock;
    beforeEach(function () {
      clock = sinon.useFakeTimers(new Date(2016, 0, 1).getTime());
      var calendar = new EcCalendar('WN16');
      this.upcomingShirtSeason = calendar.upcomingShirtSeason;
    });

    afterEach(function () {
      clock.restore();
    });

    it('next season should be spring and should be charged this year 2016', function () {
      expect(this.upcomingShirtSeason.id).to.equal('SP17');
      expect(this.upcomingShirtSeason.dates.charge.getFullYear()).to.equal(2016);
      expect(this.upcomingShirtSeason.dates.charge.getMonth()).to.equal(11);
    });
  });

  context('winter 2017', function () {
    var clock;
    beforeEach(function () {
      clock = sinon.useFakeTimers(new Date(2017, 0, 1).getTime());
      var calendar = new EcCalendar('WN17');
      this.upcomingShirtSeason = calendar.upcomingShirtSeason;
    });

    afterEach(function () {
      clock.restore();
    });

    it('next season should be spring and should be charged year 2017', function () {
      expect(this.upcomingShirtSeason.id).to.equal('SP18');
      expect(this.upcomingShirtSeason.dates.charge.getFullYear()).to.equal(2017);
      expect(this.upcomingShirtSeason.dates.charge.getMonth()).to.equal(11);
    });
  });
});
