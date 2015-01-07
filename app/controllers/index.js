import Ember from 'ember';

export default Ember.Controller.extend({
  currentTime: new Date(),

  upNext: function() {
    var now = new Date();
    var upNext = [];
    var channelEvents = this.get('channelEvents');
    channelEvents.forEach(function(ce) {
      var upcomingEvents = ce.get('events').filter(function(e) {
        return e.get('eventDateTime') >= now
      });
      ce.set('events', upcomingEvents.slice(0, 3));
      upNext.push(ce);
    });

    return upNext;
  }.property('currentTime', 'channelEvents.@each.eventDateTime'),

  channelEvents: function() {
    var channels = this.get('model.channels');
    var events = this.get('model.events');
    var channelEvents = [];
    channels.forEach(function(channel) {
      var ce = Ember.Object.create({
        channel: channel,
        events: events.filterBy('channelId', parseInt(channel.get('id'), 10))
      });
      channelEvents.pushObject(ce);
    });

    return channelEvents;
  }.property('model.events.[]', 'model.channels.[]')
});