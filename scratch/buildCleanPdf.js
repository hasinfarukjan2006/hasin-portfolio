const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'letter'
});

// Page 1
doc.setFont('Helvetica', 'bold');
doc.setFontSize(22);
doc.text('HASIN F', 306, 45, { align: 'center' });

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9.5);
doc.text('+91 9344475074   |   hasinfarukjan@gmail.com', 306, 62, { align: 'center' });
doc.text('linkedin.com/in/hasin-f   |   github.com/hasinfarukjan2006', 306, 75, { align: 'center' });

let y = 95;

function addSectionHeader(title) {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(title, 40, y);
  doc.setLineWidth(0.5);
  doc.line(40, y + 3, 572, y + 3);
  y += 16;
}

// Professional Summary
addSectionHeader('Professional Summary');
doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
const summaryText = "Computer Science and Engineering student with hands-on experience in software development, Artificial Intelligence, Machine Learning, and Edge AI. Experienced in developing responsive web applications and AI-enabled systems through internships, academic projects, hackathons, and technical training. Seeking software engineering, full-stack development, AI/ML, or data-oriented roles to apply programming, problem-solving, and system-development skills.";
const summaryLines = doc.splitTextToSize(summaryText, 532);
doc.text(summaryLines, 40, y);
y += summaryLines.length * 11 + 12;

