# Contributing to Payload Next.js Template

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## 🤝 How to Contribute

### 1. Fork the Repository
- Fork this repository to your GitHub account
- Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/Payload-next-template.git
cd Payload-next-template
```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass: `npm test`
- Ensure the build works: `npm run build`

### 5. Commit Your Changes
Use conventional commit messages:
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug issue"
git commit -m "docs: update documentation"
git commit -m "style: format code"
git commit -m "refactor: improve code structure"
git commit -m "test: add test coverage"
git commit -m "chore: update dependencies"
```

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a pull request on GitHub.

## 📋 Contribution Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Performance
- Ensure Core Web Vitals scores remain high
- Optimize images and assets
- Use lazy loading where appropriate
- Follow Next.js best practices

### Accessibility
- Maintain WCAG AA compliance
- Test with screen readers
- Ensure proper semantic HTML
- Verify keyboard navigation

### Testing
- Write unit tests for utility functions
- Add integration tests for components
- Test accessibility compliance
- Verify performance metrics

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

## 💡 Feature Requests

For feature requests:
- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider backward compatibility
- Discuss performance implications

## 📝 Documentation

Help improve documentation by:
- Fixing typos and grammar
- Adding examples and use cases
- Improving clarity and organization
- Translating to other languages

## 🚀 Release Process

1. Features are merged to `main` branch
2. Releases are tagged with semantic versioning
3. Changelog is updated automatically
4. Documentation is deployed to GitHub Pages

## 📞 Getting Help

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Join our community chat (if available)
- Review documentation and guides

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to make this template better! 🎉