# 🚀 Devashish Bose - Portfolio

A modern, responsive portfolio website showcasing data science, IoT, and web development projects.

## 📁 Project Structure

\`\`\`
devashish-portfolio/
├── frontend/                 # Next.js React application
│   ├── app/                 # Next.js 13+ app directory
│   ├── components/          # Reusable React components
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── next.config.js      # Next.js configuration
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── package.json            # Root package.json (monorepo)
└── README.md              # This file
\`\`\`

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: Next Themes (Dark/Light mode)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd devashish-portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to http://localhost:3000

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

### Export Static Site

\`\`\`bash
npm run build
\`\`\`

## 📡 API Endpoints

### Contact
- `POST /api/contact` - Send contact form
- `GET /api/contact/info` - Get contact information

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/projects/meta/categories` - Get project categories
- `GET /api/projects/meta/stats` - Get project statistics

### Skills
- `GET /api/skills` - Get all skills data
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/certifications` - Get certifications
- `GET /api/skills/competencies` - Get core competencies
- `GET /api/skills/stats` - Get skills statistics

### Health Check
- `GET /health` - Server health status

## 🔧 Configuration

### Frontend Configuration
- `frontend/next.config.js` - Next.js settings
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `frontend/tsconfig.json` - TypeScript configuration

### Backend Configuration
- `backend/.env` - Environment variables
- `backend/src/server.js` - Server configuration
- Rate limiting, CORS, security headers

## 🎨 Features

- ✅ Responsive design
- ✅ Dark/Light theme toggle
- ✅ Smooth animations and transitions
- ✅ Custom cursor
- ✅ Typewriter effects
- ✅ Accessibility features
- ✅ SEO optimized
- ✅ Progressive loading
- ✅ GitHub integration
- ✅ Contact form with mailto fallback

## 🔒 Security

- Helmet.js for security headers
- CORS configuration
- Rate limiting on API endpoints
- Input validation and sanitization
- Environment variable protection

## 📊 Monitoring

- Health check endpoint
- Request logging with Morgan
- Custom logging utility
- Error tracking and reporting

## 🚀 Deployment

This portfolio can be deployed to any static hosting service:

### Vercel (Recommended)
\`\`\`bash
vercel --prod
\`\`\`

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `out`

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source to GitHub Actions
3. The site will build and deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Devashish Bose**
- Email: bosedevashish7@gmail.com
- GitHub: [devashish588](https://github.com/devashish588)
- LinkedIn: [devashish-bose-bb044223a](https://linkedin.com/in/devashish-bose-bb044223a)
- Location: Gwalior, Madhya Pradesh, India

---

Built with ❤️ using Next.js and Tailwind CSS
