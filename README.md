# AI FAQ Assistant
## Project Description

AI FAQ Assistant is a web-based FAQ management and question-answering system.

The application allows users to ask questions and receive answers from an FAQ database. Admin users can add, edit, delete, search, and manage FAQs through the Admin Dashboard.

The project is developed using React.js, Node.js, Express.js, and MongoDB.

## Features

- User Registration and Login
- Admin Login
- Role-Based Access Control
- Admin Dashboard
- Add New FAQs
- Edit Existing FAQs
- Delete FAQs
- Search FAQs
- Filter FAQs by Category
- FAQ Count Display
- Quick Questions
- AI-Based FAQ Question Answering
- Answer Source and Category Display
- Loading Status
- Clear Question and Answer
- MongoDB Atlas Database
- Responsive Dark Theme UI

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- MongoDB Atlas

### Authentication
- JWT (JSON Web Token)
- bcrypt

### Tools
- Visual Studio Code
- Git
- GitHub
- npm

## Project Structure

```text
AI FAQ PROJECT CODE/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── faqController.js
│   │   └── aiController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── FAQ.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── faqRoutes.js
│   │   └── aiRoutes.js
│   │
│   ├── services/
│   │   ├── faqService.js
│   │   └── aiService.js
│   │
│   ├── app.js
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── Auth.js
│       └── AdminDashboard.js
│
├── .env
├── package.json
└── README.md

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### FAQ

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/faqs` | Get all FAQs |
| GET | `/api/faqs/search?keyword=value` | Search FAQs |
| GET | `/api/faqs/:id` | Get FAQ by ID |
| POST | `/api/faqs` | Create FAQ |
| PUT | `/api/faqs/:id` | Update FAQ |
| DELETE | `/api/faqs/:id` | Delete FAQ |

### AI FAQ Assistant

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/ask` | Ask a question and get an FAQ-based answer |

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/6660-kishored811/TN-NM-AI-AUGUMENTED-BACKEND-PROJECT.git
cd AI-FAQ-PROJECT-CODE

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Usage

### User

1. Open the application in the browser.
2. Register a new account.
3. Login using the registered credentials.
4. Ask a question using the FAQ Assistant.
5. Select a Quick Question for faster access.
6. View the answer, source, and category.
7. Use the Clear button to reset the question and answer.

### Admin

1. Login using an admin account.
2. Open the Admin Dashboard.
3. Add new FAQs.
4. Edit existing FAQs.
5. Delete FAQs.
6. Search FAQs.
7. Filter FAQs by category.
8. View total FAQ and category counts.

## Future Enhancements

- AI-powered natural language understanding
- Chat history for users
- Voice-based question answering
- Email notifications
- Advanced analytics dashboard
- FAQ recommendation system
- Improved authentication and security
- Deployment to a cloud platform

## License

This project is developed for educational and academic purposes.