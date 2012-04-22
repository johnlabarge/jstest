function logReturn(msg,data) { 
    console.log(msg+'-> '+'{'+_.keys(data)[0]+':'+_.values(data)[0]+'}');
}

function call1() {
    $.ajax({url:'/query/1', type:'get'}).done(function(data) { 
        logReturn('call1 returned',data);
        call2(data); 
    });
}

function call2(data1) {
    $.ajax({url:'/query/2',data:{query:data1.a},type:'get'}).done(function(data) { 
        logReturn('call2 returned',data);
        call3(data1,data); 
    });
} 

function call3(data1,data2) {
    $.ajax({url:'/query/3', data:{q1:data1.a, q2:data2.b},type:'get'}).done(function(data){
        logReturn('call2 returned',data);
        updateResponses(data1,data2,data);
    });
}

function updateResponses(data1,data2,data3) {  
    var expressions = getExpressions([data1,data2,data3]); 
    var theHtml = getHtml(expressions);
    $('#responses').html(theHtml); 
}

function getHtml(expressions) { 
   return _.inject(expressions,function(memo,val,index) {
     if (index>0) {
          return memo+", "+val;
     } else { 
          return memo+val;
         }
   }, "");     
}

$(document).ready(function () {
    $('#testButton').click(function(event) {
        call1();
    });
  }
);

