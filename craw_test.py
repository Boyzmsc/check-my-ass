from bs4 import BeautifulSoup as bs
from selenium import webdriver
import time
from datetime import datetime

# Assignment Info
ass_info = []

# Login Info
login_info = {
  'loginId' : '',
  'loginPwd' : ''
}

# Url Info
univ_url = {
  '국민대학교' : 'https://ecampus.kookmin.ac.kr/login/'
}
access_url = ''

def crawling():
  options = webdriver.ChromeOptions()
  options.add_experimental_option("excludeSwitches", ["enable-logging"])
  options.add_argument('headless')
  options.add_argument('window-size=1920x1080')
  options.add_argument("disable-gpu")
  browser = webdriver.Chrome(options=options)

  browser.get(access_url)

  browser.find_element_by_name('loginId').send_keys(login_info['loginId'])
  browser.find_element_by_name('loginPwd').send_keys(login_info['loginPwd'])
  browser.find_element_by_name('loginbutton').click()
  
  try:
    courses_cnt = len(browser.find_elements_by_css_selector("a[class = 'course-link']"))
  except Exception as e:
    print("로그인 실패")
    return False

  for i in range(courses_cnt):
    courses = browser.find_elements_by_class_name('course-link')
    while(len(courses) == 0):
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

  return True

def print_ass(arr):
  # Check Results
  for ass in arr:
    print(ass, end = '\n')

def sort_ass_time(arr):
  # Sort By Datetime
  return sorted(arr, key = lambda x: datetime.strptime(x['종료 일시'], '%Y-%m-%d %H:%M'))

def sort_ass_name(arr):
  # Sort By Lecture Name
  # return sorted(arr, key = lambda x : x['강의명'])
  return sorted(arr, key = lambda x : x['강의명'], reverse = True)

def search_ass(arr):
  # Test Search Func
  lookAt = input("과목명을 입력하세요 : ")
  exits = False
  for ass in arr:
    if ass['강의명'].find(lookAt) != -1:
      exits = True
      print(ass, end = '\n')
  
  if exits == False:
    print("찾으시는 과목이 없습니다.")
    search_ass(arr)

def set_univ():
  univ_name = input("대학명을 입력하세요 : ")
  for u_name, u_url in univ_url.items():
    if u_name == univ_name:
      return u_url
  return "None"

def set_login():
  global access_url
  global login_info
  access_url = set_univ()
  while(access_url == "None"):
    print("찾으시는 대학이 없습니다. 다시 입력해주세요.")
    access_url = set_univ()

  login_id = input("Id : ")
  login_info['loginId'] = login_id
  login_pwd = input("Password : ")
  login_info['loginPwd'] = login_pwd

if __name__ == "__main__":
    # Login Setting
    set_login()

    # Crawling Assignment
    if crawling():
      print("----------------")

      print_ass(ass_info)
      print("----------------")

      ass_sorted_time = sort_ass_time(ass_info)
      print_ass(ass_sorted_time)
      print("----------------")

      ass_sorted_name = sort_ass_name(ass_info)
      print_ass(ass_sorted_name)
      print("----------------")

      search_ass(ass_info)