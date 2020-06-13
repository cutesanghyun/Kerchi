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
  '2048',
];

let i = 0;
while (i < 목록.length) {
  document.write('<h2><a href="./' + 목록[i] + '.html">' + 목록[i] + '</a></h2>');
  i = i + 1;
}

