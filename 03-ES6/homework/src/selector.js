var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien
  if (matchFunc(startEl)) {
    resultSet.push(startEl);
  }
  // TU CÓDIGO AQUÍ
  for (var i = 0; i < startEl.children.length; i++) {
    let element = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...element];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if (selector[0] === '#') return 'id';
  if (selector[0] === '.') return 'class';
  if (selector.includes('.')) return 'tag.class';
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    
    matchFunction = e => '#' + e.id === selector;  
  
  } else if (selectorType === "class") {
    
    matchFunction = e => {
      let classes = e.classList;
      for(let i = 0; i < classes.length; i++) {
        if (`.${classes[i]}` === selector ) return true;
      }
      return false;
    }; 
  
  } else if (selectorType === "tag.class") {
    
    matchFunction = e => {
      var [tag, clase] = selector.split('.');
      return matchFunctionMaker(tag)(e) && matchFunctionMaker(`.${clase}`)(e);
    };
  
  } else if (selectorType === "tag") {
    matchFunction = e => e.tagName.toLowerCase() === selector; 
  }

  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
