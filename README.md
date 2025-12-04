# Book API Documentation

Simple REST API untuk manajemen buku dan kategori dengan autentikasi JWT.

## Base URL

```
http://pmbpolteksi.site:5050
```

## Tech Stack

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT Authentication
- Bcrypt untuk password hashing

## Database Schema

### User
- id (UUID)
- name (String)
- email (String, unique)
- password (String, hashed)
- createdAt, updatedAt

### Category
- id (UUID)
- name (String, unique)
- description (String, optional)
- createdAt, updatedAt

### Book
- id (UUID)
- title (String)
- author (String)
- description (String, optional)
- publishYear (Integer)
- stock (Integer)
- categoryId (UUID, foreign key)
- createdAt, updatedAt

---

## API Endpoints

### 🔐 Authentication

#### 1. Register User

```bash
curl -X POST http://pmbpolteksi.site:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2. Login

```bash
curl -X POST http://pmbpolteksi.site:5050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ Simpan token untuk request selanjutnya!**

#### 3. Logout

```bash
curl -X POST http://pmbpolteksi.site:5050/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 📚 Categories

#### 1. Get All Categories (Public)

```bash
curl http://pmbpolteksi.site:5050/api/categories
```

#### 2. Get Category by ID (Public)

```bash
curl http://pmbpolteksi.site:5050/api/categories/{categoryId}
```

#### 3. Create Category (Protected)

```bash
curl -X POST http://pmbpolteksi.site:5050/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Fiction",
    "description": "Fictional books and novels"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Kategori berhasil dibuat",
  "data": {
    "id": "uuid",
    "name": "Fiction",
    "description": "Fictional books and novels",
    "createdAt": "2024-11-23T12:00:00.000Z",
    "updatedAt": "2024-11-23T12:00:00.000Z"
  }
}
```

**⚠️ Simpan categoryId untuk membuat buku!**

#### 4. Update Category (Protected)

```bash
curl -X PUT http://pmbpolteksi.site:5050/api/categories/{categoryId} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Science Fiction",
    "description": "Science fiction books and novels"
  }'
```

#### 5. Delete Category (Protected)

```bash
curl -X DELETE http://pmbpolteksi.site:5050/api/categories/{categoryId} \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 📖 Books

#### 1. Get All Books (Public)

```bash
curl http://pmbpolteksi.site:5050/api/books
```

#### 2. Get Book by ID (Public)

```bash
curl http://pmbpolteksi.site:5050/api/books/{bookId}
```

#### 3. Create Book (Protected)

```bash
curl -X POST http://pmbpolteksi.site:5050/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "publishYear": 1925,
    "stock": 10,
    "categoryId": "YOUR_CATEGORY_ID_HERE"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Buku berhasil dibuat",
  "data": {
    "id": "uuid",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "publishYear": 1925,
    "stock": 10,
    "categoryId": "uuid",
    "category": {
      "id": "uuid",
      "name": "Fiction"
    },
    "createdAt": "2024-11-23T12:00:00.000Z",
    "updatedAt": "2024-11-23T12:00:00.000Z"
  }
}
```

#### 4. Update Book (Protected)

```bash
curl -X PUT http://pmbpolteksi.site:5050/api/books/{bookId} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "The Great Gatsby - Updated",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel - Updated edition",
    "publishYear": 1925,
    "stock": 15,
    "categoryId": "YOUR_CATEGORY_ID_HERE"
  }'
```

#### 5. Delete Book (Protected)

```bash
curl -X DELETE http://pmbpolteksi.site:5050/api/books/{bookId} \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🧪 Testing Flow dengan cURL

### Step 1: Register & Login

```bash
# 1. Register user baru
curl -X POST http://pmbpolteksi.site:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# 2. Login
curl -X POST http://pmbpolteksi.site:5050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Simpan token dari response!
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Step 2: Create Category

```bash
# Create category
curl -X POST http://pmbpolteksi.site:5050/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Fiction","description":"Fictional books"}'

# Simpan categoryId dari response!
export CATEGORY_ID="uuid-dari-response"
```

### Step 3: Create Book

```bash
# Create book
curl -X POST http://pmbpolteksi.site:5050/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title":"1984",
    "author":"George Orwell",
    "description":"Dystopian novel",
    "publishYear":1949,
    "stock":5,
    "categoryId":"'$CATEGORY_ID'"
  }'

# Simpan bookId dari response!
export BOOK_ID="uuid-dari-response"
```

### Step 4: Read Data

```bash
# Get all categories
curl http://pmbpolteksi.site:5050/api/categories

# Get all books
curl http://pmbpolteksi.site:5050/api/books

# Get specific book
curl http://pmbpolteksi.site:5050/api/books/$BOOK_ID
```

### Step 5: Update Data

```bash
# Update book
curl -X PUT http://pmbpolteksi.site:5050/api/books/$BOOK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title":"1984 - Updated",
    "author":"George Orwell",
    "description":"Dystopian novel - Updated",
    "publishYear":1949,
    "stock":10,
    "categoryId":"'$CATEGORY_ID'"
  }'
```

### Step 6: Delete Data

```bash
# Delete book
curl -X DELETE http://pmbpolteksi.site:5050/api/books/$BOOK_ID \
  -H "Authorization: Bearer $TOKEN"

# Delete category
curl -X DELETE http://pmbpolteksi.site:5050/api/categories/$CATEGORY_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📝 Notes

### Authentication
- Token JWT berlaku selama **7 hari**
- Token disimpan di cookie dan juga dikembalikan di response
- Untuk protected endpoints, gunakan header: `Authorization: Bearer YOUR_TOKEN`

### Public vs Protected Endpoints
- **Public** (tidak perlu token):
  - GET `/api/categories`
  - GET `/api/categories/:id`
  - GET `/api/books`
  - GET `/api/books/:id`

- **Protected** (perlu token):
  - POST, PUT, DELETE untuk categories
  - POST, PUT, DELETE untuk books
  - POST `/api/auth/logout`

### Error Responses

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (only in development)"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid credentials or token)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🚀 Deployment

API ini di-deploy menggunakan:
- **Platform**: Dokploy
- **Database**: PostgreSQL
- **Server**: VPS dengan IP 212.2.244.240
- **Port**: 5050

---

## 👨‍💻 Development

### Local Setup

```bash
# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan DATABASE_URL dan JWT_SECRET

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secret-key-here
APP_PORT=5050
NODE_ENV=production
```

---

## 📄 License

MIT

---

## 🤝 Contributing

Pull requests are welcome!

---

**Happy Testing! 🎉**
