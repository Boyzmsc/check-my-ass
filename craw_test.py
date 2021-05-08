from selenium import webdriver
import requests
from bs4 import BeautifulSoup

browser = webdriver.Chrome("chromedriver")

# 1. 로그인 페이지 이동
browser.get("https://ecampus.kookmin.ac.kr/login/index.php")

# 2. 로그인
browser.find_element_by_id("input-username").send_keys("boyzmsc")
browser.find_element_by_id("input-password").send_keys("qwerasdf0101^^")

browser.find_element_by_name("loginbutton").click()

# 3. 강의-과제 페이지
course_ids = browser.find_element_by_css_selector(
    "#page-content > div > div > section.col-lg-8.col-xl-9.col-dash > div > div > div > div.my-course-lists > div > div"
)

# browser.find_element_by_css_selector(
#     "#page-content > div > div > section.col-lg-8.col-xl-9.col-dash > div > div > div > div.my-course-lists > div > div > div:nth-child(7) > a"
# ).click()

# # 4. 과제 페이지
# browser.find_element_by_css_selector(
#     "#module-activities > ul > li:nth-child(2) > a"
# ).click()


# login_url = "https://ecampus.kookmin.ac.kr/login/index.php"
# craw_url = "https://ecampus.kookmin.ac.kr/calendar/view.php?view=month&cal_m=05"

# session = requests.session()

# params = dict()
# params["loginId"] = "boyzmsc"
# params["loginPwd"] = "qwerasdf0101^^"

# login = session.post(login_url, data=params)
# login.raise_for_status()

# # print(login.headers)
# # print(session.cookies.get_dict())

# login = session.get(craw_url)

# soup = BeautifulSoup(login.text, "html.parser")

# data = soup.select_one(
#     "#month-detailed-6096262cb40ed6096262c1b5ad2 > tbody > tr:nth-child(2) > td:nth-child(3) > div.d-none.d-md-block.hidden-phone.text-xs-center > div > ul > li:nth-child(1) > a > span.eventname"
# )

# print(data.get_text())

# for item in data:
#     print(item.get_text())
