'use strict';

var randomChallengers = (function() {

  var nodeListToArray = function(childNodes) {
    var arr = [];

    for (var i = childNodes.length >>> 0; i--;) {
      arr[i] = childNodes[i];
    }

    return arr;
  };

  var arrayToNodeList = function(childNodes) {
    var nodelist = "";
    
    for (var i = 0; i < childNodes.length; i++) { 
          nodelist += childNodes[i].outerHTML;
    }

    return nodelist;
  };

  var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };
  
  var random = function(parentNodeEl, childNodeClass) {
    var parentNode = document.getElementsByTagName(parentNodeEl), 
        childNodes = parentNode[0].getElementsByClassName(childNodeClass);

    // Convert nodelist to array
    childNodes = nodeListToArray(childNodes);

    // Sort the child nodes
    childNodes = shuffleArray(childNodes);

    // Convert array back to nodelist
    childNodes = arrayToNodeList(childNodes);
    
    // Replace the parentNode content with the sorted childNodes
    parentNode[0].innerHTML = childNodes;
  };

  return {
    random: random
  };

})();

randomChallengers.random('main', 'user');
