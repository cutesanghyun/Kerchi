from selenium import webdriver
from pprint import pprint
from collections import Counter
import time

driver = webdriver.Chrome('Chromedriver')
driver.get('http://zzzscore.com/color/')
driver.implicitly_wait(300)

start = time.time()
while time.time() - start <= 60:
    btn = driver.find_element_by_class_name("main")
    btn.click()
