let selectLists = document.querySelector('#lists')
let makeH2 = document.createElement('h2')
selectLists.append(makeH2)

const 목록 = [
  '계산기',
  '끝말잊기',
  '네이버모방',
  '구구단',
  '숫자야구',
  '틱택토',
  '로또번호추첨',
  '감껨보',
  '지뢰찾기',
  '반응속도',
  '카드뒤집기',
  '자스스톤',
];

let i = 0;
while (i < 목록.length) {
  document.write('<h2><a href="./' + 목록[i] + '.html">' + 목록[i] + '</a></h2>');
  i = i + 1;
}





// // var 목록 = ['HTML','CSS','JavaScript','JavaScript2','Python','AutoHotKey','영어','크롤링'];
// // var i = 0;
// // while(i < 목록.length){
// //   var ii = i + 1;
// //   document.write('<li><a href="'+ii+'.html">'+목록[i]+'</a></li>');
// //   i = i + 1;
// }



// {/* <h2><a href=./calculator/index.html>계산기</a></h2>
// <h2><a href=./chainword/index.html>끝말잊기</a></h2>
// <h2><a href=./Cht.1/naver.html>네이버흉내</a></h2>
// <h2><a href=./gugu/1.html>구구단</a></h2>
// <h2><a href=./baseball/b.html>숫자야구</a></h2>
// <h2><a href=./Tictacto/tic.html>틱택토</a></h2>
// <h2><a href=./lotto/lotto.html>로또번호추첨</a></h2>
// <h2><a href=./R.P.S/index.html>감껨보</a></h2>
// <h2><a href=./findmine/index.html>지뢰찾기</a></h2>
// <h2><a href=./Reactiontime/index.html>반응속도</a></h2> */}
