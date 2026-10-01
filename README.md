# SFXMEC (Structurflex Middle East) — Website Redesign

A modern, responsive, high-performance web platform for **Structurflex Middle East Contracting LLC (SFXMEC)**, specialized engineering contractor in tensile membrane architecture (PTFE, ETFE, PVC) and architectural facades in the MENA region since 2005.

## 🚀 Key Features

1. **Architectural Luxury Aesthetic**:
   - Palette tailored for high-end engineering: Obsidian (`#070B14`), Titanium White (`#F8FAFC`), Desert Gold (`#D4AF37`), and Tensile Cyan (`#38BDF8`).
   - Smooth glassmorphism with subtle radial glows and structural wireframe motifs.
   - Clean typography using Google Fonts: *Plus Jakarta Sans* (headings), *Inter* (body), and *JetBrains Mono* (engineering specs).

2. **Interactive Materials Matrix (PTFE vs. ETFE vs. PVC)**:
   - Side-by-side comparison of mechanical strength, solar heat gain, light transmission, self-cleaning mechanisms, and fire ratings.

3. **4-Stage Realization Timeline**:
   - Form Finding & 3D Equilibrium $\rightarrow$ Non-Linear FEA Stress Simulation $\rightarrow$ Cleanroom CNC Cutting & HF Welding $\rightarrow$ Laser-Aligned Pre-stress Rigging.

4. **Filterable Project Portfolio & Technical Case Studies**:
   - Interactive filtering across Stadia, Retail Atriums, Airport Canopies, Campus Courtyards, and Second-Skin Facades.
   - Deep-dive case study modal dialogs with specifications, spans, and materials.

5. **Dynamic Scope & RFP Cost Estimator**:
   - Interactive configuration of structure type, footprint area ($m^2$), and membrane material.
   - Live calculations for membrane tonnage, structural steel density, light transmission, and turnaround schedule.
   - One-click transfer into the RFP inquiry form.

6. **Regional Hubs & Contact System**:
   - Dual-headquarters presence in Dubai (UAE) and Cairo (Egypt).
   - Validated contact form, direct telephone and email triggers, and WhatsApp quick-connect.

---

## 📁 Project Structure

```
SFXMEC/
├── index.html                 # Semantic HTML5 markup with JSON-LD schema & SEO metadata
├── css/
│   └── style.css              # Custom responsive stylesheet & design system tokens
├── js/
│   └── app.js                 # Interactive logic (tabs, filters, modals, estimator, forms)
├── assets/
│   └── images/                # Ultra-high-resolution architectural photography
│       ├── hero.jpg           # Grand tensile canopy at twilight
│       ├── stadium.jpg        # PTFE stadium roof structure
│       ├── atrium.jpg         # Multi-layer ETFE cushion skylight
│       ├── facade.jpg         # Tensile mesh exterior facade
│       ├── transport.jpg      # Airport terminal arrivals canopy
│       └── courtyard.jpg      # University campus tensile sails
└── README.md                  # Project documentation
```

---

## 💻 Local Preview

Run any standard local server:

```bash
# Using Python 3
python3 -m http.server 3456

# Using Node.js
npm start
```

Open `http://localhost:3456` in any modern web browser.

---

## 🌐 Production Deployment

The project is pre-configured with production caching rules, security headers, and instant CDN deployment for **Vercel** and **Netlify**.

### Option A: Deploy to Vercel (Instant CLI)
```bash
npx vercel
# Follow the interactive prompt to link your account, or run in production mode:
npm run deploy:vercel
```

### Option B: Deploy to Netlify (Instant CLI)
```bash
npx netlify deploy --prod
# Or using the npm script:
npm run deploy:netlify
```

### Option C: Connect via GitHub (Automatic CI/CD)
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/sfxmec.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and click **"Import Project"**.
3. Select your repository. Zero configuration needed—every `git push` will automatically trigger an instant global CDN deployment!

