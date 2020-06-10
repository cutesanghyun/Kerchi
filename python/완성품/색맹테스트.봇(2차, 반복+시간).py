from selenium import webdriver
from pprint import pprint
from collections import Counter
import time

driver = webdriver.Chrome('Chromedriver')
driver.get('http://zzzscore.com/color/')
driver.implicitly_wait(300)

btns = driver.find_elements_by_xpath('//*[@id="grid"]/div')

def analysys():
    btns_rgba = [ btn.value_of_css_property('background-color') for btn in btns]
    result = Counter(btns_rgba)
    for key, value in result.items():
        if value == 1:
            answer = key
            break
        else:
            answer = None
    if answer:
        index = btns_rgba.index(answer)     
        btns[index].click()

start = time.time()
while time.time() - start <= 60:
    analysys()


