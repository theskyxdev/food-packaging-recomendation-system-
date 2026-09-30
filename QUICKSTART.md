# PackIQ — Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Option 1: Local Development (Fastest)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Start dev server
npm run dev

# Open http://localhost:3000
```

**That's it!** No database needed for demo mode.

---

### Option 2: With Database (Production-like)

```bash
# 1. Install dependencies
npm install

# 2. Setup PostgreSQL locally (macOS)
brew install postgresql@15
brew services start postgresql@15

# 3. Create database
createdb packiq_db

# 4. Configure .env
DATABASE_URL="postgresql://localhost:5432/packiq_db"

# 5. Run migrations
npx prisma migrate dev

# 6. Start app
npm run dev
```

---

### Option 3: Docker (Best for Production)

```bash
# 1. Ensure Docker is running

# 2. Start everything
docker-compose up --build

# App available at http://localhost:3000
# PostgreSQL at localhost:5432
```

---

## 📍 First Steps

1. **Open Dashboard**
   - http://localhost:3000
   - You'll see the dashboard home with stats

2. **Try Recommendation**
   - Click "New Recommendation"
   - Select a commodity (Apple, Milk, Rice, etc.)
   - Click "Analyze Packaging"
   - See AI-powered recommendations

3. **Explore Features**
   - Materials Database → View 10+ packaging options
   - Shelf Life Predictor → Compare storage scenarios
   - Cost Calculator → Analyze packaging ROI
   - Comparison Tool → Compare materials side-by-side
   - Reports → Generate PDF reports
   - AI Assistant → Ask packaging questions

---

## 🔧 Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Check code quality

npx prisma studio   # Open database GUI
npx prisma seed     # Seed test data
docker-compose up   # Run with Docker
```

---

## 📊 Sample Data

Pre-loaded commodities:
- **Apple** — Fresh fruit, respiring, cold storage
- **Milk** — Dairy, high moisture, cold storage
- **Rice** — Grains, low moisture, ambient
- **Tomato** — Vegetable, respiring, cold
- **Bread** — Bakery, processed

Recommendation engine includes 10+ materials:
- PET + LDPE (3-layer)
- HDPE Film
- BOPP Film
- Aluminium Laminate
- PLA (Compostable)
- Vacuum PA/PE
- Breathable PE
- Metalized BOPP
- And more...

---

## 🎨 Key Pages

| Page | Path | Purpose |
|------|------|---------|
| Dashboard | `/dashboard` | Home with stats & hero |
| New Recommendation | `/dashboard/new` | Multi-step form |
| History | `/dashboard/history` | Past recommendations |
| Materials | `/dashboard/materials` | Packaging database |
| Shelf Life | `/dashboard/shelf-life` | Freshness predictor |
| Cost Calculator | `/dashboard/cost` | ROI analysis |
| Comparison | `/dashboard/comparison` | Compare up to 5 materials |
| Sustainability | `/dashboard/sustainability` | Eco scores |
| Reports | `/dashboard/reports` | Generate PDFs |
| AI Assistant | `/dashboard/assistant` | Chatbot Q&A |
| Admin | `/dashboard/admin` | System analytics |

---

## 🔌 API Endpoints

### Get Recommendation
```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

### List Materials
```bash
curl http://localhost:3000/api/materials
```

### List Commodities
```bash
curl http://localhost:3000/api/commodities
```

---

## ❓ Troubleshooting

**"Port 3000 already in use?"**
```bash
npx kill-port 3000
npm run dev
```

**"Database connection error?"**
```bash
npx prisma db push
npx prisma studio
```

**"Build fails with CSS errors?"**
```bash
rm -rf .next
npm run build
```

**"Docker won't start?"**
```bash
docker system prune
docker-compose up --build
```

---

## 📚 Learn More

- [Full README](./README.md) — Complete documentation
- [Prisma Docs](https://www.prisma.io/docs/) — Database
- [Next.js Docs](https://nextjs.org/docs) — Framework
- [Tailwind Docs](https://tailwindcss.com) — Styling

---

## 🎯 Next Steps

✅ Get it running locally
✅ Try a recommendation
✅ Explore all pages
✅ Deploy to Docker
✅ Read full docs

---

**Questions? Check README.md or GitHub Issues**

Happy packaging! 📦
