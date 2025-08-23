# Ditto GPT - Next.js Chat Application

A modern, responsive chat application built with Next.js 14, TypeScript, and Tailwind CSS. This project is a conversion from a vanilla HTML/CSS/JavaScript application to a full-featured Next.js application.

## Features

- 🚀 **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- 🌙 **Dark/Light Theme**: Toggle between themes with persistent storage
- 📱 **Responsive Design**: Mobile-first design with collapsible sidebar
- 💬 **Real-time Chat Interface**: Interactive chat with message history
- 🔐 **Authentication Pages**: Login and signup forms with validation
- 🎨 **Beautiful UI**: Modern, clean interface with smooth animations
- 📱 **Mobile Optimized**: Hamburger menu and mobile-friendly layout

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: SVG icons (no external icon libraries)
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Next.js built-in routing

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Main chat page
│   ├── login/
│   │   └── page.tsx         # Login page
│   └── signup/
│       └── page.tsx         # Signup page
├── components/
│   ├── Sidebar.tsx          # Collapsible sidebar component
│   ├── ChatInterface.tsx    # Main chat interface
│   └── ThemeToggle.tsx      # Theme toggle button
public/
└── logofinal.PNG            # Application logo
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd caht-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### Chat Interface
- Empty state with prominent call-to-action
- Real-time message display
- Auto-resizing text inputs
- Loading states and animations
- Message threading with user/assistant avatars

### Sidebar
- Collapsible sidebar for desktop
- Mobile hamburger menu
- Navigation items (New Chat, Login, Signup)
- Chat history display
- User profile section

### Authentication
- Form validation with error handling
- Social login options (Google, GitHub, Microsoft)
- Password visibility toggle
- Responsive form design
- Client-side validation

### Theme System
- Dark/light theme toggle
- Persistent theme storage
- System theme detection
- Smooth theme transitions

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Color scheme in `tailwind.config.js`
- Custom animations in `globals.css`
- Component-specific styles in individual component files

### Components
All components are modular and can be easily modified:
- `Sidebar.tsx` - Navigation and sidebar logic
- `ChatInterface.tsx` - Chat functionality and UI
- `ThemeToggle.tsx` - Theme switching logic

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized with Next.js 14 features
- Lazy loading of components
- Efficient state management
- Minimal bundle size

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Original design inspiration from the vanilla HTML version
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- React team for the component-based architecture
