from selenium import webdriver
from bs4 import BeautifulSoup
import time
from openpyxl import Workbook

url2 = 'https://poe.ninja/standard/fossils'
driver = webdriver.Chrome()
time.sleep(3)
driver.get(url2)
time.sleep(3)
html2 = driver.page_source
soup2 = BeautifulSoup(html2)
data2 = soup2.find('tbody').findAll('tr')
global i
wb = Workbook()
ws1 = wb.active 
i = 2
for tr in data2[3:]:    
    target1 = tr.findAll('span')[1].text  
    t2src = tr.findAll('span')[4].text  
    target2 = t2src[:len(t2src)-1]
    ws1.cell(row=i, column=1, value=target1)
    ws1.cell(row=i, column=2, value=target2) 
    i = i + 1 
wb.save('currency2.xlsx')
driver.close()






