/* All assessment and certificate generation stay in this browser. */
(() => {
  const form = document.querySelector('#qualification-form');
  const result = document.querySelector('#qualification-result');
  const canvas = document.querySelector('#certificate');
  const ctx = canvas.getContext('2d');
  const nameInput = document.querySelector('#student-name');
  const status = document.querySelector('#download-status');
  const feedback = {
    yes: 'Correct. You have identified a capacity constraint.',
    no: 'Correct. You have identified a growth opportunity.',
    meeting: 'Exceptional. You have demonstrated leadership potential.'
  };
  let credential = null;
  form.hidden = false;
  const seal = new Image();
  seal.src = '/assets/university-seal.svg';
  function centre(text, y, size, font = 'Georgia', colour = '#1c2a20', maxWidth = 1420) {
    ctx.fillStyle = colour;
    ctx.textAlign = 'center';
    let fitted = size;
    ctx.font = `${fitted}px ${font}`;
    while (ctx.measureText(text).width > maxWidth && fitted > 18) ctx.font = `${--fitted}px ${font}`;
    ctx.fillText(text, 842, y);
  }
  function rule(x1, y, x2, colour = '#bac5b3') {
    ctx.strokeStyle = colour; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
  }
  async function drawCertificate() {
    try { await seal.decode(); } catch (_) { /* The certificate text still works if the seal cannot load. */ }
    ctx.setTransform(1.5, 0, 0, 1.5, 0, 0);
    ctx.fillStyle = '#f4f0e6'; ctx.fillRect(0, 0, 1684, 1190);
    ctx.strokeStyle = '#203e2b'; ctx.lineWidth = 2; ctx.strokeRect(38, 38, 1608, 1114);
    ctx.strokeStyle = '#b5c0aa'; ctx.lineWidth = 1; ctx.strokeRect(50, 50, 1584, 1090);
    ctx.fillStyle = '#203e2b'; ctx.fillRect(74, 74, 1536, 8);
    centre('PLANWERK UNIVERSITY', 155, 31, 'Arial');
    centre('EST. PRE-LAUNCH  /  OFFICE OF SELF-ACCREDITATION', 188, 13, 'monospace', '#5c6a5b');
    centre('Certificate of', 277, 35);
    centre('Questionable Distinction', 342, 64);
    centre('THIS IS TO CERTIFY THAT', 411, 14, 'monospace', '#5c6a5b');
    centre(credential.name, 494, 66, 'Georgia');
    rule(205, 530, 1479);
    centre('has been conferred the entirely unofficial designation of', 578, 22);
    centre('CERTIFIED FRAMEWORK PRACTITIONER', 632, 33, 'Arial', '#245d3c');
    centre('Having successfully answered one question,', 690, 23);
    centre('and demonstrated sufficient confidence in the answer.', 724, 23);
    centre(`ISSUED ${credential.date.toUpperCase()}  /  ${credential.id}`, 790, 14, 'monospace', '#5c6a5b');
    if (seal.complete && seal.naturalWidth) ctx.drawImage(seal, 762, 840, 160, 160);
    ctx.textAlign = 'center'; ctx.fillStyle = '#1c2a20'; ctx.font = 'italic 34px Georgia';
    ctx.fillText('Sebastian Klett', 390, 902); ctx.fillText('Tom Ross', 1294, 902);
    rule(160, 927, 620); rule(1064, 927, 1524);
    ctx.font = '14px monospace'; ctx.fillStyle = '#5c6a5b';
    ctx.fillText('FOUNDER & CEO', 390, 957); ctx.fillText('HEAD OF GEMINI', 1294, 957);
    centre('Recognised by PlanWerk. Recognition elsewhere remains a matter for elsewhere.', 1061, 17);
    centre('This parody certificate is not an accredited educational or professional qualification.', 1095, 12, 'Arial', '#5c6a5b');
    canvas.setAttribute('aria-label', `Certificate for ${credential.name}, Certified Framework Practitioner, issued ${credential.date}, ${credential.id}. Signed by Sebastian Klett, Founder and CEO, and Tom Ross, Head of Gemini.`);
  }
  function filename(extension) {
    const name = credential.name.normalize('NFKC').replace(/[^\p{L}\p{N} _-]/gu, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'graduate';
    return `PlanWerk-Certificate-${name}.${extension}`;
  }
  function save(blob, name) {
    const url = URL.createObjectURL(blob), anchor = document.createElement('a');
    anchor.href = url; anchor.download = name; document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const name = nameInput.value.trim().replace(/\s+/g, ' ');
    nameInput.setCustomValidity(name ? '' : 'Please enter your name. Prestige requires paperwork.');
    if (!form.reportValidity()) return;
    const answer = new FormData(form).get('answer');
    if (!feedback[answer]) return;
    const button = form.querySelector('button'); button.disabled = true; button.textContent = 'Convening the academic board…';
    try {
      const bytes = new Uint8Array(3); crypto.getRandomValues(bytes);
      credential = {name, date: new Date().toLocaleDateString('en-AU', {day:'numeric', month:'long', year:'numeric'}), id: `PWU-${new Date().getFullYear()}-${[...bytes].map(b=>b.toString(16).padStart(2,'0')).join('').toUpperCase()}`};
      await drawCertificate();
      document.querySelector('#exam-feedback').textContent = feedback[answer];
      document.querySelector('#certificate-description').textContent = `${credential.name} · Certified Framework Practitioner · ${credential.date} · ${credential.id}`;
      document.querySelector('#exam-announcement').textContent = `Congratulations, ${name}. You passed. Your certificate and signature badges are ready to download.`;
      result.hidden = false; status.textContent = '';
      document.querySelector('#result-title').focus({preventScroll:true});
      result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    } catch (error) {
      document.querySelector('#exam-announcement').textContent = 'The academic board encountered a technical issue. Please try submitting again.';
    } finally { button.disabled = false; button.textContent = 'Submit for rigorous assessment ↗'; }
  });
  nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
  document.querySelector('#retake').addEventListener('click', () => {result.hidden = true; credential = null; form.scrollIntoView({block:'center'}); nameInput.focus();});
  document.querySelector('#download-pdf').addEventListener('click', async event => {
    if (!credential) return;
    const button = event.currentTarget; button.disabled = true; status.textContent = 'Preparing your official-looking paperwork…';
    try {
      if (!window.PDFLib) throw new Error('PDF library unavailable');
      const pdf = await PDFLib.PDFDocument.create();
      pdf.setTitle(`PlanWerk University certificate: ${credential.name}`);
      pdf.setAuthor('PlanWerk University'); pdf.setSubject('Unofficial Certified Framework Practitioner certificate');
      const image = await pdf.embedPng(canvas.toDataURL('image/png'));
      const page = pdf.addPage([841.89,595.28]); page.drawImage(image,{x:0,y:0,width:841.89,height:595.28});
      save(new Blob([await pdf.save()],{type:'application/pdf'}),filename('pdf'));
      status.textContent = 'Certificate downloaded. Your email signature is about to become less modest.';
    } catch (error) {status.textContent = 'The PDF could not be prepared. Please try again, or download the PNG version.';}
    finally {button.disabled=false;}
  });
  document.querySelector('#download-png').addEventListener('click', event => {
    if (!credential) return;
    const button=event.currentTarget;button.disabled=true;
    canvas.toBlob(blob=>{if(blob){save(blob,filename('png'));status.textContent='Certificate image downloaded.';}else status.textContent='The image could not be prepared. Please try again.';button.disabled=false;},'image/png');
  });
})();
