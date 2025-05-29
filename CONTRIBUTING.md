# Contributing to Apus

First off, thank you for considering contributing to Apus! It's people like you that make Apus such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Apus. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

#### Before Submitting A Bug Report

* Check the documentation for a list of common questions and problems.
* Perform a cursory search to see if the problem has already been reported.
* Check if the problem has been fixed in the latest version (look through closed issues).

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as GitHub issues. Create an issue and provide the following information by filling in the template.

Explain the problem and include additional details to help maintainers reproduce the problem:

* Use a clear and descriptive title for the issue to identify the problem.
* Describe the exact steps which reproduce the problem in as many details as possible.
* Provide specific examples to demonstrate the steps.
* Describe the behavior you observed after following the steps and point out what exactly is the problem with that behavior.
* Explain which behavior you expected to see instead and why.
* Include screenshots and animated GIFs which show you following the described steps and clearly demonstrate the problem.
* If the problem is related to performance or memory, include a CPU profile capture with your report.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Apus, including completely new features and minor improvements to existing functionality.

#### Before Submitting An Enhancement Suggestion

* Check the documentation to see if the functionality is already covered.
* Perform a cursory search to see if the enhancement has already been suggested.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide the following information:

* Use a clear and descriptive title for the issue to identify the suggestion.
* Provide a step-by-step description of the suggested enhancement in as many details as possible.
* Provide specific examples to demonstrate the steps.
* Describe the current behavior and explain which behavior you expected to see instead and why.
* Include screenshots and animated GIFs which help you demonstrate the steps or point out the part of Apus which the suggestion is related to.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow our coding conventions
* Document new code based on the Documentation Style Guide
* End all files with a newline

## Development Process

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/apus.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. Make your changes
2. Run tests:
   ```bash
   npm test
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` A new feature
* `fix:` A bug fix
* `docs:` Documentation only changes
* `style:` Changes that do not affect the meaning of the code
* `refactor:` A code change that neither fixes a bug nor adds a feature
* `perf:` A code change that improves performance
* `test:` Adding missing tests or correcting existing tests
* `chore:` Changes to the build process or auxiliary tools

### Code Style

* We use ESLint and Prettier for code formatting
* Run `npm run lint` to check for style issues
* Run `npm run format` to automatically fix style issues

### Testing

* Write tests for new features
* Ensure all tests pass before submitting a PR
* Maintain or improve test coverage

## Documentation

* Update the README.md if needed
* Add JSDoc comments for new functions and components
* Update the API documentation if you're changing the public API

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a new release on GitHub
4. Publish to npm

## Questions?

Feel free to open an issue for any questions you might have about contributing to Apus. 