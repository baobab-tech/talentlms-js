# Contributing to TalentLMS API Wrapper

We welcome contributions to the TalentLMS API Wrapper project! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository on GitHub: [https://github.com/baobab-tech/talentlms-js](https://github.com/baobab-tech/talentlms-js)
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/talentlms-js.git
   cd talentlms-js
   ```
3. Create a new branch for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Making Changes

1. Ensure you have the latest changes from the upstream repository:
   ```bash
   git remote add upstream https://github.com/baobab-tech/talentlms-js.git
   git fetch upstream
   git merge upstream/main
   ```
2. Make your changes in your branch.
3. Add or update tests as necessary.
4. Ensure all tests pass by running:
   ```bash
   npm test
   ```

## Commit Message Guidelines

We use [semantic-release](https://github.com/semantic-release/semantic-release) for automated version management and package publishing. For this to work, we follow the [Angular Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).

Each commit message consists of a **header**, a **body**, and a **footer**. The header has a special format that includes a **type**, a **scope**, and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Example commit message:

```
feat(api): add ability to get users by custom field

This new feature allows querying users by any custom field value,
enhancing the flexibility of user searches.

Closes #123
```

### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body

Just as in the subject, use the imperative, present tense. The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit Closes.

Breaking Changes should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Code Style

- Follow the existing code style in the project.
- Use TypeScript for all new code.
- Use meaningful variable and function names.
- Comment your code where necessary.
- Run the linter to ensure code style consistency:
  ```bash
  npm run lint
  ```

## Submitting Changes

1. Push your changes to your fork on GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Create a pull request from your fork to the main repository. You can do this by navigating to [https://github.com/baobab-tech/talentlms-js/pulls](https://github.com/baobab-tech/talentlms-js/pulls) and clicking on "New pull request".
3. Describe your changes in the pull request description.
4. Reference any relevant issues in the pull request description.

## Reporting Issues

- Use the [GitHub issue tracker](https://github.com/baobab-tech/talentlms-js/issues) to report bugs.
- Describe the bug in detail, including steps to reproduce.
- Include the version of the library you're using.

## Feature Requests

- Use the [GitHub issue tracker](https://github.com/baobab-tech/talentlms-js/issues) to suggest new features.
- Clearly describe the feature and its potential benefits.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Questions or Need Help?

If you have questions or need help with the contribution process, please open an issue in the [GitHub issue tracker](https://github.com/baobab-tech/talentlms-js/issues) with the label "question".

Thank you for contributing to the TalentLMS API Wrapper!