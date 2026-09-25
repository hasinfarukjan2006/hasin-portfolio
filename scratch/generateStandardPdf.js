const fs = require('fs');
const path = require('path');

function createPdf() {
  const contentP1 = [
    "BT",
    "/F1 20 Tf",
    "50 740 Td",
    "(HASIN F) Tj",
    "0 -18 Td",
    "/F2 9.5 Tf",
    "(+91 9344475074   |   hasinfarukjan@gmail.com   |   linkedin.com/in/hasin-f   |   github.com/hasinfarukjan2006) Tj",
    "0 -25 Td",
    "/F1 12 Tf",
    "(Professional Summary) Tj",
    "0 -14 Td",
    "/F2 9 Tf",
    "(Computer Science and Engineering student with hands-on experience in software development, Artificial Intelligence,) Tj",
    "0 -11 Td",
    "(Machine Learning, and Edge AI. Experienced in developing responsive web applications and AI-enabled systems through) Tj",
    "0 -11 Td",
    "(internships, academic projects, hackathons, and technical training. Seeking software engineering, full-stack development,) Tj",
    "0 -11 Td",
    "(AI/ML, or data-oriented roles to apply programming, problem-solving, and system-development skills.) Tj",
    "0 -22 Td",
    "/F1 12 Tf",
    "(Education) Tj",
    "0 -14 Td",
    "/F1 10 Tf",
    "(M. Kumarasamy College of Engineering, Karur) Tj",
    "0 -11 Td",
    "/F3 9.5 Tf",
    "(B.E. Computer Science & Engineering - CGPA: 7.77/10.00) Tj",
    "0 -14 Td",
    "/F1 10 Tf",
    "(Sowdaambikaa Group of Schools, Trichy) Tj",
    "0 -11 Td",
    "/F3 9.5 Tf",
    "(Higher Secondary Certificate \\(HSC\\) - 79%) Tj",
    "0 -14 Td",
    "/F1 10 Tf",
    "(St. Dominic Savio Matric Hr. Sec. School, Karur) Tj",
    "0 -11 Td",
    "/F3 9.5 Tf",
    "(Secondary School Leaving Certificate \\(SSLC\\) - 95%) Tj",
    "0 -22 Td",
    "/F1 12 Tf",
    "(Technical Skills) Tj",
    "0 -14 Td",
    "/F1 9.5 Tf",
    "(Languages:  ) Tj",
    "/F2 9.5 Tf",
    "(Java, C, Python, JavaScript) Tj",
    "0 -12 Td",
    "/F1 9.5 Tf",
    "(Web:            ) Tj",
    "/F2 9.5 Tf",
    "(HTML, CSS, React.js, Node.js, Express.js, Flask, REST APIs) Tj",
    "0 -12 Td",
    "/F1 9.5 Tf",
    "(AI / ML:       ) Tj",
    "/F2 9.5 Tf",
    "(TensorFlow Lite, CNN, Librosa, NumPy, Pandas, Scikit-learn) Tj",
    "0 -12 Td",
    "/F1 9.5 Tf",
    "(Databases: ) Tj",
    "/F2 9.5 Tf",
    "(SQL, MongoDB, PostgreSQL) Tj",
    "0 -12 Td",
    "/F1 9.5 Tf",
    "(Tools:          ) Tj",
    "/F2 9.5 Tf",
    "(Git, GitHub, VS Code, Docker, AWS) Tj",
    "0 -12 Td",
    "/F1 9.5 Tf",
    "(Core CS:      ) Tj",
    "/F2 9.5 Tf",
    "(Data Structures and Algorithms, OOP, DBMS, Operating Systems, Computer Networks) Tj",
    "0 -22 Td",
    "/F1 12 Tf",
    "(Internship Experience) Tj",
    "0 -14 Td",
    "/F1 10 Tf",
    "(Softrate Technologies Pvt. Ltd. - Web Development Intern \\(Jun 2026 | Chennai\\)) Tj",
    "0 -12 Td",
    "/F2 9 Tf",
    "(- Developed and enhanced responsive web interfaces for business productivity and financial utility applications.) Tj",
    "0 -11 Td",
    "(- Worked on Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules.) Tj",
    "0 -11 Td",
    "(- Implemented routing, UI improvements, responsive layouts, and functional validation across 24 pages.) Tj",
    "0 -11 Td",
    "(- Used Git and GitHub for source-code management and development workflows.) Tj",
    "0 -14 Td",
    "/F1 10 Tf",
    "(CodSoft - Full Stack Development Intern \\(Jul 03 - Jul 10, 2025 | Remote\\)) Tj",
    "0 -12 Td",
    "/F2 9 Tf",
    "(- Developed responsive frontend components using HTML, CSS, and JavaScript.) Tj",
    "0 -11 Td",
    "(- Applied software-development and project-structuring concepts to assigned implementation tasks.) Tj",
    "0 -14 Td",
    "/F1 10 Tf",
    "(InternPe - Web Development Intern \\(Jul 07 - Aug 03, 2025 | Remote\\)) Tj",
    "0 -12 Td",
    "/F2 9 Tf",
    "(- Developed functional web components using HTML, CSS, and JavaScript.) Tj",
    "0 -11 Td",
    "(- Implemented responsive layouts and strengthened practical frontend development skills.) Tj",
    "ET"
  ].join("\n");

  const contentP2 = [
    "BT",
    "/F1 12 Tf",
    "50 740 Td",
    "(Projects) Tj",
    "0 -14 Td",
    "/F1 10 Tf",
    "(SafeCare: AI-Based Context-Aware Smart Hearing Aid \\(2026\\)) Tj",
    "0 -12 Td",
    "/F2 9 Tf",
    "(- Tech Stack: Python, TensorFlow Lite, Librosa, CNN, MFCC, Raspberry Pi Zero 2 W, INMP441 Microphones.) Tj",
    "0 -11 Td",
    "(- Developing an Edge AI smart hearing-aid system for speech enhancement and safety alerts.) Tj",
    "0 -11 Td",
    "(- Environmental sound classification for Speech, Horn, Siren, Music, Traffic, and Background Noise.) Tj",
    "0 -11 Td",
    "(- Adaptive noise suppression, speech enhancement, directional sound detection, and emergency prioritization.) Tj",
    "0 -16 Td",
    "/F1 10 Tf",
    "(AquaSentinel AI: Water-Borne Disease Early Warning System \\(2026\\)) Tj",
    "0 -12 Td",
    "/F2 9 Tf",
    "(- Tech Stack: React.js, Flask, Python, REST API, JavaScript, Machine Learning, PWA, Git, GitHub.) Tj",
    "0 -11 Td",
    "(- AI-enabled platform for community-level water-borne disease risk monitoring.) Tj",
    "0 -11 Td",
    "(- Built a React.js frontend and Flask REST API for risk monitoring, prediction, alerts, and data integration.) Tj",
    "0 -11 Td",
    "(- Mobile-first Progressive Web App with responsive navigation and API-driven risk visualization.) Tj",
    "0 -16 Td",
    "/F1 10 Tf",
    "(Softrate Business Management Web Application \\(2026\\)) Tj",
    "0 -12 Td",
    "/F2 9 Tf",
    "(- Tech Stack: React.js, JavaScript, HTML, CSS, Flask, Git, GitHub.) Tj",
    "0 -11 Td",
    "(- Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules.) Tj",
    "0 -11 Td",
    "(- Responsive UI, routing, calculation logic, and interactive workflows across 24 application pages.) Tj",
    "0 -22 Td",
    "/F1 12 Tf",
    "(Certifications) Tj",
    "0 -14 Td",
    "/F2 9.5 Tf",
    "(- Oracle AI Vector Search Certified Professional - Oracle University) Tj",
    "0 -12 Td",
    "(- Human Computer Interaction - NPTEL, Elite, 87%) Tj",
    "0 -12 Td",
    "(- Pragati: Path to Future - Cohort 9 - Infosys) Tj",
    "0 -12 Td",
    "(- AWS S3 Basics - Coursera Project Network) Tj",
    "0 -12 Td",
    "(- ReactJS and Node JS - Unstop) Tj",
    "0 -22 Td",
    "/F1 12 Tf",
    "(Achievements & Activities) Tj",
    "0 -14 Td",
    "/F2 9.5 Tf",
    "(- TCS CodeVita Season 13 - Secured Global Rank 10,944.) Tj",
    "0 -12 Td",
    "(- NPTEL Human Computer Interaction - Achieved Elite certification with a score of 87%.) Tj",
    "0 -12 Td",
    "(- Participated in Electraton'26 and SIMATS TECH SANGAMAM-26, a National Level 24-Hour Hackathon.) Tj",
    "0 -12 Td",
    "(- Participated in Elite Hack 1.0, a Global Online Hackathon.) Tj",
    "0 -12 Td",
    "(- Participated in Adobe University Hackathon and Kurukshetra'26 - K!ODE WARS.) Tj",
    "0 -12 Td",
    "(- Participated in TechZen Operation Cipher 2026 and Celesta'25 - 6-Hour Coding Hackathon.) Tj",
    "0 -12 Td",
    "(- Completed DSA for DeepTech, an International Level Bootcamp.) Tj",
    "ET"
  ].join("\n");

  const objects = [];
  objects.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);
  objects.push(`2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>\nendobj\n`);
  objects.push(`3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /MediaBox [0 0 612 792] /Contents 8 0 R >>\nendobj\n`);
  objects.push(`4 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /MediaBox [0 0 612 792] /Contents 9 0 R >>\nendobj\n`);
  objects.push(`5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`);
  objects.push(`6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`);
  objects.push(`7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj\n`);
  objects.push(`8 0 obj\n<< /Length ${Buffer.byteLength(contentP1)} >>\nstream\n${contentP1}\nendstream\nendobj\n`);
  objects.push(`9 0 obj\n<< /Length ${Buffer.byteLength(contentP2)} >>\nstream\n${contentP2}\nendstream\nendobj\n`);

  let header = "%PDF-1.4\n";
  let body = objects.join("");
  
  // Calculate XREF offsets
  let xrefOffset = header.length + body.length;
  let offsets = [0];
  let curr = header.length;
  for (let obj of objects) {
    offsets.push(curr);
    curr += Buffer.byteLength(obj);
  }

  let xref = `xref\n0 ${offsets.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    xref += String(offsets[i]).padStart(10, '0') + " 00000 n \n";
  }

  let trailer = `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const pdfData = header + body + xref + trailer;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'resume.pdf'), pdfData);
  console.log('Successfully written standard PDF to public/resume.pdf');
}

createPdf();
