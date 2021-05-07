import requests
from bs4 import BeautifulSoup

login_url = 'https://ecampus.kookmin.ac.kr/login/index.php'
craw_url = 'https://ecampus.kookmin.ac.kr/'

session = requests.session()

params = dict()
params['m_id'] = 'boyzmsc'
params['m_password'] = 'qwerasdf0101^^'

login = session_data.post(login_url, data = params)
login.raise_for_status()
 
#print(login.headers)
#print(session_data.cookies.get_dict())
 
login = session_data.get(craw_url)
 
soup = BeautifulSoup(login.content, 'html.parser')
 
data = soup.select('dl.mileage_section1 > dd > span')

for item in data:
    print (item.get_text())