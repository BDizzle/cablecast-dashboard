import DS from 'ember-data';

export default DS.Model.extend({
  channelId: DS.attr('number'),
  eventDateTime: DS.attr('date'),
  deviceAction: DS.attr('number'),

  occursIn: function() {
  	return (this.get('eventDateTime') - new Date()) / 1000;
  }.property().volatile()
});