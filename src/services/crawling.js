const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const {By, Key} = require("selenium-webdriver");
const path = require("path");

const screen = {
  width: 1920,
  height: 1080,
};

const univ_url_list = {
  KMU: "https://ecampus.kookmin.ac.kr/login/",
  SNU: "https://my.snu.ac.kr/",
  YONSEI: "https://portal.yonsei.ac.kr/main/index.jsp",
  KOREA: "https://portal.korea.ac.kr/front/Intro.kpd",
  SKKU: "https://login.skku.edu/",
};

module.exports = async function (univ, loginId, loginPwd) {
  let ass_data = [];
  let lec_data = [];

  const chromePath = path.join(__dirname, "chromedriver.exe");
  const service = new chrome.ServiceBuilder(chromePath).build();
  chrome.setDefaultService(service);

  var options = new chrome.Options();
  options.headless().windowSize(screen);
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-gpu");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--remote-debugging-port=9222");

  const driver = await new webdriver.Builder()
    .forBrowser("chrome")
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(options)
    .build();

  let access_url = univ_url_list[univ];

  await driver.get(access_url);

  await driver.findElement(By.name("loginId")).sendKeys(loginId);
  await driver.findElement(By.name("loginPwd")).sendKeys(loginPwd);
  await driver.findElement(By.name("loginbutton")).sendKeys(Key.ENTER);

  // For successful crawling
  var ele = driver.findElements(By.className("course-link"));

  let courses_cnt;
  try {
    await driver
      .findElements(
        By.css(
          "#page-content > div > div > section.col-lg-8.col-xl-9.col-dash > div > div > div > div.my-course-lists > div > div > div > a",
        ),
      )
      .then((data) => {
        courses_cnt = data.length;
        console.log(data.length)
      });
  } catch (e) {
    console.log("Login Failed");
    setTimeout(async () => {
      await driver.quit();
    }, 1000);
    return false;
  }
  for (var k = 0; k < courses_cnt; k++) {
    let course;
    await driver
      .findElements(
        By.css(
          "#page-content > div > div > section.col-lg-8.col-xl-9.col-dash > div > div > div > div.my-course-lists > div > div > div > a",
        ),
      )
      .then((data) => {
        course = data[k];
      });

    // Course Name
    let course_txt = await course.getText();

    let check_idx = course_txt.indexOf("정규 강좌");
    if (check_idx === -1) {
      continue;
    }

    let l_idx = course_txt.indexOf("진행중") + 4;
    let r_idx = course_txt.indexOf(" ", l_idx);

    let course_name = course_txt.substring(l_idx, r_idx);

    l_idx = course_txt.indexOf(")", r_idx + 1) + 2;
    r_idx = course_txt.length;

    let prof_name = course_txt.substring(l_idx, r_idx);

    lec_data.push({lec_name: course_name, prof_name: prof_name});

    let hasAss = false;
    await course.sendKeys(Key.ENTER);

    let btn_link_list = await driver.findElements(By.className("btn-link"));

    for (var i = 0; i < btn_link_list.length; i++) {
      var btn_link = await btn_link_list[i];
      var btn_link_txt = await btn_link.getText();
      if (btn_link_txt === "과제") {
        hasAss = true;
        await btn_link.sendKeys(Key.ENTER);
        break;
      }
    }

    if (hasAss) {
      let ass_names = await driver.findElements(
        By.css("td[class = 'cell c1']"),
      );
      let ass_due_date = await driver.findElements(
        By.css("td[class = 'cell c2']"),
      );
      let ass_complete = await driver.findElements(
        By.css("td[class = 'cell c3']"),
      );
      let ass_link = await driver.findElements(
        By.css("td[class = 'cell c1'] > a"),
      );

      for (var j = 0; j < ass_names.length; j++) {
        var ass_complete_txt = await ass_complete[j].getText();
        var ass_due_date_txt = await ass_due_date[j].getText();
        var due_date = await ass_due_date_txt.replace(" ", "T");

        let isTimeOut =
          new Date().getTime() <= new Date(due_date).getTime() ? false : true;

        if (ass_complete_txt === "미제출" && !isTimeOut) {
          let ass_info = {
            status: "Progress",
            ass_name: await ass_names[j].getText(),
            lec_name: course_name,
            due_date: due_date,
            ass_link: await ass_link[j].getAttribute("href"),
            flag: new Date(due_date).getTime(),
          };

          ass_data.push(ass_info);
        } else if (ass_complete_txt === "제출 완료") {
          let ass_info = {
            status: "Done",
            ass_name: await ass_names[j].getText(),
            lec_name: course_name,
            due_date: due_date,
            ass_link: await ass_link[j].getAttribute("href"),
            flag: new Date(due_date).getTime(),
          };

          ass_data.push(ass_info);
        } else if (ass_complete_txt === "미제출" && isTimeOut) {
          let ass_info = {
            status: "TimeOut",
            ass_name: await ass_names[j].getText(),
            lec_name: course_name,
            due_date: due_date,
            ass_link: await ass_link[j].getAttribute("href"),
            flag: new Date(due_date).getTime(),
          };

          ass_data.push(ass_info);
        }
      }
      await driver.navigate().back();
    }
    await driver.navigate().back();
  }

  setTimeout(async () => {
    await driver.quit();
  }, 1000);

  let rlt_data = [];
  rlt_data.push(lec_data);
  rlt_data.push(ass_data);
  console.log(rlt_data);

  return rlt_data;
};
