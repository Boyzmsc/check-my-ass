from bs4 import BeautifulSoup as bs
from selenium import webdriver
import time

options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
# options .add_argument('headless')
browser = webdriver.Chrome(options=options)

# Login
browser.get("https://ecampus.kookmin.ac.kr/login/")

login_info = {
  'loginId' : 'boyzmsc',
  'loginPwd' : 'qwerasdf0101^^'
}

browser.find_element_by_name('loginId').send_keys(login_info['loginId'])
browser.find_element_by_name('loginPwd').send_keys(login_info['loginPwd'])

browser.find_element_by_name('loginbutton').click()

# Assignment
ass_info = []

courses_cnt = len(browser.find_elements_by_css_selector("a[class = 'course-link']"))

for i in range(courses_cnt):
  try:
    courses = browser.find_elements_by_class_name('course-link')
    course = courses[i]
  except IndexError:
    courses = browser.find_elements_by_class_name('course-link')
    course = courses[i]

  # Course Name
  check_idx = course.text.find('정규 강좌')
  if(check_idx == -1):
    continue
  l_idx = course.text.find('진행중') + 4
  r_idx = course.text.find('(') - 1
  course_name = course.text[l_idx : r_idx]

  hasAss = False
  course.click()
  btn_links = browser.find_elements_by_class_name('btn-link')
  for link in btn_links:
    if(link.text == '과제'):
      link.click()
      hasAss = True
      break
  
  if(hasAss):
    ass_names = browser.find_elements_by_css_selector("td[class = 'cell c1']")
    ass_due_date = browser.find_elements_by_css_selector("td[class = 'cell c2']")
    ass_complete = browser.find_elements_by_css_selector("td[class = 'cell c3']")

    for j in range(len(ass_names)):
      if(ass_complete[j].text != '제출 완료'):
        ass_data = {
          '강의명' : course_name,         
          '과제명' : ass_names[j].text,
          '종료 일시' : ass_due_date[j].text
        }
        ass_info.append(ass_data)

    browser.back()
  browser.back()

# Check Results
for ass in ass_info:
  print(ass, end = '\n')

