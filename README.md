# Cursor Reset Tool v1.0.0

A modern documentation website for the [Cursor Reset Tool](https://github.com/RiadDeveloper/Cursor-Machine-ID-Reset-Tool) that provides comprehensive instructions for resetting Cursor IDE machine identifiers.

## ⚠️ Note

This documentation website is for the Cursor Reset Tool which is only available for Windows users.

## 📝 Description

This repository contains the documentation website for the Cursor Reset Tool - a PowerShell script that helps reset your Cursor installation without running any external applications. The website provides a modern, responsive interface for accessing the tool's documentation.

## 🚀 Features

- 📱 Responsive design for desktop and mobile
- 🌓 Dark and light mode support
- 🎨 Modern UI with smooth animations
- 📖 Comprehensive documentation sections:
  - Installation instructions
  - Prerequisites
  - Step-by-step usage guide
  - Important notes and warnings
  - Backup information
  - License and terms
- 🔍 Easy navigation with section links
- ⚡ Fast and optimized performance

## 💻 Prerequisites

Before running the documentation website locally:
- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [Bun](https://bun.sh/) (recommended) or npm

## 📋 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/RiadDeveloper/cursor-reset-tool-docs.git
cd cursor-reset-tool-docs
```

2. Install dependencies:
```bash
# Using Bun (recommended)
bun install

# Using npm
npm install
```

3. Start the development server:
```bash
# Using Bun (recommended)
bun dev

# Using npm
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Shadcn/ui](https://ui.shadcn.com/) - UI components

## 📂 Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── layout.tsx     # Root layout component
│   └── page.tsx       # Main documentation page
├── components/        # Reusable UI components
└── styles/           # Global styles
public/              # Static assets
```

## 🔄 Development

The page will auto-update as you edit the files. For production:

```bash
# Using Bun
bun run build
bun start

# Using npm
npm run build
npm start
```

## 🚀 Deployment

This project is configured for deployment on Netlify. The `netlify.toml` file includes the necessary build settings.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RiadDeveloper/cursor-reset-tool-docs)

You can also deploy on Vercel or any other platform that supports Next.js.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Created by Riad Developer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💬 Support

If you encounter any issues or have questions:
- Ensure you've followed all steps correctly
- [Open an issue](https://github.com/RiadDeveloper/cursor-reset-tool-docs/issues) on GitHub
- Visit the [official repository](https://github.com/RiadDeveloper/Cursor-Machine-ID-Reset-Tool) for tool-specific issues

## 🔗 Related Links

- [Cursor Reset Tool Repository](https://github.com/RiadDeveloper/Cursor-Machine-ID-Reset-Tool) - Official tool repository
- [Cursor IDE](https://cursor.sh/) - Official Cursor IDE website
- [Documentation Site](https://cursor-reset-tool.netlify.app) - Live documentation website
