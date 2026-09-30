# PackIQ — AI-Powered Intelligent Food Packaging Recommendation System

Enterprise-grade SaaS platform for intelligent packaging material selection, powered by AI and scientific rules.

## Features

✨ **Core Features**
- AI-powered packaging material recommendations with 95%+ confidence
- Multi-step form for food commodity analysis
- Real-time shelf-life prediction with freshness curves
- Advanced cost calculator with ROI analysis
- Material comparison with radar charts
- Sustainability analysis & eco scoring
- QR code traceability generation
- Professional PDF/Excel report generation
- AI chatbot assistant for packaging Q&A
- Admin dashboard with analytics

📊 **Technical Highlights**
- Scientific rule-based recommendation engine (not ML/hallucination)
- 10+ packaging materials database
- Complete barrier property specifications (OTR, WVTR)
- Role-based access control (Admin, Researcher, Industry, Farmer)
- Real-time interactive charts & visualizations
- Dark mode support
- Fully responsive (Mobile, Tablet, Desktop)

## Tech Stack

### Frontend
- **Next.js 16** (App Router, SSR)
- **React 19** with TypeScript
- **Tailwind CSS 4** (utility-first design)
- **Recharts** (interactive charts)
- **Framer Motion** (animations)
- **React Hook Form** + **Zod** (validation)

### Backend
- **Next.js API Routes** (lightweight backend)
- **Prisma ORM** (database management)
- **PostgreSQL 15** (production database)

### Deployment
- **Docker & Docker Compose** (containerization)
- **GitHub-ready** (CI/CD compatible)

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or Docker)
- Git

### Local Development

1. **Clone & Install**
```bash
git clone https://github.com/yourusername/packiq.git
cd packiq
npm install
```

2. **Setup Environment**
```bash
cp .env.example .env
# Edit .env with your settings
```

3. **Database Setup**
```bash
npx prisma migrate dev
npx prisma db seed  # Optional: seed test data
```

4. **Run Development Server**
```bash
npm run dev
```
Visit `http://localhost:3000`

## Docker Deployment

### Build & Run with Docker Compose
```bash
docker-compose up --build
```

This starts:
- PostgreSQL database on port 5432
- Next.js app on port 3000
- Automatic database migrations

### Environment Variables for Docker
```env
DATABASE_URL=postgresql://packiq:password@postgres:5432/packiq_db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NODE_ENV=production
```

## Project Structure

```
packiq/
├── app/
│   ├── api/                    # API routes
│   │   ├── recommendations/    # Packaging recommendations
│   │   ├── materials/          # Materials database
│   │   └── commodities/        # Food commodities
│   ├── dashboard/              # Main dashboard pages
│   │   ├── page.tsx            # Dashboard home
│   │   ├── new/                # New recommendation
│   │   ├── history/            # Recommendation history
│   │   ├── materials/          # Materials database
│   │   ├── shelf-life/         # Shelf life predictor
│   │   ├── cost/               # Cost calculator
│   │   ├── comparison/         # Material comparison
│   │   ├── sustainability/     # Eco analysis
│   │   ├── qr/                 # QR traceability
│   │   ├── reports/            # Report generation
│   │   ├── assistant/          # AI chatbot
│   │   ├── admin/              # Admin panel
│   │   └── settings/           # User settings
│   ├── globals.css             # Global styles + animations
│   └── layout.tsx              # Root layout
├── components/
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── Header.tsx              # Top header
│   └── ui/                     # Reusable components
├── lib/
│   ├── packagingEngine.ts      # Recommendation engine
│   └── utils.ts                # Utility functions
├── prisma/
│   └── schema.prisma           # Database schema
├── types/
│   └── index.ts                # TypeScript types
├── Dockerfile                  # Production container
├── docker-compose.yml          # Multi-container setup
├── .env.example                # Environment template
└── README.md                   # This file
```

## API Endpoints

### Recommendations
```bash
POST /api/recommendations
Content-Type: application/json

{
  "commodityName": "Apple",
  "category": "FRUITS",
  "moisturePercent": 85,
  "pH": 3.5,
  "waterActivity": 0.98,
  "storageType": "COLD",
  "temperature": 4,
  "humidity": 90,
  "transportation": "DOMESTIC",
  "shelfLifeRequired": 30,
  "packagingQuantity": 1000
}

Response: {
  "success": true,
  "results": [
    {
      "name": "PET + LDPE (3 Layer Laminate)",
      "confidence": 95,
      "shelfLifeDays": 28,
      "costPerKg": 12.5,
      "ecoScore": 72,
      ...
    }
  ]
}
```

### Materials Database
```bash
GET /api/materials
POST /api/materials
```

### Commodities Database
```bash
GET /api/commodities
POST /api/commodities
```

## Database Schema

Key tables:
- `users` — User accounts & roles
- `food_commodities` — Food properties & classifications
- `packaging_materials` — Material specifications
- `recommendations` — Recommendation history
- `reports` — Generated reports
- `qr_data` — QR traceability info
- `analytics` — System analytics

See `prisma/schema.prisma` for complete schema.

## Features Explained

### Packaging Recommendation Engine
Uses scientific rules based on:
- Food moisture, pH, respiration rate
- Storage conditions & transportation
- Barrier requirements (OTR, WVTR)
- Shelf-life targets
- Cost optimization

**NOT** using ML/AI for decisions — uses deterministic rules derived from food science.

### Shelf-Life Prediction
- Compares traditional vs. optimized packaging
- Shows freshness decay curves
- Calculates spoilage risk
- Provides quality scores

### Cost Calculator
- Material cost analysis
- Per-unit packaging cost
- Waste reduction value
- ROI calculation

### Sustainability Analysis
- Eco score (0–100)
- Carbon footprint tracking
- Recyclability percentage
- Green alternatives

## Performance Optimization

- ✅ Server-side rendering (SSR) for SEO
- ✅ Image optimization
- ✅ Lazy loading for charts
- ✅ Database query optimization
- ✅ Caching strategies
- ✅ Mobile-first responsive design

## Security Features

- JWT authentication
- Role-based access control
- SQL injection prevention (Prisma)
- XSS protection
- CSRF tokens
- Environment variable protection

## Development

### Run Tests
```bash
npm run test
```

### Build for Production
```bash
npm run build
npm run start
```

### Lint Code
```bash
npm run lint
```

## Deployment Options

### Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel
```

### Docker on AWS/GCP/DigitalOcean
```bash
docker build -t packiq:latest .
docker run -p 3000:3000 packiq:latest
```

### Heroku
```bash
git push heroku main
```

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/packiq"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# AI (Optional)
GEMINI_API_KEY=""

# Node
NODE_ENV="development"
```

## Troubleshooting

### Database Connection Error
```bash
npx prisma db push
npx prisma studio  # View database GUI
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
lsof -i :3000    # Find process
kill -9 <PID>    # Kill it
```

## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m "Add amazing feature"`
3. Push branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## License





## Roadmap

- [ ] ML-powered recommendations (v2.0)
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] API for third-party integrations
- [ ] Multi-language support

---

**Built with ❤️ for sustainable food packaging.**
