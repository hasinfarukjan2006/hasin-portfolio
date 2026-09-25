const fs = require('fs');
const path = require('path');

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
  /Kids [3 0 R, 7 0 R]
  /Count 2
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
      /F3 8 0 R
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

8 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Oblique
>>
endobj

6 0 obj
<<
  /Length 2800
>>
stream
BT
/F1 22 Tf
220 750 Td
(HASIN F) Tj
/F2 9.5 Tf
-120 -15 Td
(+91 9344475074  |  hasinfarukjan@gmail.com  |  linkedin.com/in/hasin-f  |  github.com/hasinfarukjan2006) Tj

0 -25 Td
/F1 12 Tf
(Professional Summary) Tj
0 -4 Td
/F2 0.5 TL
1 0 0 1 50 695 Tm
0 -12 Td
/F2 9.5 Tf
(Computer Science and Engineering student with hands-on experience in software development, Artificial Intelligence, Machine Learning,) Tj
0 -11 Td
(and Edge AI. Experienced in developing responsive web applications and AI-enabled systems through internships, academic projects,) Tj
0 -11 Td
(hackathons, and technical training. Seeking software engineering, full-stack development, AI/ML, or data-oriented roles to apply) Tj
0 -11 Td
(programming, problem-solving, and system-development skills.) Tj

0 -20 Td
/F1 12 Tf
(Education) Tj
0 -14 Td
/F1 10 Tf
(M. Kumarasamy College of Engineering, Karur) Tj
/F2 9.5 Tf
380 0 Td
(2024 - 2028) Tj
-380 -11 Td
/F3 9.5 Tf
(B.E. Computer Science & Engineering) Tj
/F2 9.5 Tf
365 0 Td
(CGPA: 7.77/10.00) Tj
-365 -13 Td
/F1 10 Tf
(Sowdaambikaa Group of Schools, Trichy) Tj
/F2 9.5 Tf
395 0 Td
(2023) Tj
-395 -11 Td
/F3 9.5 Tf
(Higher Secondary Certificate (HSC)) Tj
/F2 9.5 Tf
420 0 Td
(79%) Tj
-420 -13 Td
/F1 10 Tf
(St. Dominic Savio Matric Hr. Sec. School, Karur) Tj
/F2 9.5 Tf
360 0 Td
(2021) Tj
-360 -11 Td
/F3 9.5 Tf
(Secondary School Leaving Certificate (SSLC)) Tj
/F2 9.5 Tf
420 0 Td
(95%) Tj

-420 -20 Td
/F1 12 Tf
(Technical Skills) Tj
0 -14 Td
/F1 9.5 Tf
(Languages:     ) Tj
/F2 9.5 Tf
(Java, C, Python, JavaScript) Tj
0 -12 Td
/F1 9.5 Tf
(Web:               ) Tj
/F2 9.5 Tf
(HTML, CSS, React.js, Node.js, Express.js, Flask, REST APIs) Tj
0 -12 Td
/F1 9.5 Tf
(AI / ML:          ) Tj
/F2 9.5 Tf
(TensorFlow Lite, CNN, Librosa, NumPy, Pandas, Scikit-learn) Tj
0 -12 Td
/F1 9.5 Tf
(Databases:    ) Tj
/F2 9.5 Tf
(SQL, MongoDB, PostgreSQL) Tj
0 -12 Td
/F1 9.5 Tf
(Tools:             ) Tj
/F2 9.5 Tf
(Git, GitHub, VS Code, Docker, AWS) Tj
0 -12 Td
/F1 9.5 Tf
(Core CS:         ) Tj
/F2 9.5 Tf
(Data Structures and Algorithms, OOP, DBMS, Operating Systems, Computer Networks) Tj

0 -20 Td
/F1 12 Tf
(Internship Experience) Tj
0 -14 Td
/F1 10 Tf
(Softrate Technologies Pvt. Ltd.) Tj
/F2 9.5 Tf
415 0 Td
(Jun 2026) Tj
-415 -11 Td
/F3 9.5 Tf
(Web Development Intern) Tj
/F2 9.5 Tf
420 0 Td
(Chennai) Tj
-420 -13 Td
/F2 9.5 Tf
(\\(bull\\) Developed and enhanced responsive web interfaces for business productivity and financial utility applications.) Tj
0 -11 Td
(\\(bull\\) Worked on Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules with interactive calculation logic.) Tj
0 -11 Td
(\\(bull\\) Implemented routing, UI improvements, responsive layouts, and functional validation across 24 application pages.) Tj
0 -11 Td
(\\(bull\\) Used Git and GitHub for source-code management and development workflows.) Tj

0 -15 Td
/F1 10 Tf
(CodSoft) Tj
/F2 9.5 Tf
395 0 Td
(Jul 03 - Jul 10, 2025) Tj
-395 -11 Td
/F3 9.5 Tf
(Full Stack Development Intern) Tj
/F2 9.5 Tf
425 0 Td
(Remote) Tj
-425 -13 Td
/F2 9.5 Tf
(\\(bull\\) Developed responsive frontend components and implemented practical web-development features using HTML, CSS, and JavaScript.) Tj
0 -11 Td
(\\(bull\\) Applied software-development and project-structuring concepts to assigned implementation tasks.) Tj

0 -15 Td
/F1 10 Tf
(InternPe) Tj
/F2 9.5 Tf
395 0 Td
(Jul 07 - Aug 03, 2025) Tj
-395 -11 Td
/F3 9.5 Tf
(Web Development Intern) Tj
/F2 9.5 Tf
425 0 Td
(Remote) Tj
-425 -13 Td
/F2 9.5 Tf
(\\(bull\\) Developed functional web components using HTML, CSS, and JavaScript.) Tj
0 -11 Td
(\\(bull\\) Implemented responsive layouts and strengthened practical frontend development skills through project-based tasks.) Tj
ET
endstream
endobj

