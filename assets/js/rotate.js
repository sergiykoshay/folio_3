(function() {
    var cards = document.querySelectorAll(".box");
    for ( var i  = 0, len = cards.length; i < len; i++ ) {
      var card = cards[i];
      clickListener( card );
    }
  
    function clickListener(card) {
      card.addEventListener( "click", function() {
        var c = this.classList;
        c.contains("rotate") === true ? c.remove("rotate") : c.add("rotate");
      });
    }
  })();