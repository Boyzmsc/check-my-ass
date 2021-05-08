from bs4 import BeautifulSoup as bs
from selenium import webdriver

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

# for i in range(0,8):
  browser.find_element_by_css_selector("#page-content > div > div > section.col-lg-8.col-xl-9.col-dash > div > div > div > div.my-course-lists > div > div > div:nth-child(2)").click()
  btn_links = browser.find_elements_by_class_name('btn-link')
  for link in btn_links:
    if(link.text == '과제'):
      link.click()
      break
  

# browser.find_element(By.TEXT, '과제').click()