7 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
      /F3 8 0 R
    >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 9 0 R
>>
endobj

9 0 obj
<<
  /Length 2500
>>
stream
BT
1 0 0 1 50 740 Tm
/F1 12 Tf
(Projects) Tj
0 -14 Td
/F1 10 Tf
(SafeCare: AI-Based Context-Aware Smart Hearing Aid) Tj
/F2 9.5 Tf
430 0 Td
(2026) Tj
-430 -13 Td
/F1 9.5 Tf
(\\(bull\\) Tech Stack: ) Tj
/F2 9.5 Tf
(Python, TensorFlow Lite, Librosa, CNN, MFCC, Raspberry Pi Zero 2 W, INMP441 MEMS Microphones.) Tj
0 -11 Td
/F2 9.5 Tf
(\\(bull\\) Developing an Edge AI smart hearing-aid system for speech enhancement, environmental sound recognition, and safety alerts.) Tj
0 -11 Td
(\\(bull\\) Designed environmental sound classification for Speech, Horn, Siren, Music, Traffic, and Background Noise using MFCC features and a CNN model.) Tj
0 -11 Td
(\\(bull\\) Implemented adaptive noise suppression, speech enhancement, directional sound detection, and emergency sound prioritization using dual microphones.) Tj

0 -18 Td
/F1 10 Tf
(AquaSentinel AI: Water-Borne Disease Early Warning System) Tj
/F2 9.5 Tf
430 0 Td
(2026) Tj
-430 -13 Td
/F1 9.5 Tf
(\\(bull\\) Tech Stack: ) Tj
/F2 9.5 Tf
(React.js, Flask, Python, REST API, JavaScript, Machine Learning, PWA, Git, GitHub.) Tj
0 -11 Td
/F2 9.5 Tf
(\\(bull\\) Developed an AI-enabled platform for community-level water-borne disease risk monitoring using health, water-quality, and rainfall data.) Tj
0 -11 Td
(\\(bull\\) Built a React.js frontend and Flask REST API for risk monitoring, prediction, alerts, and integration of health, water-quality, and rainfall data.) Tj
0 -11 Td
(\\(bull\\) Designed a mobile-first Progressive Web App with responsive navigation, offline-oriented functionality, and API-driven risk visualization.) Tj

0 -18 Td
/F1 10 Tf
(Softrate Business Management Web Application) Tj
/F2 9.5 Tf
430 0 Td
(2026) Tj
-430 -13 Td
/F1 9.5 Tf
(\\(bull\\) Tech Stack: ) Tj
/F2 9.5 Tf
(React.js, JavaScript, HTML, CSS, Flask, Git, GitHub.) Tj
0 -11 Td
/F2 9.5 Tf
(\\(bull\\) Developed Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules for business productivity workflows.) Tj
0 -11 Td
(\\(bull\\) Implemented responsive UI, application routing, calculation logic, and interactive workflows across 24 application pages.) Tj

0 -25 Td
/F1 12 Tf
(Certifications) Tj
0 -14 Td
/F1 9.5 Tf
(Oracle AI Vector Search Certified Professional) Tj
/F2 9.5 Tf
( - Oracle University) Tj
0 -12 Td
/F1 9.5 Tf
(Human Computer Interaction) Tj
/F2 9.5 Tf
( - NPTEL, Elite, 87%) Tj
0 -12 Td
/F1 9.5 Tf
(Pragati: Path to Future - Cohort 9) Tj
/F2 9.5 Tf
( - Infosys) Tj
0 -12 Td
/F1 9.5 Tf
(AWS S3 Basics) Tj
/F2 9.5 Tf
( - Coursera Project Network) Tj
0 -12 Td
/F1 9.5 Tf
(ReactJS and Node JS) Tj
/F2 9.5 Tf
( - Unstop) Tj

0 -25 Td
/F1 12 Tf
(Achievements & Activities) Tj
0 -14 Td
/F1 9.5 Tf
(TCS CodeVita Season 13) Tj
/F2 9.5 Tf
( - Secured Global Rank 10,944.) Tj
0 -12 Td
/F1 9.5 Tf
(NPTEL Human Computer Interaction) Tj
/F2 9.5 Tf
( - Achieved Elite certification with a score of 87%.) Tj
0 -12 Td
/F2 9.5 Tf
(Participated in Electraton'26 and SIMATS \\(TECH SANGAMAM-26\\), a National Level 24-Hour Hackathon.) Tj
0 -12 Td
/F2 9.5 Tf
(Participated in Elite Hack 1.0, a Global Online Hackathon.) Tj
0 -12 Td
/F2 9.5 Tf
(Participated in Adobe University Hackathon and Kurukshetra'26 - K!ODE WARS.) Tj
0 -12 Td
/F2 9.5 Tf
(Participated in TechZen Operation Cipher 2026 and Celesta'25 - 6-Hour Coding Hackathon.) Tj
0 -12 Td
/F2 9.5 Tf
(Completed DSA for DeepTech, an International Level Bootcamp.) Tj
ET
endstream
endobj

xref
0 10
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000122 00000 n 
0000000279 00000 n 
0000000351 00000 n 
0000000490 00000 n 
0000003360 00000 n 
0000000418 00000 n 
0000003517 00000 n 

trailer
<<
  /Size 10
  /Root 1 0 R
>>
startxref
6085
%%EOF`;

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfContent);
console.log('Successfully generated complete 2-page public/resume.pdf');
