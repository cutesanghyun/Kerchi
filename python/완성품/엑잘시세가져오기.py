from selenium import webdriver
from bs4 import BeautifulSoup
import time
from openpyxl import Workbook

url = 'https://poe.ninja/standard/currency'
driver = webdriver.Chrome()
driver.get(url)
time.sleep(3)
html = driver.page_source
soup = BeautifulSoup(html)
data = soup.find('tbody').findAll('tr')
global exalPrice
wb = Workbook()
ws1 = wb.active 
for tr in data:
    target = tr.findAll('img',{'title':'엑잘티드 오브'})
    if target:
        exsrc = tr.find('span',{'class':'currency-amount'}).text
        exalPrice = int(exsrc[:len(exsrc)-3])
        ws1.cell(row=1, column=1, value=exalPrice)
wb.save('currency.xlsx')
driver.close()






