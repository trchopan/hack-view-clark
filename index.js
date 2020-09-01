const LOOP_TIME = 10;

const puppeteer = require('puppeteer');

const runme = async () => {
  const second = 1000;
  const minute = 60 * second;
  const browser = await puppeteer.launch({headless: false});
  for (let i = 0; i < LOOP_TIME; i++) {
    const page = await browser.newPage();
    await page.goto('https://youtu.be/lTXtgTcNtSo');
    await page.waitFor((Math.random() * 10 + 5) * second);
    await page.evaluate(function () {
      const player = document.getElementsByClassName('video-stream html5-main-video')[0];
      // Fake seek randomly to mimic human
      player.play();
    });
    await page.waitFor(Math.random() * 10 * second);
    await page.evaluate(function () {
      const player = document.getElementsByClassName('video-stream html5-main-video')[0];
      // Fake seek randomly to mimic human
      player.currentTime = Math.random() * 10;
    });
    // Wait for all video to finish
    await page.waitFor(13 * minute);
    await page.close();
  }

  // await page.screenshot({ path: "example.png" });

  await browser.close();
};

runme();
