#!C:\Users\sh\AppData\Local\Programs\Python\Python38-32\python.exe

print("Content-Type: text/html; charset=utf-8\n")

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

currency = open('currency.txt','r',encoding='utf8')
result = currency.readline()[0:3]
currency.close()

print(f'''<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='../style.css'>
    <title>POE</title>
</head>

<body>
    <h1>패스 오브 엑자일</h1>
    <div id='goHome'><a href="../index.html" title="메인항목으로 이동">메인 페이지로</a></div>
    <div id="lists">
        <h2><a href=./0.py>시세표</a></h2>
        <h2><a href=./1.html>퉁퉁볼</a></h2>
        <h2><a href=./2.html>상태이상번역</a></h2>
    </div>
    <style>
        td {
            width: 50px;
            height: 20px;
            border: 1px solid gray;
            border-collapse: collapse;
            text-align: center;
        }
        table {
            border: 1px solid gray;
            display: inline-block;
        }
        #name {
            width: 75px;
            border: none;
        }
    </style>
    <div>
        <div id="exal"></div>
        <table>
            <tr>
                <td id="name">뾰족</td> 
            </tr>
            <tr>
                <td>{result}</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr>
                <td>가격</td>
                <td>0.4</td>
                <td>0.5</td>
                <td>0.4</td>
            </tr>
            <tr>
                <td>갯수</td>
                <td>15</td>
                <td>4</td>
                <td>4</td>
            </tr>
            <tr>
                <td>구매이득</td>
                <td>10.8</td>
                <td>2.5</td>
                <td>2.9</td>
            </tr>
            <tr>
                <td>판매이득</td>
                <td>86</td>
                <td>74</td>
                <td>86</td>
            </tr>
        </table>
        </table>
        <script src="0.js"></script>
    </div>
    <div id="bottomBlank">©2020 Kerchi
    </div>
</body>

</html>''')
