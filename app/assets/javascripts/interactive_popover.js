//Start modal popover js
 
function popOver(name,abbreviation,div_name,content) {
  this.name = name;
  this.abbreviation = abbreviation;
  this.div_name = div_name ;
  this.content = content;
}
 
popOver.prototype.initiate = function(){
  eval(this.name + "= $('div.sub_process[name=\"" + this.div_name + "\"] a[name=\"End\"]').popover({placement: 'right', content: this.content, html: true, trigger:'click'});");
}
 
popOver.prototype.setEventHandlers = function(handlers_array){
  var popover = this ;
  for (var i = 0; i < handlers_array.length; i++) {
    switch(handlers_array[i]){
      case 'shown':
        var  abbreviation = this.abbreviation ;
        var $link = $('div.sub_process[name="' + popover.div_name + '"] a:contains("End")') ;
        eval(popover.name).on('shown',function(e){
          eval("shown" + abbreviation)(e);
        });
        break;
      case 'hide':
        $link.attr('active', false) ;
        eval(popover.name).on('hide', function(){
        })
      break;
    }
  }         
}
  
function shownSPE(e){
  var $container_div = $(e.target).parent('div.sub_process')
  var $end_link = $(e.target)
  var $popover = $(e.target).siblings('.popover') ;
  var $yes_link = $popover.children('div').children('div').children('a:contains("Yes")') ;
  var $no_link = $popover.children('div').children('div').children('a:contains("No")') ;
  $yes_link.click(function(){
    container_div = eval('$container_div') ;
    link = eval('$end_link') ;
    subProcessElements.end(container_div, link) ;   
  })
  $no_link.click(function(){
    $end_link.popover('hide') ;  
  })
}
 
function storeSPEData(){
  eval("shown" + this.abbreviation + "Data")($link);
  var $element = $('div.sub_process[name="' + popover.div_name + '"] a:contains("End")') 
}
 
//End modal pop-over js
