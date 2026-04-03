# 🌱 Eat Green, Live Clean - Vegetarian Recipe Platform

A modern, community-driven vegetarian recipe sharing platform powered by AI recommendations. Built with Svelte Kit and hosted on a robust backend infrastructure.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building & Deployment](#building--deployment)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Features
- **User Authentication**: Secure login, signup, and password reset functionality
- **Profile Management**: Create and edit personalized user profiles
- **Recipe Discovery**: Browse and search vegetarian recipes from the community
- **Recipe Management**: Add, edit, and manage your own recipes
- **Recipe Sharing**: Save favorite recipes and sharing capabilities
- **AI Recommendations**: Get personalized recipe suggestions powered by LangChain
- **Recipe Reporting**: Report inappropriate or low-quality recipes

### Admin Features
- **Admin Dashboard**: Comprehensive admin panel for platform management
- **User Management**: Manage user accounts and permissions
- **Recipe Moderation**: Review and manage submitted recipes
- **Contact Management**: Handle user inquiries and feedback
- **Report Management**: Review and act on recipe reports

### User Engagement
- **Contact Form**: Send feedback and inquiries to the platform team
- **About Us**: Learn more about the platform and its mission
- **Community Recipes**: Discover suggested and trending recipes

## 🛠 Tech Stack

### Frontend
- **Svelte 5**: Modern reactive framework for building user interfaces
- **SvelteKit**: Full-stack framework for routing and server-side rendering
- **Vite**: Lightning-fast build tool and development server
- **Bootstrap 5**: Responsive CSS framework
- **Animate.css**: Animation library for smooth UI transitions

### Libraries & Tools
- **Axios**: HTTP client for API communication
- **LangChain (Google GenAI)**: AI-powered recipe recommendations
- **html2pdf.js**: PDF generation for recipes
- **Marked**: Markdown parser for recipe formatting
- **Svelte Toast**: Toast notifications for user feedback
- **Prettier**: Code formatter
- **ESLint**: Code linter and quality tool

## 📁 Project Structure

```
src/
├── lib/
│   ├── api.js                 # API client and endpoints
│   ├── components/            # Reusable Svelte components
│   │   ├── LoginCard.svelte
│   │   ├── SignupCard.svelte
│   │   ├── RecipeCard.svelte
│   │   ├── AdminPanel.svelte
│   │   ├── NavBar.svelte
│   │   └── ...
│   ├── stores/                # Svelte stores for state management
│   │   └── store.js
│   ├── utils/                 # Utility functions
│   │   └── validateAuth.js
│   └── img/                   # Static images and assets
├── routes/                    # SvelteKit pages and routes
│   ├── +layout.svelte         # Main layout
│   ├── +page.svelte           # Landing page
│   ├── login/                 # Authentication pages
│   ├── signup/
│   ├── forgot-password/
│   ├── reset-password/
│   ├── dashboard/             # User dashboard
│   ├── profile/               # User profile management
│   ├── recipes/               # Recipe discovery
│   ├── add-recipe/            # Recipe creation
│   ├── my-recipes/            # User's recipes
│   ├── edit-Recipe/           # Recipe editing
│   ├── preview_recipe/        # Recipe preview
│   ├── saved/                 # Saved recipes
│   ├── admin/                 # Admin routes
│   │   ├── manage_users/
│   │   ├── manage_recipes/
│   │   ├── manage_contacts/
│   │   └── manage_reports/
│   ├── admin_dashboard/       # Admin dashboard
│   ├── contactUs/             # Contact form
│   └── aboutUs/               # About page
├── app.html                   # HTML entry point
└── static/                    # Static files
```

## 🔗 API Integration

The frontend communicates with a backend API through the API client located in [lib/api.js](src/lib/api.js). 

Key features:
- Centralized HTTP requests using Axios
- Authentication token management
- Error handling and response formatting
- CORS-enabled communication

## 🎨 Key Components

- **Navbar**: Main navigation component
- **RecipeCard**: Displays recipe information in card format
- **LoginCard / SignupCard**: Authentication forms
- **AdminPanel**: Admin interface for platform management
- **EditProfileCard**: User profile editing
- **AddRecipeForm**: Form for creating new recipes
- **DashboardCard**: Dashboard widgets
- **SuggestedRecipes**: AI-powered recipe recommendations

## 🧪 Code Quality

The project follows best practices with:
- **ESLint**: Enforces consistent code style
- **Prettier**: Automatic code formatting
- **SvelteKit Kit Sync**: Automatic type generation

Run linting and formatting:
```bash
npm run lint      # Check code
npm run format    # Auto-format code
```

## 📱 Responsive Design

The platform is fully responsive and works seamlessly across:
- Desktop browsers
- Tablets
- Mobile devices

Built with Bootstrap 5 grid system and custom responsive styles.

## 🔐 Security

- Secure authentication and token management
- Password reset functionality with validation
- Protected admin routes and operations
- Input validation on forms


## 📚 Resources

- [Svelte Documentation](https://svelte.dev)
- [SvelteKit Documentation](https://kit.svelte.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [Axios Documentation](https://axios-http.com)
- [LangChain Documentation](https://js.langchain.com)