// Education
addSectionHeader('Education');

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.text('M. Kumarasamy College of Engineering, Karur', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('2024 - 2028', 572, y, { align: 'right' });
y += 11;
doc.setFont('Helvetica', 'italic');
doc.text('B.E. Computer Science & Engineering', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('CGPA: 7.77/10.00', 572, y, { align: 'right' });
y += 14;

doc.setFont('Helvetica', 'bold');
doc.text('Sowdaambikaa Group of Schools, Trichy', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('2023', 572, y, { align: 'right' });
y += 11;
doc.setFont('Helvetica', 'italic');
doc.text('Higher Secondary Certificate (HSC)', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('79%', 572, y, { align: 'right' });
y += 14;

doc.setFont('Helvetica', 'bold');
doc.text('St. Dominic Savio Matric Hr. Sec. School, Karur', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('2021', 572, y, { align: 'right' });
y += 11;
doc.setFont('Helvetica', 'italic');
doc.text('Secondary School Leaving Certificate (SSLC)', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('95%', 572, y, { align: 'right' });
y += 18;

// Technical Skills
addSectionHeader('Technical Skills');
const skills = [
  ['Languages:', 'Java, C, Python, JavaScript'],
  ['Web:', 'HTML, CSS, React.js, Node.js, Express.js, Flask, REST APIs'],
  ['AI / ML:', 'TensorFlow Lite, CNN, Librosa, NumPy, Pandas, Scikit-learn'],
  ['Databases:', 'SQL, MongoDB, PostgreSQL'],
  ['Tools:', 'Git, GitHub, VS Code, Docker, AWS'],
  ['Core CS:', 'Data Structures and Algorithms, OOP, DBMS, Operating Systems, Computer Networks']
];

skills.forEach(([label, val]) => {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(label, 40, y);
  doc.setFont('Helvetica', 'normal');
  doc.text(val, 110, y);
  y += 11;
});
y += 10;

// Internship Experience
addSectionHeader('Internship Experience');

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.text('Softrate Technologies Pvt. Ltd.', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('Jun 2026', 572, y, { align: 'right' });
y += 11;
doc.setFont('Helvetica', 'italic');
doc.text('Web Development Intern', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('Chennai', 572, y, { align: 'right' });
y += 12;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
const exp1 = [
  'Developed and enhanced responsive web interfaces for business productivity and financial utility applications.',
  'Worked on Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules with interactive calculation logic.',
  'Implemented routing, UI improvements, responsive layouts, and functional validation across 24 application pages.',
  'Used Git and GitHub for source-code management and development workflows.'
];
exp1.forEach(bullet => {
  const lines = doc.splitTextToSize(`•  ${bullet}`, 520);
  doc.text(lines, 48, y);
  y += lines.length * 10.5 + 2;
});
y += 8;

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.text('CodSoft', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('Jul 03 - Jul 10, 2025', 572, y, { align: 'right' });
y += 11;
doc.setFont('Helvetica', 'italic');
doc.text('Full Stack Development Intern', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('Remote', 572, y, { align: 'right' });
y += 12;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
const exp2 = [
  'Developed responsive frontend components and implemented practical web-development features using HTML, CSS, and JavaScript.',
  'Applied software-development and project-structuring concepts to assigned implementation tasks.'
];
exp2.forEach(bullet => {
  const lines = doc.splitTextToSize(`•  ${bullet}`, 520);
  doc.text(lines, 48, y);
  y += lines.length * 10.5 + 2;
});
y += 8;

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.text('InternPe', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('Jul 07 - Aug 03, 2025', 572, y, { align: 'right' });
y += 11;
doc.setFont('Helvetica', 'italic');
doc.text('Web Development Intern', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('Remote', 572, y, { align: 'right' });
y += 12;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
const exp3 = [
  'Developed functional web components using HTML, CSS, and JavaScript.',
  'Implemented responsive layouts and strengthened practical frontend development skills through project-based tasks.'
];
exp3.forEach(bullet => {
  const lines = doc.splitTextToSize(`•  ${bullet}`, 520);
  doc.text(lines, 48, y);
  y += lines.length * 10.5 + 2;
});

// PAGE 2
doc.addPage();
y = 45;

addSectionHeader('Projects');

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.text('SafeCare: AI-Based Context-Aware Smart Hearing Aid', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('2026', 572, y, { align: 'right' });
y += 12;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
const proj1 = [
  'Tech Stack: Python, TensorFlow Lite, Librosa, CNN, MFCC, Raspberry Pi Zero 2 W, INMP441 MEMS Microphones.',
  'Developing an Edge AI smart hearing-aid system for speech enhancement, environmental sound recognition, and safety alerts.',
  'Designed environmental sound classification for Speech, Horn, Siren, Music, Traffic, and Background Noise using MFCC features and a CNN model.',
  'Implemented adaptive noise suppression, speech enhancement, directional sound detection, and emergency sound prioritization using dual microphones and Raspberry Pi Zero 2 W.'
];
proj1.forEach(bullet => {
  const lines = doc.splitTextToSize(`•  ${bullet}`, 520);
  doc.text(lines, 48, y);
  y += lines.length * 10.5 + 2;
});
y += 8;

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.text('AquaSentinel AI: Water-Borne Disease Early Warning System [GitHub]', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('2026', 572, y, { align: 'right' });
y += 12;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
const proj2 = [
  'Tech Stack: React.js, Flask, Python, REST API, JavaScript, Machine Learning, PWA, Git, GitHub.',
  'Developed an AI-enabled platform for community-level water-borne disease risk monitoring using health, water-quality, and rainfall data.',
  'Built a React.js frontend and Flask REST API for risk monitoring, prediction, alerts, and integration of health, water-quality, and rainfall data.',
  'Designed a mobile-first Progressive Web App with responsive navigation, offline-oriented functionality, and API-driven risk visualization.'
];
proj2.forEach(bullet => {
  const lines = doc.splitTextToSize(`•  ${bullet}`, 520);
  doc.text(lines, 48, y);
  y += lines.length * 10.5 + 2;
});
y += 8;

doc.setFont('Helvetica', 'bold');
doc.setFontSize(9.5);
doc.text('Softrate Business Management Web Application [GitHub]', 40, y);
doc.setFont('Helvetica', 'normal');
doc.text('2026', 572, y, { align: 'right' });
y += 12;

doc.setFont('Helvetica', 'normal');
doc.setFontSize(9);
const proj3 = [
  'Tech Stack: React.js, JavaScript, HTML, CSS, Flask, Git, GitHub.',
  'Developed Invoice Generator, Quote Generator, Receipt Generator, and Revenue Forecaster modules for business productivity workflows.',
  'Implemented responsive UI, application routing, calculation logic, and interactive workflows across 24 application pages.',
  'Verified page functionality, routing, calculation logic, and result-display workflows throughout the application.'
];
proj3.forEach(bullet => {
  const lines = doc.splitTextToSize(`•  ${bullet}`, 520);
  doc.text(lines, 48, y);
  y += lines.length * 10.5 + 2;
});
y += 12;

// Certifications
addSectionHeader('Certifications');
const certs = [
  'Oracle AI Vector Search Certified Professional - Oracle University',
  'Human Computer Interaction - NPTEL, Elite, 87%',
  'Pragati: Path to Future - Cohort 9 - Infosys',
  'AWS S3 Basics - Coursera Project Network',
  'ReactJS and Node JS - Unstop'
];
certs.forEach(cert => {
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`•  ${cert}`, 48, y);
  y += 13;
});
y += 10;

// Achievements & Activities
addSectionHeader('Achievements & Activities');
const achs = [
  'TCS CodeVita Season 13 - Secured Global Rank 10,944.',
  'NPTEL Human Computer Interaction - Achieved Elite certification with a score of 87%.',
  'Participated in Electraton’26 and SIMATS (TECH SANGAMAM-26), a National Level 24-Hour Hackathon.',
  'Participated in Elite Hack 1.0, a Global Online Hackathon.',
  'Participated in Adobe University Hackathon and Kurukshetra’26 - K!ODE WARS.',
  'Participated in TechZen Operation Cipher 2026 and Celesta’25 - 6-Hour Coding Hackathon.',
  'Completed DSA for DeepTech, an International Level Bootcamp.'
];
achs.forEach(ach => {
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  const lines = doc.splitTextToSize(`•  ${ach}`, 520);
  doc.text(lines, 48, y);
  y += lines.length * 10.5 + 2;
});

const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
const publicPath = path.join(__dirname, '..', 'public', 'resume.pdf');
fs.writeFileSync(publicPath, pdfBuffer);
console.log('Successfully written jsPDF generated public/resume.pdf');
