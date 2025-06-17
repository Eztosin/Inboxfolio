# Contributing to Inboxfolio

Thank you for your interest in contributing to Inboxfolio! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/inboxfolio.git
   cd inboxfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Guidelines
- Use functional components with hooks
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Include proper error handling

### API Guidelines
- Follow RESTful conventions
- Include proper error responses
- Validate all inputs
- Use appropriate HTTP status codes

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Writing Tests
- Write unit tests for utility functions
- Include integration tests for API endpoints
- Test error scenarios
- Maintain good test coverage

## 📋 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**
4. **Update the README** if necessary
5. **Create a detailed PR description**

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🐛 Bug Reports

### Before Submitting
- Check existing issues
- Verify the bug in the latest version
- Gather relevant information

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 1.0.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
Clear description of the proposed feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other solutions you've considered

## Additional Context
Any other relevant information
```

## 🏗️ Architecture Guidelines

### Frontend Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # API services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── styles/        # Global styles
```

### Backend Structure
```
server/
├── routes/        # Express routes
├── middleware/    # Custom middleware
├── models/        # Data models
├── services/      # Business logic
├── utils/         # Utility functions
└── tests/         # Server tests
```

## 📚 Documentation

### Code Documentation
- Use JSDoc for function documentation
- Include inline comments for complex logic
- Keep README files updated
- Document API endpoints

### Commit Messages
Follow conventional commits:
```
type(scope): description

feat(api): add email filtering endpoint
fix(ui): resolve mobile navigation issue
docs(readme): update installation instructions
```

## 🔒 Security

### Security Guidelines
- Sanitize all user inputs
- Use HTTPS in production
- Validate API requests
- Follow OWASP guidelines

### Reporting Security Issues
Email security issues to: security@inboxfolio.com

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/yourusername/inboxfolio/discussions)
- 🐛 [GitHub Issues](https://github.com/yourusername/inboxfolio/issues)
- 📧 Email: contribute@inboxfolio.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Inboxfolio! 🎉