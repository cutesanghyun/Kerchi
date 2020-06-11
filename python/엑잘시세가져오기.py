from selenium import webdriver
from bs4 import BeautifulSoup
import time

url = 'http://play.afreecatv.com/coppag/224499973'

driver = webdriver.Chrome()
driver.get(url)

time.sleep(3)

html = driver.page_source
soup = BeautifulSoup(html)

data = soup.find('video',{'id':'pipMedia'})
print(data)



