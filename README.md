# DogEarJS
Simple JQuery for adding animated dog ears to html elements which turn according to the scroll position
Tested with jquery-3.1.1 and jquery-1.7.1

Example usage:
'''
$(document).ready(function() {
  $("h3").spruchband({
      'height' : '15px',
      'width' : '15px',
      'z-index' : '4',
      'position' : 'absolute',
      'overflow' : 'hidden',
      'background-color' : 'black'
    });
});
'''
TODO: flexible rotation axis
