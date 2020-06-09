#!C:\Users\sh\AppData\Local\Programs\Python\Python38-32\python.exe
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

print("Content-Type: text/html; charset=utf-8\n")
import cgi
form = cgi.FieldStorage()

print('''<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kerchi</title>
  <link rel="stylesheet" href='./style.css'>
</head>

<body>
  <h1>백수 외길 인생 40년</h1>
  <div id='goHome'>여기가 메인임</div>
  <div id="lists">
    <!-- 목차 -->
    <h2><a href=./Learnning/index.html>강의노트</a></h2>
    <h2><a href=./Train/index.html>습작품</a></h2>
    <h2><a href=./PathOfExile/index.html>패스오브엑자일</a></h2>
  </div>
  <div>
    <h4>검색도구</h4>
    <a href="https://www.google.com/search?sxsrf=ALeKk00XsuaQEQvYi-vUOKa98BjuOjc8Ag%3A1591430165875&ei=FUzbXv79NMrT-Qbf3bbABA&q=site%3Ahttps%3A%2F%2Fdeveloper.mozilla.org%2F+javascript+%28%29&oq=site%3Ahttps%3A%2F%2Fdeveloper.mozilla.org%2F+javascript+%28%29&gs_lcp=CgZwc3ktYWIQAzoCCAA6BQgAEMsBOgQIABAeOgYIABAHEB5Q1BFYrSRg7S1oAHAAeACAAYwBiAGnB5IBAzAuOJgBAKABAaABAqoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwi-3OKt2-zpAhXKad4KHd-uDUgQ4dUDCAw&uact=5"
      target="_blank">자바스크립트 검색</a><br>
    <a href="https://en.dict.naver.com/#/main" target="_blank">영어 사전</a>
    <h4>비주얼 스튜디오 코드 단축키</h4>
    <div>
      <ul>
        <li>컨트롤+쉬프트+k: 행 삭제</li>
        <li>알트 누른채로 위아래: 행 이동</li>
        <li>컨트롤+알트 누른채로 위아래: 다중선택</li>
        <li>(단어선택후)컨트롤+d: 동일한 단어중 다음꺼 선택</li>
        <li>(단어선택후)컨트롤+쉬프트+l: 동일한 모든 단어 선택</li>
        <li>컨트롤+],[: 라인 들여쓰기,내쓰기</li>
      </ul>
    </div>
    <h4>공사장</h4><br>
    <span style="margin-top:50px;">
      <input id=b type="text" placeholder="주소입력창">
    </span>
    <button id="click">전환</button>
    <div id="myresult">
    </div><br><br>
    <script>
      document.querySelector('#click').addEventListener('click', () => {
        const a = document.querySelector('#b').value
        if (a) {
          document.querySelector('#myresult').textContent = '.\\ffmpeg -i "https://vod-secure.twitch.tv/' + a + '/chunked/index-dvr.m3u8" -bsf:a aac_adtstoasc -c copy twitch.mp4'
        }
        else {
          document.querySelector('#myresult').textContent = '주소입력부터 해주세요.'
        }
      });
    </script>
  </div>
  <div id="bottomBlank">©2020 Kerchi
  </div>
</body>

</html>''')