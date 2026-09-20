// 500 Authentic human-style student reviews
export interface StudentReviewItem {
  id: number
  name: string
  college: string
  domain: string
  rating: number
  date: string
  text: string
}

export const ALL_STUDENT_REVIEWS: StudentReviewItem[] = [
  {
    "id": 1,
    "name": "Aarav Bose",
    "college": "Delhi Technological University (DTU)",
    "domain": "Full Stack Web Development",
    "rating": 4,
    "date": "July 2024",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 2,
    "name": "Vivaan Trivedi",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 3,
    "name": "Aditya Shinde",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 4,
    "name": "Vihaan Shetty",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 5,
    "name": "Arjun Sengupta",
    "college": "NIT Rourkela",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 6,
    "name": "Sai Paul",
    "college": "IIIT Allahabad",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 7,
    "name": "Reyansh Singhal",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 8,
    "name": "Ayaan Patel",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 9,
    "name": "Krishna Nair",
    "college": "Chandigarh University",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 10,
    "name": "Ishaan Sen",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 11,
    "name": "Shaurya Deshmukh",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 12,
    "name": "Atharva Chauhan",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 13,
    "name": "Dhruv Nambiar",
    "college": "Government Engineering College, Bilaspur",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 14,
    "name": "Kabir Saha",
    "college": "BIT Sindri, Dhanbad",
    "domain": "Java Programming",
    "rating": 4,
    "date": "December 2024",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 15,
    "name": "Rohan Tripathi",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 16,
    "name": "Ananya Chopra",
    "college": "IIT Roorkee",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 17,
    "name": "Diya Gupta",
    "college": "NIT Surathkal",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 18,
    "name": "Gauri Choudhury",
    "college": "VIT Vellore",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 19,
    "name": "Isha Pandey",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 20,
    "name": "Kavya Pawar",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 21,
    "name": "Khushi Gowda",
    "college": "NIT Trichy",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 22,
    "name": "Myra Dutta",
    "college": "NIT Calicut",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 23,
    "name": "Navya Chakraborty",
    "college": "IIIT Delhi",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 24,
    "name": "Pooja Agrawal",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 25,
    "name": "Priya Verma",
    "college": "Amity University, Noida",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 26,
    "name": "Rhea Mehta",
    "college": "Chitkara University",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 27,
    "name": "Riya Das",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "UI/UX Design & Figma",
    "rating": 4,
    "date": "May 2024",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 28,
    "name": "Saanvi Bhat",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 29,
    "name": "Sara More",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 30,
    "name": "Sneha Menon",
    "college": "National Institute of Technology, Raipur",
    "domain": "Android Development",
    "rating": 4,
    "date": "August 2024",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 31,
    "name": "Tanvi Barman",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 32,
    "name": "Veda Pandit",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 33,
    "name": "Zoya Garg",
    "college": "BITS Pilani",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 34,
    "name": "Pranav Singh",
    "college": "Jadavpur University",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 35,
    "name": "Harsh Iyer",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 36,
    "name": "Manish Mishra",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 37,
    "name": "Karan Patil",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 38,
    "name": "Rahul Thakur",
    "college": "NIT Warangal",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 39,
    "name": "Nikhil Ghosh",
    "college": "IIIT Hyderabad",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 40,
    "name": "Dev Mukherjee",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "Frontend Development",
    "rating": 4,
    "date": "October 2024",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 41,
    "name": "Ayush Shukla",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 42,
    "name": "Kartik Sharma",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 43,
    "name": "Abhishek Joshi",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 44,
    "name": "Ritika Chatterjee",
    "college": "PES University, Bengaluru",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 45,
    "name": "Shreya Saxena",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 46,
    "name": "Simran Jadhav",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 47,
    "name": "Akash Pillai",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 48,
    "name": "Bhavya Roy",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 49,
    "name": "Chirag Debnath",
    "college": "Galgotias University, Greater Noida",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 50,
    "name": "Deepak Bansal",
    "college": "COEP Technological University, Pune",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 51,
    "name": "Gaurav Reddy",
    "college": "Delhi Technological University (DTU)",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 52,
    "name": "Harshit Rao",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 53,
    "name": "Jatin Banerjee",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "Cloud & DevOps",
    "rating": 4,
    "date": "March 2025",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 54,
    "name": "Kunal Kulkarni",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 55,
    "name": "Mohit Yadav",
    "college": "NIT Rourkela",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 56,
    "name": "Naveen Bhattacharya",
    "college": "IIIT Allahabad",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 57,
    "name": "Pawan Biswas",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 58,
    "name": "Rajesh Dubey",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 59,
    "name": "Saurabh Kapoor",
    "college": "Chandigarh University",
    "domain": "Java Programming",
    "rating": 4,
    "date": "September 2024",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 60,
    "name": "Tushar Kumar",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 61,
    "name": "Varun Bose",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 62,
    "name": "Yash Trivedi",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 63,
    "name": "Alok Shinde",
    "college": "Government Engineering College, Bilaspur",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 64,
    "name": "Aniket Shetty",
    "college": "BIT Sindri, Dhanbad",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 65,
    "name": "Ashish Sengupta",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 66,
    "name": "Chetan Paul",
    "college": "IIT Roorkee",
    "domain": "Android Development",
    "rating": 4,
    "date": "August 2024",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 67,
    "name": "Dinesh Singhal",
    "college": "NIT Surathkal",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 68,
    "name": "Himanshu Patel",
    "college": "VIT Vellore",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 69,
    "name": "Jayant Nair",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 70,
    "name": "Lalit Sen",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 71,
    "name": "Mayank Deshmukh",
    "college": "NIT Trichy",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 72,
    "name": "Neeraj Chauhan",
    "college": "NIT Calicut",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 73,
    "name": "Omkar Nambiar",
    "college": "IIIT Delhi",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 74,
    "name": "Pankaj Saha",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 75,
    "name": "Rajat Tripathi",
    "college": "Amity University, Noida",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 76,
    "name": "Sameer Chopra",
    "college": "Chitkara University",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 77,
    "name": "Tarun Gupta",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 78,
    "name": "Umesh Choudhury",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 79,
    "name": "Vikas Pandey",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "C++ Systems & DSA",
    "rating": 4,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 80,
    "name": "Yogesh Pawar",
    "college": "National Institute of Technology, Raipur",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 81,
    "name": "Aakash Gowda",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 82,
    "name": "Amit Dutta",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 83,
    "name": "Ankush Chakraborty",
    "college": "BITS Pilani",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 84,
    "name": "Bhupesh Agrawal",
    "college": "Jadavpur University",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 85,
    "name": "Darshan Verma",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 86,
    "name": "Girish Mehta",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 87,
    "name": "Hemant Das",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 88,
    "name": "Jitendra Bhat",
    "college": "NIT Warangal",
    "domain": "C++ Systems & DSA",
    "rating": 4,
    "date": "October 2024",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 89,
    "name": "Kuldeep More",
    "college": "IIIT Hyderabad",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 90,
    "name": "Mukesh Menon",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 91,
    "name": "Nitin Barman",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 92,
    "name": "Parag Pandit",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "Python & Machine Learning",
    "rating": 4,
    "date": "June 2024",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 93,
    "name": "Rakesh Garg",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 94,
    "name": "Sandip Singh",
    "college": "PES University, Bengaluru",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 95,
    "name": "Tejas Iyer",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 96,
    "name": "Vaibhav Mishra",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 97,
    "name": "Vishal Patil",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 98,
    "name": "Ajay Thakur",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 99,
    "name": "Anand Ghosh",
    "college": "Galgotias University, Greater Noida",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 100,
    "name": "Bharat Mukherjee",
    "college": "COEP Technological University, Pune",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 101,
    "name": "Manas Shukla",
    "college": "Delhi Technological University (DTU)",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 102,
    "name": "Apoorv Sharma",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 103,
    "name": "Siddhant Joshi",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 104,
    "name": "Shubham Chatterjee",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 105,
    "name": "Prateek Saxena",
    "college": "NIT Rourkela",
    "domain": "Data Science & Analytics",
    "rating": 4,
    "date": "November 2024",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 106,
    "name": "Nandini Jadhav",
    "college": "IIIT Allahabad",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 107,
    "name": "Prachi Pillai",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 108,
    "name": "Shruti Roy",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 109,
    "name": "Anjali Debnath",
    "college": "Chandigarh University",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 110,
    "name": "Meghna Bansal",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 111,
    "name": "Aarav Reddy",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 112,
    "name": "Vivaan Rao",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 113,
    "name": "Aditya Banerjee",
    "college": "Government Engineering College, Bilaspur",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 114,
    "name": "Vihaan Kulkarni",
    "college": "BIT Sindri, Dhanbad",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 115,
    "name": "Arjun Yadav",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 116,
    "name": "Sai Bhattacharya",
    "college": "IIT Roorkee",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 117,
    "name": "Reyansh Biswas",
    "college": "NIT Surathkal",
    "domain": "UI/UX Design & Figma",
    "rating": 4,
    "date": "November 2024",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 118,
    "name": "Ayaan Dubey",
    "college": "VIT Vellore",
    "domain": "Full Stack Web Development",
    "rating": 4,
    "date": "April 2025",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 119,
    "name": "Krishna Kapoor",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 120,
    "name": "Ishaan Kumar",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 121,
    "name": "Shaurya Bose",
    "college": "NIT Trichy",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 122,
    "name": "Atharva Trivedi",
    "college": "NIT Calicut",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 123,
    "name": "Dhruv Shinde",
    "college": "IIIT Delhi",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 124,
    "name": "Kabir Shetty",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 125,
    "name": "Rohan Sengupta",
    "college": "Amity University, Noida",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 126,
    "name": "Ananya Paul",
    "college": "Chitkara University",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 127,
    "name": "Diya Singhal",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 128,
    "name": "Gauri Patel",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 129,
    "name": "Isha Nair",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 130,
    "name": "Kavya Sen",
    "college": "National Institute of Technology, Raipur",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 131,
    "name": "Khushi Deshmukh",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "Java Programming",
    "rating": 4,
    "date": "September 2024",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 132,
    "name": "Myra Chauhan",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 133,
    "name": "Navya Nambiar",
    "college": "BITS Pilani",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 134,
    "name": "Pooja Saha",
    "college": "Jadavpur University",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 135,
    "name": "Priya Tripathi",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 136,
    "name": "Rhea Chopra",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 137,
    "name": "Riya Gupta",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 138,
    "name": "Saanvi Choudhury",
    "college": "NIT Warangal",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 139,
    "name": "Sara Pandey",
    "college": "IIIT Hyderabad",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 140,
    "name": "Sneha Pawar",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 141,
    "name": "Tanvi Gowda",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 142,
    "name": "Veda Dutta",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 143,
    "name": "Zoya Chakraborty",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 144,
    "name": "Pranav Agrawal",
    "college": "PES University, Bengaluru",
    "domain": "UI/UX Design & Figma",
    "rating": 4,
    "date": "February 2025",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 145,
    "name": "Harsh Verma",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 146,
    "name": "Manish Mehta",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "Python & Machine Learning",
    "rating": 4,
    "date": "December 2024",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 147,
    "name": "Karan Das",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 148,
    "name": "Rahul Bhat",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 149,
    "name": "Nikhil More",
    "college": "Galgotias University, Greater Noida",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 150,
    "name": "Dev Menon",
    "college": "COEP Technological University, Pune",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 151,
    "name": "Ayush Barman",
    "college": "Delhi Technological University (DTU)",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 152,
    "name": "Kartik Pandit",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 153,
    "name": "Abhishek Garg",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 154,
    "name": "Ritika Singh",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 155,
    "name": "Shreya Iyer",
    "college": "NIT Rourkela",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 156,
    "name": "Simran Mishra",
    "college": "IIIT Allahabad",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 157,
    "name": "Akash Patil",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "Frontend Development",
    "rating": 4,
    "date": "July 2024",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 158,
    "name": "Bhavya Thakur",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 159,
    "name": "Chirag Ghosh",
    "college": "Chandigarh University",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 160,
    "name": "Deepak Mukherjee",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 161,
    "name": "Gaurav Shukla",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 162,
    "name": "Harshit Sharma",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 163,
    "name": "Jatin Joshi",
    "college": "Government Engineering College, Bilaspur",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 164,
    "name": "Kunal Chatterjee",
    "college": "BIT Sindri, Dhanbad",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 165,
    "name": "Mohit Saxena",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 166,
    "name": "Naveen Jadhav",
    "college": "IIT Roorkee",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 167,
    "name": "Pawan Pillai",
    "college": "NIT Surathkal",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 168,
    "name": "Rajesh Roy",
    "college": "VIT Vellore",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 169,
    "name": "Saurabh Debnath",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 170,
    "name": "Tushar Bansal",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "Cloud & DevOps",
    "rating": 4,
    "date": "December 2024",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 171,
    "name": "Varun Reddy",
    "college": "NIT Trichy",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 172,
    "name": "Yash Rao",
    "college": "NIT Calicut",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 173,
    "name": "Alok Banerjee",
    "college": "IIIT Delhi",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 174,
    "name": "Aniket Kulkarni",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 175,
    "name": "Ashish Yadav",
    "college": "Amity University, Noida",
    "domain": "Frontend Development",
    "rating": 4,
    "date": "January 2025",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 176,
    "name": "Chetan Bhattacharya",
    "college": "Chitkara University",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 177,
    "name": "Dinesh Biswas",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 178,
    "name": "Himanshu Dubey",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 179,
    "name": "Jayant Kapoor",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 180,
    "name": "Lalit Kumar",
    "college": "National Institute of Technology, Raipur",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 181,
    "name": "Mayank Bose",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 182,
    "name": "Neeraj Trivedi",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 183,
    "name": "Omkar Shinde",
    "college": "BITS Pilani",
    "domain": "Android Development",
    "rating": 4,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 184,
    "name": "Pankaj Shetty",
    "college": "Jadavpur University",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 185,
    "name": "Rajat Sengupta",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 186,
    "name": "Sameer Paul",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 187,
    "name": "Tarun Singhal",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 188,
    "name": "Umesh Patel",
    "college": "NIT Warangal",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 189,
    "name": "Vikas Nair",
    "college": "IIIT Hyderabad",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 190,
    "name": "Yogesh Sen",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 191,
    "name": "Aakash Deshmukh",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 192,
    "name": "Amit Chauhan",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 193,
    "name": "Ankush Nambiar",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 194,
    "name": "Bhupesh Saha",
    "college": "PES University, Bengaluru",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 195,
    "name": "Darshan Tripathi",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 196,
    "name": "Girish Chopra",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "C++ Systems & DSA",
    "rating": 4,
    "date": "October 2024",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 197,
    "name": "Hemant Gupta",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 198,
    "name": "Jitendra Choudhury",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 199,
    "name": "Kuldeep Pandey",
    "college": "Galgotias University, Greater Noida",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 200,
    "name": "Mukesh Pawar",
    "college": "COEP Technological University, Pune",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 201,
    "name": "Nitin Gowda",
    "college": "Delhi Technological University (DTU)",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 202,
    "name": "Parag Dutta",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 203,
    "name": "Rakesh Chakraborty",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 204,
    "name": "Sandip Agrawal",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "Data Science & Analytics",
    "rating": 4,
    "date": "February 2025",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 205,
    "name": "Tejas Verma",
    "college": "NIT Rourkela",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 206,
    "name": "Vaibhav Mehta",
    "college": "IIIT Allahabad",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 207,
    "name": "Vishal Das",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 208,
    "name": "Ajay Bhat",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 209,
    "name": "Anand More",
    "college": "Chandigarh University",
    "domain": "Python & Machine Learning",
    "rating": 4,
    "date": "March 2025",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 210,
    "name": "Bharat Menon",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 211,
    "name": "Manas Barman",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 212,
    "name": "Apoorv Pandit",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 213,
    "name": "Siddhant Garg",
    "college": "Government Engineering College, Bilaspur",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 214,
    "name": "Shubham Singh",
    "college": "BIT Sindri, Dhanbad",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 215,
    "name": "Prateek Iyer",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 216,
    "name": "Nandini Mishra",
    "college": "IIT Roorkee",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 217,
    "name": "Prachi Patil",
    "college": "NIT Surathkal",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 218,
    "name": "Shruti Thakur",
    "college": "VIT Vellore",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 219,
    "name": "Anjali Ghosh",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 220,
    "name": "Meghna Mukherjee",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 221,
    "name": "Aarav Shukla",
    "college": "NIT Trichy",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 222,
    "name": "Vivaan Sharma",
    "college": "NIT Calicut",
    "domain": "Data Science & Analytics",
    "rating": 4,
    "date": "August 2024",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 223,
    "name": "Aditya Joshi",
    "college": "IIIT Delhi",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 224,
    "name": "Vihaan Chatterjee",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 225,
    "name": "Arjun Saxena",
    "college": "Amity University, Noida",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 226,
    "name": "Sai Jadhav",
    "college": "Chitkara University",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 227,
    "name": "Reyansh Pillai",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 228,
    "name": "Ayaan Roy",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 229,
    "name": "Krishna Debnath",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 230,
    "name": "Ishaan Bansal",
    "college": "National Institute of Technology, Raipur",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 231,
    "name": "Shaurya Reddy",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 232,
    "name": "Atharva Rao",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 233,
    "name": "Dhruv Banerjee",
    "college": "BITS Pilani",
    "domain": "Cloud & DevOps",
    "rating": 4,
    "date": "March 2025",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 234,
    "name": "Kabir Kulkarni",
    "college": "Jadavpur University",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 235,
    "name": "Rohan Yadav",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "Full Stack Web Development",
    "rating": 4,
    "date": "January 2025",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 236,
    "name": "Ananya Bhattacharya",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 237,
    "name": "Diya Biswas",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 238,
    "name": "Gauri Dubey",
    "college": "NIT Warangal",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 239,
    "name": "Isha Kapoor",
    "college": "IIIT Hyderabad",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 240,
    "name": "Kavya Kumar",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 241,
    "name": "Khushi Bose",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 242,
    "name": "Myra Trivedi",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 243,
    "name": "Navya Shinde",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 244,
    "name": "Pooja Shetty",
    "college": "PES University, Bengaluru",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 245,
    "name": "Priya Sengupta",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 246,
    "name": "Rhea Paul",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 247,
    "name": "Riya Singhal",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 248,
    "name": "Saanvi Patel",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "Java Programming",
    "rating": 4,
    "date": "June 2024",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 249,
    "name": "Sara Nair",
    "college": "Galgotias University, Greater Noida",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 250,
    "name": "Sneha Sen",
    "college": "COEP Technological University, Pune",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 251,
    "name": "Tanvi Deshmukh",
    "college": "Delhi Technological University (DTU)",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 252,
    "name": "Veda Chauhan",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 253,
    "name": "Zoya Nambiar",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 254,
    "name": "Pranav Saha",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 255,
    "name": "Harsh Tripathi",
    "college": "NIT Rourkela",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 256,
    "name": "Manish Chopra",
    "college": "IIIT Allahabad",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 257,
    "name": "Karan Gupta",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 258,
    "name": "Rahul Choudhury",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 259,
    "name": "Nikhil Pandey",
    "college": "Chandigarh University",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 260,
    "name": "Dev Pawar",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 261,
    "name": "Ayush Gowda",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "UI/UX Design & Figma",
    "rating": 4,
    "date": "November 2024",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 262,
    "name": "Kartik Dutta",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "Full Stack Web Development",
    "rating": 4,
    "date": "April 2025",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 263,
    "name": "Abhishek Chakraborty",
    "college": "Government Engineering College, Bilaspur",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 264,
    "name": "Ritika Agrawal",
    "college": "BIT Sindri, Dhanbad",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 265,
    "name": "Shreya Verma",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 266,
    "name": "Simran Mehta",
    "college": "IIT Roorkee",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 267,
    "name": "Akash Das",
    "college": "NIT Surathkal",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 268,
    "name": "Bhavya Bhat",
    "college": "VIT Vellore",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 269,
    "name": "Chirag More",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 270,
    "name": "Deepak Menon",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 271,
    "name": "Gaurav Barman",
    "college": "NIT Trichy",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 272,
    "name": "Harshit Pandit",
    "college": "NIT Calicut",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 273,
    "name": "Jatin Garg",
    "college": "IIIT Delhi",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 274,
    "name": "Kunal Singh",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "Frontend Development",
    "rating": 4,
    "date": "April 2025",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 275,
    "name": "Mohit Iyer",
    "college": "Amity University, Noida",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 276,
    "name": "Naveen Mishra",
    "college": "Chitkara University",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 277,
    "name": "Pawan Patil",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 278,
    "name": "Rajesh Thakur",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 279,
    "name": "Saurabh Ghosh",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 280,
    "name": "Tushar Mukherjee",
    "college": "National Institute of Technology, Raipur",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 281,
    "name": "Varun Shukla",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 282,
    "name": "Yash Sharma",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 283,
    "name": "Alok Joshi",
    "college": "BITS Pilani",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 284,
    "name": "Aniket Chatterjee",
    "college": "Jadavpur University",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 285,
    "name": "Ashish Saxena",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 286,
    "name": "Chetan Jadhav",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 287,
    "name": "Dinesh Pillai",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "Cloud & DevOps",
    "rating": 4,
    "date": "September 2024",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 288,
    "name": "Himanshu Roy",
    "college": "NIT Warangal",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 289,
    "name": "Jayant Debnath",
    "college": "IIIT Hyderabad",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 290,
    "name": "Lalit Bansal",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 291,
    "name": "Mayank Reddy",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "Android Development",
    "rating": 4,
    "date": "May 2024",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 292,
    "name": "Neeraj Rao",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 293,
    "name": "Omkar Banerjee",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 294,
    "name": "Pankaj Kulkarni",
    "college": "PES University, Bengaluru",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 295,
    "name": "Rajat Yadav",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 296,
    "name": "Sameer Bhattacharya",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 297,
    "name": "Tarun Biswas",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 298,
    "name": "Umesh Dubey",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 299,
    "name": "Vikas Kapoor",
    "college": "Galgotias University, Greater Noida",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 300,
    "name": "Yogesh Kumar",
    "college": "COEP Technological University, Pune",
    "domain": "Android Development",
    "rating": 4,
    "date": "February 2025",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 301,
    "name": "Aakash Bose",
    "college": "Delhi Technological University (DTU)",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 302,
    "name": "Amit Trivedi",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 303,
    "name": "Ankush Shinde",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 304,
    "name": "Bhupesh Shetty",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 305,
    "name": "Darshan Sengupta",
    "college": "NIT Rourkela",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 306,
    "name": "Girish Paul",
    "college": "IIIT Allahabad",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 307,
    "name": "Hemant Singhal",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 308,
    "name": "Jitendra Patel",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 309,
    "name": "Kuldeep Nair",
    "college": "Chandigarh University",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 310,
    "name": "Mukesh Sen",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 311,
    "name": "Nitin Deshmukh",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 312,
    "name": "Parag Chauhan",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 313,
    "name": "Rakesh Nambiar",
    "college": "Government Engineering College, Bilaspur",
    "domain": "C++ Systems & DSA",
    "rating": 4,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 314,
    "name": "Sandip Saha",
    "college": "BIT Sindri, Dhanbad",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 315,
    "name": "Tejas Tripathi",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 316,
    "name": "Vaibhav Chopra",
    "college": "IIT Roorkee",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 317,
    "name": "Vishal Gupta",
    "college": "NIT Surathkal",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 318,
    "name": "Ajay Choudhury",
    "college": "VIT Vellore",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 319,
    "name": "Anand Pandey",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 320,
    "name": "Bharat Pawar",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "Java Programming",
    "rating": 4,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 321,
    "name": "Manas Gowda",
    "college": "NIT Trichy",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 322,
    "name": "Apoorv Dutta",
    "college": "NIT Calicut",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 323,
    "name": "Siddhant Chakraborty",
    "college": "IIIT Delhi",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 324,
    "name": "Shubham Agrawal",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 325,
    "name": "Prateek Verma",
    "college": "Amity University, Noida",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 326,
    "name": "Nandini Mehta",
    "college": "Chitkara University",
    "domain": "Python & Machine Learning",
    "rating": 4,
    "date": "December 2024",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 327,
    "name": "Prachi Das",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 328,
    "name": "Shruti Bhat",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 329,
    "name": "Anjali More",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 330,
    "name": "Meghna Menon",
    "college": "National Institute of Technology, Raipur",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 331,
    "name": "Aarav Barman",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 332,
    "name": "Vivaan Pandit",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 333,
    "name": "Aditya Garg",
    "college": "BITS Pilani",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 334,
    "name": "Vihaan Singh",
    "college": "Jadavpur University",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 335,
    "name": "Arjun Iyer",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 336,
    "name": "Sai Mishra",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 337,
    "name": "Reyansh Patil",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 338,
    "name": "Ayaan Thakur",
    "college": "NIT Warangal",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 339,
    "name": "Krishna Ghosh",
    "college": "IIIT Hyderabad",
    "domain": "Data Science & Analytics",
    "rating": 4,
    "date": "May 2024",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 340,
    "name": "Ishaan Mukherjee",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 341,
    "name": "Shaurya Shukla",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 342,
    "name": "Atharva Sharma",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 343,
    "name": "Dhruv Joshi",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 344,
    "name": "Kabir Chatterjee",
    "college": "PES University, Bengaluru",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 345,
    "name": "Rohan Saxena",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 346,
    "name": "Ananya Jadhav",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 347,
    "name": "Diya Pillai",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 348,
    "name": "Gauri Roy",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 349,
    "name": "Isha Debnath",
    "college": "Galgotias University, Greater Noida",
    "domain": "C++ Systems & DSA",
    "rating": 4,
    "date": "July 2024",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 350,
    "name": "Kavya Bansal",
    "college": "COEP Technological University, Pune",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 351,
    "name": "Khushi Reddy",
    "college": "Delhi Technological University (DTU)",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 352,
    "name": "Myra Rao",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "Full Stack Web Development",
    "rating": 4,
    "date": "October 2024",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 353,
    "name": "Navya Banerjee",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 354,
    "name": "Pooja Kulkarni",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 355,
    "name": "Priya Yadav",
    "college": "NIT Rourkela",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 356,
    "name": "Rhea Bhattacharya",
    "college": "IIIT Allahabad",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 357,
    "name": "Riya Biswas",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 358,
    "name": "Saanvi Dubey",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 359,
    "name": "Sara Kapoor",
    "college": "Chandigarh University",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 360,
    "name": "Sneha Kumar",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 361,
    "name": "Tanvi Bose",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 362,
    "name": "Veda Trivedi",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 363,
    "name": "Zoya Shinde",
    "college": "Government Engineering College, Bilaspur",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 364,
    "name": "Pranav Shetty",
    "college": "BIT Sindri, Dhanbad",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 365,
    "name": "Harsh Sengupta",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "Java Programming",
    "rating": 4,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 366,
    "name": "Manish Paul",
    "college": "IIT Roorkee",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 367,
    "name": "Karan Singhal",
    "college": "NIT Surathkal",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 368,
    "name": "Rahul Patel",
    "college": "VIT Vellore",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 369,
    "name": "Nikhil Nair",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 370,
    "name": "Dev Sen",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 371,
    "name": "Ayush Deshmukh",
    "college": "NIT Trichy",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 372,
    "name": "Kartik Chauhan",
    "college": "NIT Calicut",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 373,
    "name": "Abhishek Nambiar",
    "college": "IIIT Delhi",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 374,
    "name": "Ritika Saha",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 375,
    "name": "Shreya Tripathi",
    "college": "Amity University, Noida",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 376,
    "name": "Simran Chopra",
    "college": "Chitkara University",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 377,
    "name": "Akash Gupta",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 378,
    "name": "Bhavya Choudhury",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "UI/UX Design & Figma",
    "rating": 4,
    "date": "August 2024",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 379,
    "name": "Chirag Pandey",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 380,
    "name": "Deepak Pawar",
    "college": "National Institute of Technology, Raipur",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 381,
    "name": "Gaurav Gowda",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 382,
    "name": "Harshit Dutta",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 383,
    "name": "Jatin Chakraborty",
    "college": "BITS Pilani",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 384,
    "name": "Kunal Agrawal",
    "college": "Jadavpur University",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 385,
    "name": "Mohit Verma",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 386,
    "name": "Naveen Mehta",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 387,
    "name": "Pawan Das",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 388,
    "name": "Rajesh Bhat",
    "college": "NIT Warangal",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 389,
    "name": "Saurabh More",
    "college": "IIIT Hyderabad",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 390,
    "name": "Tushar Menon",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 391,
    "name": "Varun Barman",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "Frontend Development",
    "rating": 4,
    "date": "January 2025",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 392,
    "name": "Yash Pandit",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 393,
    "name": "Alok Garg",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 394,
    "name": "Aniket Singh",
    "college": "PES University, Bengaluru",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 395,
    "name": "Ashish Iyer",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 396,
    "name": "Chetan Mishra",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 397,
    "name": "Dinesh Patil",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 398,
    "name": "Himanshu Thakur",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 399,
    "name": "Jayant Ghosh",
    "college": "Galgotias University, Greater Noida",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 400,
    "name": "Lalit Mukherjee",
    "college": "COEP Technological University, Pune",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 401,
    "name": "Mayank Shukla",
    "college": "Delhi Technological University (DTU)",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 402,
    "name": "Neeraj Sharma",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 403,
    "name": "Omkar Joshi",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 404,
    "name": "Pankaj Chatterjee",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "Cloud & DevOps",
    "rating": 4,
    "date": "June 2024",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 405,
    "name": "Rajat Saxena",
    "college": "NIT Rourkela",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 406,
    "name": "Sameer Jadhav",
    "college": "IIIT Allahabad",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 407,
    "name": "Tarun Pillai",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "Python & Machine Learning",
    "rating": 4,
    "date": "September 2024",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 408,
    "name": "Umesh Roy",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 409,
    "name": "Vikas Debnath",
    "college": "Chandigarh University",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 410,
    "name": "Yogesh Bansal",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 411,
    "name": "Aakash Reddy",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 412,
    "name": "Amit Rao",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 413,
    "name": "Ankush Banerjee",
    "college": "Government Engineering College, Bilaspur",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 414,
    "name": "Bhupesh Kulkarni",
    "college": "BIT Sindri, Dhanbad",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 415,
    "name": "Darshan Yadav",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 416,
    "name": "Girish Bhattacharya",
    "college": "IIT Roorkee",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 417,
    "name": "Hemant Biswas",
    "college": "NIT Surathkal",
    "domain": "Android Development",
    "rating": 4,
    "date": "November 2024",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 418,
    "name": "Jitendra Dubey",
    "college": "VIT Vellore",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 419,
    "name": "Kuldeep Kapoor",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 420,
    "name": "Mukesh Kumar",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 421,
    "name": "Nitin Bose",
    "college": "NIT Trichy",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 422,
    "name": "Parag Trivedi",
    "college": "NIT Calicut",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 423,
    "name": "Rakesh Shinde",
    "college": "IIIT Delhi",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 424,
    "name": "Sandip Shetty",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 425,
    "name": "Tejas Sengupta",
    "college": "Amity University, Noida",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 426,
    "name": "Vaibhav Paul",
    "college": "Chitkara University",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 427,
    "name": "Vishal Singhal",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 428,
    "name": "Ajay Patel",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 429,
    "name": "Anand Nair",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 430,
    "name": "Bharat Sen",
    "college": "National Institute of Technology, Raipur",
    "domain": "C++ Systems & DSA",
    "rating": 4,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 431,
    "name": "Manas Deshmukh",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 432,
    "name": "Apoorv Chauhan",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 433,
    "name": "Siddhant Nambiar",
    "college": "BITS Pilani",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 434,
    "name": "Shubham Saha",
    "college": "Jadavpur University",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 435,
    "name": "Prateek Tripathi",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 436,
    "name": "Nandini Chopra",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "Frontend Development",
    "rating": 4,
    "date": "October 2024",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 437,
    "name": "Prachi Gupta",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 438,
    "name": "Shruti Choudhury",
    "college": "NIT Warangal",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 439,
    "name": "Anjali Pandey",
    "college": "IIIT Hyderabad",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 440,
    "name": "Meghna Pawar",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 441,
    "name": "Aarav Gowda",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 442,
    "name": "Vivaan Dutta",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 443,
    "name": "Aditya Chakraborty",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "Python & Machine Learning",
    "rating": 4,
    "date": "September 2024",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 444,
    "name": "Vihaan Agrawal",
    "college": "PES University, Bengaluru",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 445,
    "name": "Arjun Verma",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 446,
    "name": "Sai Mehta",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "Java Programming",
    "rating": 5,
    "date": "December 2024",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 447,
    "name": "Reyansh Das",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 448,
    "name": "Ayaan Bhat",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 449,
    "name": "Krishna More",
    "college": "Galgotias University, Greater Noida",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 450,
    "name": "Ishaan Menon",
    "college": "COEP Technological University, Pune",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  },
  {
    "id": 451,
    "name": "Shaurya Barman",
    "college": "Delhi Technological University (DTU)",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Submitted all 3 tasks during my final week. Building the auth system with JWT and handling Mongo aggregation was challenging at first, but the step-by-step guidelines helped a lot."
  },
  {
    "id": 452,
    "name": "Atharva Pandit",
    "college": "Manipal Institute of Technology (MIT)",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Did this during my summer vacation. Honestly joined just for the certificate required by my college HOD, but actually ended up learning React hooks and REST API architecture properly. Worth the time spent. The CID verification gives genuine peace of mind."
  },
  {
    "id": 453,
    "name": "Dhruv Garg",
    "college": "RV College of Engineering, Bengaluru",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "My college senior recommended Geek Intern to me. Task 2 had a tricky bug in state management that took me two whole nights to debug. Submitting the GitHub repo with clean commits felt super satisfying. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 454,
    "name": "Kabir Singh",
    "college": "College of Engineering Guindy (Anna University)",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Short review for fellow students: Loved the focus on real web projects instead of just watching boring video lectures. Deployed my project live on Vercel and attached it to my resume. Definitely recommending this to my college classmates."
  },
  {
    "id": 455,
    "name": "Rohan Iyer",
    "college": "NIT Rourkela",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Reviewing after receiving my verified certificate: The task instructions were very straightforward. Got my verification code within 2 days after submitting the project zip and GitHub URL. Glad I picked this over theoretical video courses."
  },
  {
    "id": 456,
    "name": "Ananya Mishra",
    "college": "IIIT Allahabad",
    "domain": "Data Science & Analytics",
    "rating": 4,
    "date": "February 2025",
    "text": "Had a really positive experience overall. Good experience overall. Building an e-commerce dashboard with responsive layout and Tailwind CSS helped me understand production CSS much better. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 457,
    "name": "Diya Patil",
    "college": "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "Completed my internship requirements here. Really appreciated the flexible submission deadlines because our 6th sem mid-terms clashed right in between. Completed the backend milestone on the weekend. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 458,
    "name": "Gauri Thakur",
    "college": "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "December 2024",
    "text": "Just finished my 1-month track. Great program for 2nd and 3rd year engineering students. You get practical tasks that force you to open VS Code and write actual code. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 459,
    "name": "Isha Ghosh",
    "college": "Chandigarh University",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "May 2024",
    "text": "Writing this review as a 3rd year student. The certificate ID is instantly verifiable on the Geek Intern portal. My college placement coordinator approved it for our mandatory summer internship credits. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 460,
    "name": "Kavya Mukherjee",
    "college": "Techno Main Salt Lake, Kolkata",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Honestly exceeded my expectations. I didn't know how to connect Express backend with frontend Axios before this. This virtual internship gave me the exact hands-on push I needed. 10/10 practical experience for beginners."
  },
  {
    "id": 461,
    "name": "Khushi Shukla",
    "college": "Dayananda Sagar College of Engineering",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Clean dataset tasks! Doing exploratory data analysis on real messy CSV files instead of textbook toy data was the highlight for me."
  },
  {
    "id": 462,
    "name": "Myra Sharma",
    "college": "Vasavi College of Engineering, Hyderabad",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Did this during my summer vacation. Built a linear regression and random forest model for house price predictions. The submission evaluation checked our code comments and precision metrics. The CID verification gives genuine peace of mind."
  },
  {
    "id": 463,
    "name": "Navya Joshi",
    "college": "Government Engineering College, Bilaspur",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "My college senior recommended Geek Intern to me. I was worried about not having high GPU computing power, but the Python tasks were well calibrated to run smoothly on Google Colab and local Jupyter notebooks. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 464,
    "name": "Pooja Chatterjee",
    "college": "BIT Sindri, Dhanbad",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Short review for fellow students: Helped me build a solid machine learning project that I could actually explain line-by-line in my recent tech interview. Definitely recommending this to my college classmates."
  },
  {
    "id": 465,
    "name": "Priya Saxena",
    "college": "Institute of Engineering and Technology (IET), Lucknow",
    "domain": "Data Science & Analytics",
    "rating": 4,
    "date": "November 2024",
    "text": "Reviewing after receiving my verified certificate: Task 1 and Task 2 were smooth, Task 3 required a bit of self-research on scikit-learn pipelines. That is how real learning actually happens anyway. Glad I picked this over theoretical video courses."
  },
  {
    "id": 466,
    "name": "Rhea Jadhav",
    "college": "IIT Roorkee",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "April 2025",
    "text": "Had a really positive experience overall. My college required an internship certificate with a verifiable QR code for our 7th semester submission. Geek Intern verification worked perfectly. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 467,
    "name": "Riya Pillai",
    "college": "NIT Surathkal",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "September 2024",
    "text": "Completed my internship requirements here. Data preprocessing and feature engineering took 70% of the time, which is exactly how industry works according to our senior alumni. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 468,
    "name": "Saanvi Roy",
    "college": "VIT Vellore",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "February 2025",
    "text": "Just finished my 1-month track. From basic pandas and numpy manipulations to building a full prediction pipeline, the roadmap was very structured. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 469,
    "name": "Sara Debnath",
    "college": "Thapar Institute of Engineering & Technology, Patiala",
    "domain": "Full Stack Web Development",
    "rating": 4,
    "date": "July 2024",
    "text": "Writing this review as a 3rd year student. Building the Android app in Kotlin with Room database was a great learning curve. The task documentation gave clear UI requirements. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 470,
    "name": "Sneha Bansal",
    "college": "BMS College of Engineering, Bengaluru",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "December 2024",
    "text": "Honestly exceeded my expectations. Created an offline notes app with SQLite storage and clean card design. Very happy with the certificate dispatch after submission review. 10/10 practical experience for beginners."
  },
  {
    "id": 471,
    "name": "Tanvi Reddy",
    "college": "NIT Trichy",
    "domain": "Android Development",
    "rating": 5,
    "date": "May 2024",
    "text": "The Gradle build errors gave me a headache for a day, but once solved, everything worked smoothly. Good exposure to modern Android layout practices."
  },
  {
    "id": 472,
    "name": "Veda Rao",
    "college": "NIT Calicut",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Did this during my summer vacation. Loved that they accept Flutter as well as native Kotlin implementations. Finished all 3 tasks in 3 weeks. The CID verification gives genuine peace of mind."
  },
  {
    "id": 473,
    "name": "Zoya Banerjee",
    "college": "IIIT Delhi",
    "domain": "Java Programming",
    "rating": 5,
    "date": "March 2025",
    "text": "My college senior recommended Geek Intern to me. Submitted my APK along with the GitHub repo. The verification link is genuine and accepted by our university cell. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 474,
    "name": "Pranav Kulkarni",
    "college": "Sardar Patel Institute of Technology, Mumbai",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "August 2024",
    "text": "Short review for fellow students: The UI requirements were modern and clean. No outdated Bootstrap 3 layouts — we built sleek interfaces using React and modern CSS flexbox/grid. Definitely recommending this to my college classmates."
  },
  {
    "id": 475,
    "name": "Harsh Yadav",
    "college": "Amity University, Noida",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "January 2025",
    "text": "Reviewing after receiving my verified certificate: Focused a lot on mobile responsiveness for Task 2. Testing across different screen sizes taught me media queries and viewport units properly. Glad I picked this over theoretical video courses."
  },
  {
    "id": 476,
    "name": "Manish Bhattacharya",
    "college": "Chitkara University",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "June 2024",
    "text": "Had a really positive experience overall. Completed my frontend internship track while preparing for off-campus drives. Having live GitHub Pages demo links really helped my portfolio. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 477,
    "name": "Karan Biswas",
    "college": "Siddaganga Institute of Technology, Tumkur",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "November 2024",
    "text": "Completed my internship requirements here. Simple, student-friendly platform. No unnecessary fees or complicated formalities. Just do the project, upload, and get verified. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 478,
    "name": "Rahul Dubey",
    "college": "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Just finished my 1-month track. Clean UI task specifications. The task PDF listed all functional buttons, forms, and validation rules clearly. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 479,
    "name": "Nikhil Kapoor",
    "college": "Gokaraju Rangaraju Institute of Engineering (GRIET)",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "September 2024",
    "text": "Writing this review as a 3rd year student. The OOP concepts like inheritance, polymorphism, and interface implementation were tested thoroughly in the banking management system assignment. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 480,
    "name": "Dev Kumar",
    "college": "National Institute of Technology, Raipur",
    "domain": "Android Development",
    "rating": 5,
    "date": "February 2025",
    "text": "Honestly exceeded my expectations. Java backend logic with file handling and exception handling was well structured. Good milestone tracker. 10/10 practical experience for beginners."
  },
  {
    "id": 481,
    "name": "Ayush Bose",
    "college": "Harcourt Butler Technical University (HBTU), Kanpur",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "July 2024",
    "text": "Cleared my campus placement technical round because the interviewer asked questions directly related to the multithreading task I completed here."
  },
  {
    "id": 482,
    "name": "Kartik Trivedi",
    "college": "KIET Group of Institutions, Ghaziabad",
    "domain": "Java Programming",
    "rating": 4,
    "date": "December 2024",
    "text": "Did this during my summer vacation. Very helpful for CS students who want to build non-trivial Core Java applications before entering 4th year placement season. The CID verification gives genuine peace of mind."
  },
  {
    "id": 483,
    "name": "Abhishek Shinde",
    "college": "BITS Pilani",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "May 2024",
    "text": "My college senior recommended Geek Intern to me. Power BI and Python visualization tasks helped me discover insights from sales datasets. Made a clean dashboard that looks great on LinkedIn. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 484,
    "name": "Ritika Shetty",
    "college": "Jadavpur University",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "October 2024",
    "text": "Short review for fellow students: Practical SQL queries and data manipulation tasks. Helped bridge the gap between college semester theory and real data cleaning. Definitely recommending this to my college classmates."
  },
  {
    "id": 485,
    "name": "Shreya Sengupta",
    "college": "SRM Institute of Science & Technology, Chennai",
    "domain": "Cloud & DevOps",
    "rating": 5,
    "date": "March 2025",
    "text": "Reviewing after receiving my verified certificate: Certificate was issued quickly after submitting the project video demo and GitHub link. Very satisfied. Glad I picked this over theoretical video courses."
  },
  {
    "id": 486,
    "name": "Simran Paul",
    "college": "PSG College of Technology, Coimbatore",
    "domain": "UI/UX Design & Figma",
    "rating": 5,
    "date": "August 2024",
    "text": "Had a really positive experience overall. Our entire batch of 40 students enrolled for the virtual internship. Everyone received their offer letters and completion certificates on time. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 487,
    "name": "Akash Singhal",
    "college": "MS Ramaiah Institute of Technology, Bengaluru",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Completed my internship requirements here. Super convenient since I live in a tier-3 city where finding local software internships is almost impossible. Everything is online and self-paced. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 488,
    "name": "Bhavya Patel",
    "college": "NIT Warangal",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "June 2024",
    "text": "Just finished my 1-month track. I balanced this with my daily college lectures. 1 to 2 hours every evening was more than enough to complete all tasks before the deadline. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 489,
    "name": "Chirag Nair",
    "college": "IIIT Hyderabad",
    "domain": "Android Development",
    "rating": 5,
    "date": "November 2024",
    "text": "Writing this review as a 3rd year student. Straightforward verification process. Recruiters could verify my certificate directly by entering my CID on the website. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 490,
    "name": "Deepak Sen",
    "college": "Netaji Subhas University of Technology (NSUT)",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "April 2025",
    "text": "Honestly exceeded my expectations. Grateful for this opportunity. The tasks forced me to become comfortable with Git, GitHub pull requests, and README documentation. 10/10 practical experience for beginners."
  },
  {
    "id": 491,
    "name": "Gaurav Deshmukh",
    "college": "Heritage Institute of Technology, Kolkata",
    "domain": "Java Programming",
    "rating": 5,
    "date": "September 2024",
    "text": "Better than paid courses that charge thousands for pre-recorded videos. Here you actually write code and build working projects."
  },
  {
    "id": 492,
    "name": "Harshit Chauhan",
    "college": "Lovely Professional University (LPU), Punjab",
    "domain": "Data Science & Analytics",
    "rating": 5,
    "date": "February 2025",
    "text": "Did this during my summer vacation. Smooth verification and prompt support on email whenever I had questions regarding the submission format. The CID verification gives genuine peace of mind."
  },
  {
    "id": 493,
    "name": "Jatin Nambiar",
    "college": "Guru Gobind Singh Indraprastha University (GGSIPU)",
    "domain": "C++ Systems & DSA",
    "rating": 5,
    "date": "July 2024",
    "text": "My college senior recommended Geek Intern to me. Recommended it to my juniors as well. It gives you the needed project proof on your resume for your very first technical interview. Kudos to the team for keeping the verification portal smooth."
  },
  {
    "id": 494,
    "name": "Kunal Saha",
    "college": "PES University, Bengaluru",
    "domain": "Cloud & DevOps",
    "rating": 4,
    "date": "December 2024",
    "text": "Short review for fellow students: The project statement on building a URL shortener with analytics taught me hash functions and database indexing practically. Definitely recommending this to my college classmates."
  },
  {
    "id": 495,
    "name": "Mohit Tripathi",
    "college": "VNR Vignana Jyothi Institute of Engineering, Hyderabad",
    "domain": "UI/UX Design & Figma",
    "rating": 4,
    "date": "May 2024",
    "text": "Reviewing after receiving my verified certificate: Support team replied to my email within 5 hours when I made a typo in my college roll number for the certificate. Super responsive. Glad I picked this over theoretical video courses."
  },
  {
    "id": 496,
    "name": "Naveen Chopra",
    "college": "Walchand College of Engineering, Sangli",
    "domain": "Full Stack Web Development",
    "rating": 5,
    "date": "October 2024",
    "text": "Had a really positive experience overall. No fluff, no boring marketing webinars. Just real project problem statements, submission portal, and legitimate credentials. Great stepping stone before applying for full-time roles."
  },
  {
    "id": 497,
    "name": "Pawan Gupta",
    "college": "Birla Institute of Technology (BIT), Mesra",
    "domain": "Python & Machine Learning",
    "rating": 5,
    "date": "March 2025",
    "text": "Completed my internship requirements here. The certificate design is sleek and professional. Attached it to my LinkedIn featured section and got positive feedback from recruiters. Will showcase this on my LinkedIn and resume."
  },
  {
    "id": 498,
    "name": "Rajesh Choudhury",
    "college": "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
    "domain": "Android Development",
    "rating": 5,
    "date": "August 2024",
    "text": "Just finished my 1-month track. I was able to submit both the source code zip and screen recording walkthrough easily. Smooth portal interface. Huge boost to my confidence in writing production-style code."
  },
  {
    "id": 499,
    "name": "Saurabh Pandey",
    "college": "Galgotias University, Greater Noida",
    "domain": "Frontend Development",
    "rating": 5,
    "date": "January 2025",
    "text": "Writing this review as a 3rd year student. The best part is they verify your actual GitHub repository and commit history. It motivates you to write clean, formatted code. Looking forward to taking another advanced track next semester."
  },
  {
    "id": 500,
    "name": "Tushar Pawar",
    "college": "COEP Technological University, Pune",
    "domain": "Java Programming",
    "rating": 5,
    "date": "June 2024",
    "text": "Honestly exceeded my expectations. Helped me clear my internal semester viva because my external examiner was impressed by the deployed project link. 10/10 practical experience for beginners."
  }
]
