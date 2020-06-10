from selenium import webdriver
from bs4 import BeautifulSoup
import time

url = 'https://poe.ninja/challenge/currency'

driver = webdriver.Chrome()
driver.get(url)

time.sleep(3)

html = driver.page_source
soup = BeautifulSoup(html)

data = soup.find('tbody').findAll('tr')
# tbody영역내의 모든 tr들 찾기

global showprice
# 글로벌 변수 지정(값이 반복문안의 조건문 속에 있기때문)

for tr in data:
    target = tr.findAll('img',{'title':'엑잘티드 오브'})
    # 타이틀의 속성값이 엑잘티드 오브인 img태그가 담겨있는 tr 찾기

    if target:
    # 만약 그런 tr을 찾았으면,
        showprice = tr.find('span',{'class':'currency-amount'}).text
        # 해당 tr내에서 class의 속성값이 currency-amount인 span 태그를 찾아서 해당 태그의 텍스트값(현재시세)을 전역변수 showprice에 할당

print(showprice)
driver.close()


