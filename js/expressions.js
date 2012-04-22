function sum(arr) { 
  return _.inject(arr,function (memo,element) { 
	  return memo+parseInt(_.values(element)[0])
  },0);
}

function expressIt(arr,n) {
  var expressed =""; 
  if (n < arr.length) {
    var obj = arr[n]; 
    var key = _.keys(obj)[0]; 
    var val = _.values(obj)[0];
    var plus = (n==0?'':'+');
    expressed=plus+val+'('+key+')'+expressIt(arr,n+1);
  }
  return expressed;
}

function getExpressions(arr) {
  expressions = _.map(arr,function (value,index,list) { 
    listToHere = list.slice(0,index+1);
    return '{'+_.keys(value)[0]+':'+sum(listToHere)+'}'+', ('+expressIt(listToHere,0)+')'
  });
  return expressions;
}
