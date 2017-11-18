/**
 * Udacity fend project: Mathing Game
 */
(function() {
  // Create two variables, one for holding temporary opened cards, the other for saving total moves
  var openCards = [],
    move = 0;

  /**
   * Get all cards
   * 
   * @returns {Array}
   */
  function getCardArray() {
    return [].slice.call(document.getElementsByClassName('card'));
  }

  /**
   * Get all icons
   * 
   * @returns {Array}
   */
  function getIconArray() {
    return [].slice
      .call(document.querySelectorAll('.card .fa'))
      .map(function(e) {
        return e.classList.value;
      });
  }

  /**
   * check if the card is open
   * 
   * @param {Object} element 
   * @returns {Boolean}
   */
  function isCardOpen(element) {
    return element.classList.contains('open');
  }

  /**
   * open card
   * 
   * @param {Object} element 
   */
  function showCard(element) {
    element.classList.add('open', 'show');
    addToOpenCardsList(element);
  }

  /**
   * close card
   * 
   * @param {Object} element
   */
  function hideCard(element) {
    element.classList.remove('open', 'show', 'fail');
  }

  /**
   * add card to open card list
   * 
   * @param {Object} element 
   */
  function addToOpenCardsList(element) {
    openCards.push(element);
  }

  /**
   * check if two open card is match
   * 
   * @returns {Boolean}
   */
  function isOpenCardsMatch() {
    updateMove(++move);
    return (
      openCards[0].children[0].classList.value ===
      openCards[1].children[0].classList.value
    );
  }

  /**
   * turn two open card to match status
   * 
   */
  function matchOpenCards() {
    totalCount -= 2;
    openCards.forEach(function(card) {
      card.classList.add('match');
      card.classList.remove('open', 'show');
      card.removeEventListener('click', onCardClick);
    });
    openCards.length = 0;
  }

  /**
   * close two open card
   * 
   */
  function closeOpenCards() {
    openCards.forEach(function(card) {
      card.classList.add('fail');
      setTimeout(function() {
        hideCard(card);
      }, 500);
    });
    openCards.length = 0;
  }

  /**
   * check if game finished
   * 
   */
  function checkIfFinish() {
    if (!totalCount) {
      alert('You win in ' + move + ' moves!');
    }
  }

  /**
   * reset this game
   * 
   */
  function resetGame() {
    initGame();
    openCards.length = 0;
    resetStars();
    updateMove(0);
  }

  /**
   * update move count
   * 
   * @param {Number} count
   */
  function updateMove(count) {
    move = count;
    document.getElementsByClassName('moves')[0].innerText = move;
    updateStars();
  }

  /**
   * update stars
   * 
   */
  function updateStars() {
    var stars = document.getElementsByClassName('stars')[0];
    if (move === 16) {
      stars.children[4].children[0].classList.remove('shine');
    } else if (move === 26) {
      stars.children[3].children[0].classList.remove('shine');
    } else if (move === 36) {
      stars.children[2].children[0].classList.remove('shine');
    } else if (move === 46) {
      stars.children[1].children[0].classList.remove('shine');
    }
  }

  /**
   * reset five stars
   * 
   */
  function resetStars() {
    var stars = document.getElementsByClassName('stars')[0].children;
    [].forEach.call(stars, function(star) {
      star.children[0].classList.value = 'fa fa-star shine';
    });
  }

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   * Shuffle function from http://stackoverflow.com/a/2450976
   */
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  /**
   * on card "click" event listener
   * 
   * @param {Object} event
   */
  function onCardClick(event) {
    if (isCardOpen(this)) {
      return;
    }
    showCard(this);
    if (openCards.length === 2) {
      if (isOpenCardsMatch()) {
        matchOpenCards();
        checkIfFinish();
      } else {
        closeOpenCards();
      }
    }
  }

  /**
   * init this game
   * 
   */
  function initGame() {
    var cards = getCardArray();
    var icons = shuffle(getIconArray());
    totalCount = cards.length;
    cards.forEach(function(card, index) {
      card.setAttribute('class', 'card');
      card.children[0].setAttribute('class', icons[index]);
      card.addEventListener('click', onCardClick);
    });
    var resetBtn = document.getElementsByClassName('restart')[0];
    resetBtn.addEventListener('click', resetGame);
  }

  initGame();
})();
