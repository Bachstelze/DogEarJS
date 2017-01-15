(function(jQuery) {
  jQuery.fn.spruchband = function(options) {
    var spruch = this;
    var settings = jQuery.extend(
      {
        height: "100px",
        width: "100px",
        "z-index": "5",
        position: "absolute",
        overflow: "hidden"
      },
      options
    );
    var drehung_oben, drehung_unten, css_drehung, hoehe_spruchband;
    return this.each(function() {
      var aktuell = jQuery(this);
      aktuell.hinzu(options);

      if (jQuery.fn.rotate) {
        jQuery(window).scroll(function() {
          aktuell.alternativ_drehen();
        });
      } else {
        jQuery(window).scroll(function() {
          aktuell.scrollen();
        });
      }
    });
  };
})(jQuery);

(function(jQuery) {
  jQuery.fn.hinzu = function(options) {
    var settings = jQuery.extend(
      {
        height: "100px",
        width: "100px",
        "z-index": "5",
        position: "absolute",
        overflow: "hidden",
        "background-color": "black"
      },
      options
    );
    var anker,
      css_anker,
      drehung_oben,
      drehung_unten,
      css_drehung,
      hoehe_spruchband,
      aktuell;
    var hoehe_spruchband = this.outerHeight();
    return this.each(function() {
      aktuell = jQuery(this);
      hoehe_spruchband = aktuell.outerHeight();
      anker = "top left";
      css_anker = {
        "transform-origin": anker,
        "-ms-transform-origin": anker,
        "-webkit-transform-origin": anker,
        "-moz-transform-origin": anker,
        "-o-transform-origin": anker
      };
      jQuery("<div class='jquery-plugin-unten'></div>")
        .append("<div></div>")
        .children()
        .css(settings)
        .css(css_anker)
        .css({ width: "40px", height: "40px" })
        .parent()
        .css(settings)
        .css({
          "background-color": "transparent",
          top: hoehe_spruchband + "px",
          left: "0px"
        })
        .prependTo(jQuery(this));
      anker = "bottom left";
      css_anker = {
        "transform-origin": anker,
        "-ms-transform-origin": anker,
        "-webkit-transform-origin": anker,
        "-moz-transform-origin": anker,
        "-o-transform-origin": anker
      };
      jQuery("<div class='jquery-plugin-oben'></div>")
        .append("<div></div>")
        .children()
        .css(settings)
        .css(css_anker)
        .css({ width: "50px", height: "50px", bottom: "0px", left: "0px" })
        .parent()
        .css(settings)
        .css({
          "background-color": "transparent",
          top: "-" + settings.height,
          left: "0px"
        })
        .prependTo(jQuery(this));
      if (jQuery.fn.rotate) {
        aktuell.children(".jquery-plugin-unten").children().rotate(90);
        aktuell.children(".jquery-plugin-oben").children().rotate(45);
        aktuell.scrollen();
      } else {
        drehung_unten = "90";
        css_drehung = {
          "-moz-transform": "rotate(" + drehung_unten + "deg)",
          "-ms-transform": "rotate(" + drehung_unten + "deg)",
          "-webkit-transform": "rotate(" + drehung_unten + "deg)",
          "-o-transform": "rotate(" + drehung_unten + "deg)",
          transform: "rotate(" + drehung_unten + "deg)"
        };
        aktuell.children(".jquery-plugin-unten").children().css(css_drehung);
        anker = "bottom left";
        drehung_oben = "45";
        css_drehung = {
          "-moz-transform": "rotate(" + drehung_oben + "deg)",
          "-ms-transform": "rotate(" + drehung_oben + "deg)",
          "-webkit-transform": "rotate(" + drehung_oben + "deg)",
          "-o-transform": "rotate(" + drehung_oben + "deg)",
          transform: "rotate(" + drehung_oben + "deg)"
        };
        aktuell.children(".jquery-plugin-oben").children().css(css_drehung);
        aktuell.scrollen();
      }
    });
  };
})(jQuery);

(function(jQuery) {
  jQuery.fn.scrollen = function() {
    var drehung_oben, drehung_unten, css_drehung, anker, aktuell;
    var bildschirm_hoehe = jQuery(window).height();
    return this.each(function() {
      aktuell = jQuery(this);
      var offset = jQuery(this).offset();
      var diff = -jQuery(window).scrollTop() + offset.top;

      if (diff < 0) {
        diff = 0;
      }
      if (diff < bildschirm_hoehe) {
        //innerhalb des Viewports
        if (diff < bildschirm_hoehe / 2) {
          //in der oberen HÃ¤lfte
          drehung_oben = "90";
          drehung_unten = 45 + diff / (bildschirm_hoehe / 2) * 45;
          drehung_unten = "-" + drehung_unten;
        } else {
          // in der unteren HÃ¤lfte
          drehung_oben = 90 -
            (diff - bildschirm_hoehe / 2) / (bildschirm_hoehe / 2) * 45;
          drehung_unten = "90";
        }
        anker = "top left";
        css_drehung = {
          "-moz-transform": "rotate(" + drehung_unten + "deg)",
          "-ms-transform": "rotate(" + drehung_unten + "deg)",
          "-webkit-transform": "rotate(" + drehung_unten + "deg)",
          "-o-transform": "rotate(" + drehung_unten + "deg)",
          transform: "rotate(" + drehung_unten + "deg)"
        };
        jQuery(this)
          .children(".jquery-plugin-unten")
          .children()
          .css(css_drehung);
        anker = "bottom left";
        css_drehung = {
          "-moz-transform": "rotate(" + drehung_oben + "deg)",
          "-ms-transform": "rotate(" + drehung_oben + "deg)",
          "-webkit-transform": "rotate(" + drehung_oben + "deg)",
          "-o-transform": "rotate(" + drehung_oben + "deg)",
          transform: "rotate(" + drehung_oben + "deg)"
        };
        jQuery(this)
          .children(".jquery-plugin-oben")
          .children()
          .css(css_drehung);
      }
    });
  };
})(jQuery);

(function(jQuery) {
  jQuery.fn.alternativ_drehen = function() {
    var drehung_oben, drehung_unten, css_drehung, anker, aktuell;
    var bildschirm_hoehe = jQuery(window).height();
    return this.each(function() {
      aktuell = jQuery(this);
      var offset = jQuery(this).offset();
      var diff = -jQuery(window).scrollTop() + offset.top;

      if (diff < 0) {
        diff = 0;
      }
      if (diff < bildschirm_hoehe) {
        //innerhalb des Viewports
        if (diff < bildschirm_hoehe / 2) {
          //in der oberen HÃ¤lfte
          drehung_oben = "90";
          drehung_unten = 45 + diff / (bildschirm_hoehe / 2) * 45;
          drehung_unten = "-" + drehung_unten;
        } else {
          // in der unteren HÃ¤lfte
          drehung_oben = 90 -
            (diff - bildschirm_hoehe / 2) / (bildschirm_hoehe / 2) * 45;
          drehung_unten = "90";
        }
        jQuery(this)
          .children(".jquery-plugin-unten")
          .children()
          .rotate(parseInt(drehung_unten));
        jQuery(this)
          .children(".jquery-plugin-oben")
          .children()
          .rotate(parseInt(drehung_oben));
      }
    });
  };
})(jQuery);
