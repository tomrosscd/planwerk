const assert=require('node:assert/strict');
const fs=require('fs');
fs.mkdirSync('/tmp/planwerk-new-pages',{recursive:true});
const {chromium}=require('/Users/tomross/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});try{
for(const width of [375,768,1440]){
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const name of ['university','compare','open-letter']){
  await page.goto('http://127.0.0.1:8765/'+name+'.html');await page.evaluate(()=>document.fonts.ready);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+' overflow '+width);
  assert.deepEqual(await page.locator('.nav-links a').allTextContents(),['About','Team']);
  assert.deepEqual(await page.locator('.foot-links a').allTextContents(),['University','Compare','Open Letter','Operations & Systems']);
  await page.screenshot({path:`/tmp/planwerk-new-pages/${name}-${width}.png`,fullPage:true});
 }
 assert.equal(errors.length,0);console.log(width+'px: three pages, no overflow or JS errors, header/footer correct');await page.close();
}
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce',acceptDownloads:true});
await page.goto('http://127.0.0.1:8765/university.html');
await page.locator('#qualification-form button').click();assert(!await page.locator('#qualification-result').isVisible());
await page.locator('#student-name').fill('   ');await page.locator('[value="yes"]').check();await page.locator('#qualification-form button').click();assert(!await page.locator('#qualification-result').isVisible());
for(const [answer,name,expected] of [['yes','Alexandra O’Connor-Smith','capacity constraint'],['no','Zoë 李','growth opportunity'],['meeting','<img src=x onerror=alert(1)>','leadership potential']]){
 await page.locator('#student-name').fill(name);await page.locator(`[value="${answer}"]`).check();await page.locator('#qualification-form button').click();await page.locator('#qualification-result').waitFor({state:'visible'});
 assert((await page.locator('#exam-feedback').innerText()).includes(expected));assert((await page.locator('#certificate-description').innerText()).includes(name));assert.equal(await page.locator('#qualification-result img[src="x"]').count(),0);
 if(answer==='yes'){
  await page.locator('#certificate').screenshot({path:'/tmp/planwerk-new-pages/certificate-preview.png'});
  const id=await page.locator('#certificate-description').innerText();
  const downloadPromise=page.waitForEvent('download');await page.locator('#download-pdf').click();const download=await downloadPromise;await download.saveAs('/tmp/planwerk-new-pages/certificate.pdf');
  assert(fs.readFileSync('/tmp/planwerk-new-pages/certificate.pdf').subarray(0,4).toString()==='%PDF');
  const pngPromise=page.waitForEvent('download');await page.locator('#download-png').click();await (await pngPromise).saveAs('/tmp/planwerk-new-pages/certificate.png');
  assert.equal(await page.locator('#certificate-description').innerText(),id);
 }
 if(answer==='no') {const d=page.waitForEvent('download');await page.locator('#download-pdf').click();await(await d).saveAs('/tmp/planwerk-new-pages/unicode-certificate.pdf');await page.locator('#certificate').screenshot({path:'/tmp/planwerk-new-pages/unicode-certificate-preview.png'});}
 await page.locator('#retake').click();assert(!await page.locator('#qualification-result').isVisible());
}
await page.locator('#student-name').fill('Alexandra Maximiliana von Frameworkington-Smythe of Upper Cremorne');await page.locator('[value="yes"]').check();await page.locator('#qualification-form button').click();await page.locator('#qualification-result').waitFor({state:'visible'});await page.locator('#certificate').screenshot({path:'/tmp/planwerk-new-pages/long-name-certificate.png'});
for(const mode of ['dark','light'])for(const format of ['png','svg']){const d=page.waitForEvent('download');await page.locator(`a[download][href="/assets/certified-${mode}.${format}"]`).click();await(await d).saveAs(`/tmp/planwerk-new-pages/badge-${mode}.${format}`);}
assert(await page.evaluate(()=>localStorage.length===0));console.log('All exam answers, validation, Unicode, literal HTML, long names, PDF/PNG and badge downloads passed');
await page.locator('[data-visitor]').click();await page.locator('.visitor-dialog img').evaluate(e=>e.decode());assert(await page.locator('.visitor-dialog').isVisible());await page.keyboard.press('Escape');assert(!await page.locator('.visitor-dialog').isVisible());assert(await page.locator('[data-visitor]').evaluate(e=>e===document.activeElement));console.log('Footer prank and focus restoration passed');
await page.goto('http://127.0.0.1:8765/compare.html');await page.setViewportSize({width:375,height:900});
assert(await page.locator('.table-scroll').evaluate(e=>{e.scrollLeft=e.scrollWidth;return e.scrollLeft>0}));
await page.goto('http://127.0.0.1:8765/open-letter.html');assert(!/Luke|co-founder|technical director/i.test(await page.locator('main').innerText()));
await page.pdf({path:'/tmp/planwerk-new-pages/open-letter-print.pdf',printBackground:true,preferCSSPageSize:true});console.log('Comparison horizontal scroll and open-letter print generated');
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:375,height:900}});await nojs.goto('http://127.0.0.1:8765/university.html');assert(!await nojs.locator('#qualification-form').isVisible());assert(await nojs.locator('.notice').isVisible());console.log('No-JavaScript fallback passed');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
