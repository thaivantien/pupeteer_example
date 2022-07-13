const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({
      width: 1024,
      height: 1024,
      deviceScaleFactor: 1
  })
  await page.goto('https://zingnews.vn/');
 
  const title = await page.evaluate(()=>{
      var className = "";
      const idTag = document.getElementById("section-featured");
      const classTag = idTag.querySelectorAll(".article-item.type-text.picked-featured")
      for(var i=0; i< classTag.length; i++){
          var title = classTag[i].querySelector(".article-title")
          className += title.getElementsByTagName("a")[0].href +"\n";
      }
      return className;
  });
  console.log(title);
  await browser.close();
})();