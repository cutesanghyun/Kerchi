from selenium import webdriver
from bs4 import BeautifulSoup
import time


url = 'https://poe.ninja/standard/currency'

driver = webdriver.Chrome()
driver.get(url)

time.sleep(3)

html = driver.page_source
soup = BeautifulSoup(html)

data = soup.find('tbody').findAll('tr')
global showprice
for tr in data:
    target = tr.findAll('img',{'title':'엑잘티드 오브'})
    if target:
        showprice = tr.find('span',{'class':'currency-amount'}).text

currency = open('currency.txt', 'w', encoding='utf8')
print(showprice, file=currency)
currency.close()

driver.close()


