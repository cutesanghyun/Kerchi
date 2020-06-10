from selenium import webdriver
from pprint import pprint
from collections import Counter
# 입력인자의 키,요소값의 종류와 각각의 갯수를 딕셔너리(객체)형태로 반환

driver = webdriver.Chrome('Chromedriver')
driver.get('http://zzzscore.com/color/')
driver.implicitly_wait(300)

btns = driver.find_elements_by_xpath('//*[@id="grid"]/div')
# (element와 elements 구별 조심)타겟이 포함된 모든 div 추출, 1차가공

# print(len(btns)) 
# 길이(갯수) 확인을 통해 제대로 가져오나 체크

# print(btns[0].value_of_css_property('background-color'))
# 색정보를 가져오는 코드. 동작확인을 위해 우선 1개만 체크

btns_rgba = [ btn.value_of_css_property('background-color') for btn in btns]
# 1차가공의 결과물들 내에서 대상을 선별하기 위한 필터를 만들기위해 각각의 색정보 추출, 2차가공
# pprint(btns_rgba)   (2차 가공물이 제대로 작동하나 확인)

result = Counter(btns_rgba)
# 2차 가공물의  키,요소값의 종류와 각각의 갯수를 딕셔너리(객체)형태로 반환, 3차가공
# pprint(result)   (여기서 value가 1인게 정답)

for key, value in result.items():
    if value == 1:
        answer = key
        break
    else:
        answer = None
# 3차가공물에서 단 1개의 갯수만 존재하는 종류의 키,요소값을 선별, 4차가공       

if answer:
    index = btns_rgba.index(answer)     
    btns[index].click()
# 4차가공물이 2차가공물의 몇번째 대상인지를 찾은뒤 그걸 이용해서 클릭, 완료 



