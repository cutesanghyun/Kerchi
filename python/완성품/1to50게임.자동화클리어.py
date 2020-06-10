from selenium import webdriver

driver = webdriver.Chrome('chromedriver')
driver.get('http://zzzscore.com/1to50')
driver.implicitly_wait(1000) #처음에 드라이버 가져오는 시간을 줌

num = 1

def clickBtn():
    global num
    btns = driver.find_elements_by_xpath('//*[@id="grid"]/div[*]')

    for btn in btns:
        print(btn.text, end='\t')
        if btn.text==str(num):
            btn.click()
            print(True)
            num+=1
            return

while num<=50:
    clickBtn()
