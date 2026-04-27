const CERTIFICATIONS = [
  {
    img: '/assets/images/fullstack.jpg',
    alt: 'Fullstack Web Development using NodeJS',
    category: 'Course',
    date: 'Nov 2023',
    dateTime: '2023-11-01',
    title: 'Full stack web development using Nodejs',
    text: 'In this course, I have learned HTML, CSS, JS, Nodejs, Expressjs and I have worked with NoSQL databases like MongoDB, Google firebase database.',
  },
  {
    img: '/assets/images/RDBMS.jpg',
    alt: 'Introduction to RDBMS',
    category: 'Course',
    date: 'May 15, 2023',
    dateTime: '2023-05-15',
    title: 'Introduction to RDBMS',
    text: 'In this course, I have learned the concepts of relational Databases.',
  },
  {
    img: '/assets/images/python.jpg',
    alt: 'Python for Data Science',
    category: 'Course',
    date: 'March 28, 2023',
    dateTime: '2023-03-28',
    title: 'Python for Data Science, AI & Development',
    text: 'From this course, I have learned python programming language and essentials in language towards Data Science and AI',
  },
  {
    img: '/assets/images/tableau.jpg',
    alt: 'Tableau',
    category: 'Course',
    date: 'Jan 2024',
    dateTime: '2024-01-01',
    title: 'Tableau',
    text: 'In this course, I have learned data visualization and Analyzing data from visualization and creating dashboard.',
  },
  {
    img: '/assets/images/cloud.jpg',
    alt: 'Cloud Computing',
    category: 'Course',
    date: 'July-Oct, 2023',
    dateTime: '2023-07-01',
    title: 'Cloud Computing',
    text: 'In this course, I have learned fundamental concepts of cloud computing.',
  },
  {
    img: '/assets/images/SIH.jpg',
    alt: 'Smart India Hackathon',
    category: 'Participation',
    date: 'Sep 27th & 28th, 2023',
    dateTime: '2023-09-27',
    title: 'Participated in Smart India Hackathon',
    text: 'In this hackathon, We have taken the problem statement "Online Integrated platform for projects taken up by the students of various universities/colleges"',
  },
  {
    img: '/assets/images/blockchain.jpg',
    alt: 'Blockchain',
    category: 'Course',
    date: 'Dec 2023',
    dateTime: '2023-12-01',
    title: 'Blockchain',
    text: 'In this course, I have learned about Blockchain technology and created NFT, NFT Market place and tokens in Blockchain.',
  },
  {
    img: '/assets/images/iicc round1.jpg',
    alt: 'INNOVATE INDIA CODING CHAMPIONSHIP Round 1',
    category: 'Participation',
    date: '20 July 2022',
    dateTime: '2022-07-20',
    title: 'INNOVATE INDIA CODING CHAMPIONSHIP',
    text: 'Innovate India Coding Championship is a nationwide coding competition, and in this I have cracked the first round of coding challenges.',
  },
  {
    img: '/assets/images/iicc round2.jpg',
    alt: 'INNOVATE INDIA CODING CHAMPIONSHIP Round 2',
    category: 'Participation',
    date: '29 July 2022',
    dateTime: '2022-07-29',
    title: 'INNOVATE INDIA CODING CHAMPIONSHIP',
    text: 'Innovate India Coding Championship is a nationwide coding competition, and in this I have actively participated in coding challenges.',
  },
];

function Certifications({ isActive }) {
  return (
    <article className={`blog${isActive ? ' active' : ''}`} data-page="certifications">
      <header>
        <h2 className="h2 article-title">
          Courses &amp; <br /> Certifications
        </h2>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.title + cert.date} className="blog-post-item">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <figure className="blog-banner-box">
                  <img src={cert.img} alt={cert.alt} loading="lazy" />
                </figure>

                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{cert.category}</p>
                    <span className="dot"></span>
                    <time dateTime={cert.dateTime}>{cert.date}</time>
                  </div>
                  <h3 className="h3 blog-item-title">{cert.title}</h3>
                  <p className="blog-text">{cert.text}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default Certifications;
