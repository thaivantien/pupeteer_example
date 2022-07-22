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
      var result =0;
      const idTag = document.getElementById("section-featured");
      const section_contents = idTag.querySelectorAll(".section-content")
      for(var i=0; i<section_contents.length; i++){
          var article_list = section_contents[i].querySelectorAll('[class*="article-list"]')
        
          for( var j =0; j< article_list.length; j++){
                var articles = article_list[j].getElementsByTagName("article");
                for(var a =0; a < articles.length; a++){
                    var href =articles[a].querySelector(".article-title").getElementsByTagName("a")[0].href; 
                    result += href + "-" +articles[a].querySelector(".article-title").textContent;
                }
          }
      }
      return result;
  });
  console.log(title)
  await browser.close();
})();