var 목록 = ['HTML','CSS','JavaScript','JavaScript2','Python','AutoHotKey','영어','크롤링','PHP'];
var i = 0;
while(i < 목록.length){
  var ii = i + 1;
  document.write('<li><a href="'+ii+'.html">'+목록[i]+'</a></li>');
  i = i + 1;
}

