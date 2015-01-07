import Ember from 'ember';

export default Ember.Route.extend({
  interval: null,

	model: function() {
    return Ember.RSVP.hash({
      events: this.store.find('event'),
      channels: this.store.find('channel')
    })
	  return this.store.find('event');
	},

  activate: function() {
    var id = setInterval(this.updateTime.bind(this), 1000);
    this.set('interval', id);

  },

  updateTime: function() {
    var controller = this.controllerFor(this.routeName);
    controller.set('currentTime', new Date());
  }
});