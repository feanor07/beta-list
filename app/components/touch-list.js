import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import Ember from 'ember';
// import notification from 'beta-list/utils/notification';

export default Ember.Component.extend(RecognizerMixin, {
  recognizers: 'tap press swipe',
  tagName: 'div',
  classNames: ['touchList'],
  columns: [100],
  init() {
    console.log("touch-list init");
    this._super(...arguments);
  },

  didUpdateAttrs() {
    console.log("touch-list didUpdateAttrs", ...arguments);
    this._super(...arguments);
  },

  // gestures
  swipeLeft(event) {
    let listItems = Ember.$(event.target).closest(".listItem");   // should be 0 or 1
    if (listItems.length) {
      let index = listItems[0].dataset.index;
      console.log("swipeLeft: " + index, listItems[0]);

      this.manipulateOverlay(listItems, false);
    }
  },

  swipeRight(event) {
    let listItems = Ember.$(event.target).closest(".listItem");   // should be 0 or 1
    console.log(listItems);
    if (listItems.length) {
      let index = listItems[0].dataset.index;
      console.log("swipeRight: " + index, listItems[0]);

      this.manipulateOverlay(listItems, true);
    }
  },

  manipulateOverlay(listItems, moveRight) {
    let overlays = listItems.children('.overlay');
    console.log("manipulateOverlay: " + overlays.length + " overlays");
    if (overlays.length === 0) {   // no overlay
      let overlayClass = moveRight ? 'overlayLeft' : 'overlayRight';
      listItems.append('<div class="overlay ' + overlayClass + '"> </div>');
      overlays = listItems.children('.overlay');
      console.log("created overlay: ", overlays);
      setTimeout(function () {
        overlays.removeClass(overlayClass);
      }, 25);
    } else {   // existing overlay
      console.log("existing overlay: ", overlays);

      overlays.addClass(moveRight ? 'overlayRight' : 'overlayLeft');
      overlays.on('transitionend', function () {
        console.log("transitionend", overlays);
        overlays.remove();
      });
    }

  },

  actions: {
    // required(event) {
    //   if (!event.target.value) {
    //     this.get('errors').pushObject({ message: `${event.target.name} is required`});
    //   }
    // }
  }
});
