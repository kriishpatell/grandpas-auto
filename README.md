# grandpas-auto

A simple, lovable, and complete cross-platform inventory management system for pre-owned car dealerships.
Accessible on desktop (Electron + React), mobile (React Native), and managed with a secure in-house Node.js/MongoDB backend.

🚀 Features
- Inventory Dashboard: Add, edit, and view all vehicles with detailed info and photos.
- Vehicle Search & Filter: Find vehicles by VIN, make, model, year, mileage, title, and more.
- Photo Uploads: Attach multiple images per vehicle.
- Inspection Forms: Record mechanical, exterior, and other condition metrics.
- Scoring System: Calculate a custom rating/score for each vehicle; weights can be tuned.
- Sales & Financials: Track purchase price, repair costs, fees, and sale info (restricted to owner).
- User Roles: Owner and employee, with RBAC to protect sensitive data.
- Customer Management: Link sales to buyers if desired.
- Responsive Design: Mobile-first, desktop-ready.
- Simple local hosting: All data lives on the dealership’s infrastructure for privacy & security.

🛠️ Tech Stack
- Backend: Node.js, Express, TypeScript, MongoDB (Mongoose ODM)
- Frontend:
  * Desktop: Electron + React + TypeScript
  * Mobile: React Native
- Authentication: Simple email+password, role-based access
- File Uploads: API for vehicle photos & documents
- Data Modeling: Vehicles, Photos, Inspections, Scores, Sales, Users, Customers
