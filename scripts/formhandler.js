(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var slider = document.getElementById("strengthLevel"); //for sliderhandler
  var output = document.getElementById("strengthLevelOutput"); //for sliderhandler
  output.innerHTML = slider.value; // for sliderhandler
  output.style = "color:green; font-weight:bold;";

  //sliderhandler - shows value as it slides
  slider.oninput = function() {
    output.innerHTML = this.value;
    //change color of text depending on caffeine level
    if (slider.value < 40) {
      output.style.color = "green";
    } else if (slider.value > 40 && slider.value < 70) {
      output.style.color = "orange";
    } else {output.style.color = "red";}
  }

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset(); //clears the form after submitting
      this.elements[0].focus(); //refocus on first element in form
    });
    this.$formElement.on('reset', function (event) {
      slider.value = 30;
      output.innerHTML = "30";
      output.style.color = "green";
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
