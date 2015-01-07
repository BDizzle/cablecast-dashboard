import DS from 'ember-data';

export default DS.Model.extend({
  channelId: DS.attr('number'),
  eventDateTime: DS.attr('date'),
  deviceAction: DS.attr('number'),
  showId: DS.attr('number'),
  routerAction: DS.attr('number'),

  occursIn: function() {
    return this.secondsToTimecode((this.get('eventDateTime') - new Date()) / 1000);
  }.property().volatile(),

  secondsToTimecode: function (secs) {
    var hours = this.padWithZeros(Math.floor(secs / (60 * 60)), 2);

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = this.padWithZeros(Math.floor(divisor_for_minutes / 60), 2);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = this.padWithZeros(Math.ceil(divisor_for_seconds), 2);

    return hours + ':' + minutes + ':' + seconds;
  },

  padWithZeros: function (num, size) {
    var s = num + "";
    while (s.length < size) {s = "0" + s;}
    return s;
  },
});