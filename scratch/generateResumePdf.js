const fs = require('fs');
const path = require('path');

// Simple minimal PDF structure with full resume text content
const pdfContent = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj

2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj

3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 6 0 R
>>
endobj

4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj

5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj

6 0 obj
<<
  /Length 1250
>>
stream
BT
/F1 20 Tf
50 740 Td
(HASIN F) Tj
/F2 10 Tf
0 -16 Td
(Computer Science & Engineering Student | Software Developer | AI/ML Enthusiast) Tj
0 -14 Td
(Email: hasinfarukjan@gmail.com | Phone: +91 9344475074) Tj
0 -14 Td
(GitHub: github.com/hasinfarukjan2006 | LinkedIn: linkedin.com/in/hasin-f/) Tj

0 -25 Td
/F1 12 Tf
(PROFESSIONAL SUMMARY) Tj
0 -14 Td
/F2 10 Tf
(Computer Science and Engineering student with hands-on experience in software development,) Tj
0 -12 Td
(Artificial Intelligence, Machine Learning, and Edge AI.) Tj

0 -22 Td
/F1 12 Tf
(EDUCATION) Tj
0 -14 Td
/F1 10 Tf
(B.E. Computer Science & Engineering) Tj
/F2 10 Tf
( - M. Kumarasamy College of Engineering, Karur | CGPA: 7.77/10.00) Tj

0 -22 Td
/F1 12 Tf
(INTERNSHIP EXPERIENCE) Tj
0 -14 Td
/F1 10 Tf
(Softrate Technologies Pvt. Ltd. - Web Development Intern) Tj
/F2 10 Tf
( (June 2026 | Chennai)) Tj
0 -12 Td
(- Developed responsive web interfaces across 24 pages (Invoice, Quote, Receipt, Revenue Forecaster).) Tj
0 -14 Td
/F1 10 Tf
(CodSoft - Full Stack Development Intern) Tj
/F2 10 Tf
( (July 03 - July 10, 2025 | Remote)) Tj
0 -14 Td
/F1 10 Tf
(InternPe - Web Development Intern) Tj
/F2 10 Tf
( (July 07 - August 03, 2025 | Remote)) Tj

0 -22 Td
/F1 12 Tf
(FEATURED PROJECTS) Tj
0 -14 Td
/F1 10 Tf
(SafeCare: AI-Based Context-Aware Smart Hearing Aid (2026)) Tj
0 -12 Td
/F2 10 Tf
(- Edge AI acoustic system using Python, TensorFlow Lite, Librosa, CNN, Raspberry Pi Zero 2 W.) Tj
0 -14 Td
/F1 10 Tf
(AquaSentinel AI: Water-Borne Disease Early Warning System (2026)) Tj
0 -12 Td
/F2 10 Tf
(- AI-enabled early warning platform using React.js, Flask, Python, ML, PWA.) Tj
0 -14 Td
/F1 10 Tf
(Softrate Business Management Web Application (2026)) Tj
0 -12 Td
/F2 10 Tf
(- Business utility suite across 24 application pages using React.js, Flask, CSS.) Tj

0 -22 Td
/F1 12 Tf
(TECHNICAL SKILLS) Tj
0 -14 Td
/F2 10 Tf
(Languages: Java, C, Python, JavaScript | Web: HTML, CSS, React.js, Node.js, Express.js, Flask) Tj
0 -12 Td
(AI/ML: TensorFlow Lite, CNN, Librosa, NumPy, Pandas, Scikit-learn | DB: SQL, MongoDB, PostgreSQL) Tj

0 -22 Td
/F1 12 Tf
(CERTIFICATIONS & ACHIEVEMENTS) Tj
0 -14 Td
/F2 10 Tf
(- Oracle AI Vector Search Certified Professional | NPTEL HCI (Elite 87%)) Tj
0 -12 Td
(- TCS CodeVita Season 13 Global Rank 10,944 | Electraton'26 | SIMATS Tech Sangamam-26) Tj
ET
endstream
endobj

xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000260 00000 n 
0000000332 00000 n 
0000000399 00000 n 

trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1700
%%EOF`;

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfContent);
console.log('Successfully generated public/resume.pdf');
