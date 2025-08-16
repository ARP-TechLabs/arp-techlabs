import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../services/SeoService.service';
import { EmailService } from '../../../services/email.service';
import Swal from 'sweetalert2';

interface Course {
  title: string;
  description: string;
  duration: string;
  stack: string[];
  contents: string[];
  icon: string;
}

@Component({
  selector: 'app-arp-learning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './arp-learning.component.html',
  styleUrls: ['./arp-learning.component.scss'],
})
export class ArpLearningComponent implements OnInit {
  constructor(private seo: SeoService, private emailService: EmailService) {}

  courses: Course[] = [
    { title: 'Web Development', description: 'HTML, CSS, JavaScript fundamentals and modern frameworks.', duration: '6 Weeks', stack: ['HTML5','CSS3','JavaScript','Angular','React'], contents: ['HTML & CSS basics with projects','JavaScript (ES6+)','Responsive design & Bootstrap','Intro to Angular & React','Deployment (Vercel/Netlify)'], icon: '🌐' },
    { title: 'Software Engineering', description: 'Design patterns, version control, and software lifecycle.', duration: '5 Weeks', stack: ['Git','Agile','Design Patterns','UML'], contents: ['Software Development Lifecycle','Agile & Scrum methodology','Git & GitHub workflow','Common design patterns','Clean code & testing basics'], icon: '💻' },
    { title: 'Artificial Intelligence', description: 'Machine learning basics, neural networks, and AI applications.', duration: '8 Weeks', stack: ['Python','TensorFlow','Scikit-Learn'], contents: ['Python refresher for ML','Supervised & unsupervised ML','Neural networks intro','AI use cases & projects','Ethics in AI'], icon: '🧠' },
    { title: 'Database Management', description: 'SQL, NoSQL, data modeling and querying techniques.', duration: '4 Weeks', stack: ['MySQL','PostgreSQL','MongoDB','SQL Server'], contents: ['Relational database fundamentals','Advanced SQL queries','Joins, indexing & optimization','NoSQL & MongoDB basics','Database design & modeling'], icon: '🗄️' },
    { title: 'Data Science', description: 'Statistics, data wrangling, visualization, and Python basics.', duration: '7 Weeks', stack: ['Python','Pandas','NumPy','Matplotlib','Seaborn'], contents: ['Statistics for data science','Data wrangling with Pandas','NumPy for numerical computing','Data visualization (Matplotlib & Seaborn)','Exploratory data analysis project'], icon: '📊' },
    { title: 'Data Analytics', description: 'Business analytics, tools, and decision-making methodologies.', duration: '5 Weeks', stack: ['Excel','Power BI','Tableau','SQL'], contents: ['Introduction to business analytics','Excel advanced functions','SQL for data analytics','Dashboards with Tableau & Power BI','Decision-making with case studies'], icon: '📈' },
  ];

  // Modal & enrollment
  selectedCourse: Course | null = null;
  showModal = false;
  enrollName = '';
  enrollEmail = '';

  // Counselling form
  counsellingName = '';
  counsellingEmail = '';
  counsellingTitle = '';
  counsellingMessage = '';

  openCourse(course: Course) {
    this.selectedCourse = course;
    this.showModal = true;
    this.enrollName = '';
    this.enrollEmail = '';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.selectedCourse = null;
    document.body.style.overflow = 'auto';
  }

  @HostListener('window:keydown.escape')
  onEscKey() {
    if (this.showModal) this.closeModal();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) this.closeModal();
  }

  async enrollCourse() {
    if (!this.enrollName || !this.enrollEmail) {
      Swal.fire('⚠️ Missing Info', 'Please enter your name and email before enrolling.', 'warning');
      return;
    }

    const message = `Enrollment Request:\n\nCourse: ${this.selectedCourse?.title}\nCandidate: ${this.enrollName}\nEmail: ${this.enrollEmail}`;
    try {
      await this.emailService.sendMail('career', this.enrollName, this.enrollEmail, this.selectedCourse?.title || '', message, { careerType: 'learning' });
      Swal.fire('🎉 Enrolled!', `We’ll reach you at ${this.enrollEmail}.`, 'success');
      this.closeModal();
    } catch (error) {
      console.error('Email error', error);
      Swal.fire('❌ Error', 'Something went wrong while sending enrollment.', 'error');
    }
  }

  async submitCounselling() {
    if (!this.counsellingName || !this.counsellingEmail || !this.counsellingTitle || !this.counsellingMessage) {
      Swal.fire('⚠️ Missing Info', 'Please fill in all counselling fields.', 'warning');
      return;
    }

    const message = `Counselling Request:\n\nName: ${this.counsellingName}\nEmail: ${this.counsellingEmail}\nTitle: ${this.counsellingTitle}\nMessage: ${this.counsellingMessage}`;
    try {
      await this.emailService.sendMail('career', this.counsellingName, this.counsellingEmail, this.counsellingTitle, message, { careerType: 'learning' });
      Swal.fire('✅ Request Sent', 'Our team will reach out to you soon.', 'success');
      this.counsellingName = this.counsellingEmail = this.counsellingTitle = this.counsellingMessage = '';
    } catch (error) {
      console.error('Counselling email error', error);
      Swal.fire('❌ Error', 'Something went wrong while requesting counselling.', 'error');
    }
  }

  ngOnInit(): void {
    this.seo.updateSeo(
      'ARP for Learning | ARP TechLabs',
      'Empowering learners with AI, software, and data science skills for the future.',
      'https://arp-techlabs.vercel.app/arp-learning',
      'ARP for Learning, AI Education, Data Science Courses'
    );
  }
}
