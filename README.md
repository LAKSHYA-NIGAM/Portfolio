# 💼 Personal Portfolio Website — Lakshya Nigam

![CI](https://github.com/LAKSHYA-NIGAM/Portfolio/actions/workflows/ci.yml/badge.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg)

Personal portfolio website showcasing software engineering, backend systems, and full-stack projects, built with responsive modern UI styling and client-side form validation.

## 🔗 Live Demo
👉 **[https://lakshyanigamportfoliowebsite.netlify.app](https://lakshyanigamportfoliowebsite.netlify.app)**

---

## 🚀 Features

- **Responsive Design**: Mobile-first responsive layout with fluid grid breakpoints.
- **Project Showcase**: Highlights Tier-1 engineering projects including AlgoLabs, CodeSync, guardrails-api, xeno-crm, and transacshield with direct links to active repositories.
- **Client-Side Validation**: Form input validation module (`contact-validator.js`) ensuring email RFC regex compliance, name length, and message quality before submission.
- **Scrollspy Navigation**: Smooth scrolling with dynamic section tracking.
- **Automated Tests**: Unit test suite verifying contact validation edge cases using Node's native test runner.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 / Modern Flexbox & Grid, JavaScript (ES6+)
- **Testing**: Node.js Test Runner (`node:test`, `node:assert`)
- **CI/CD**: GitHub Actions
- **Hosting**: Netlify

---

## 🧪 Running Tests

```bash
# Run automated validation test suite
npm test
```

---

## 📂 Project Structure

```
Portfolio/
├── .github/workflows/
│   └── ci.yml                     # Continuous integration workflow
├── index.html                     # Root redirect entrypoint
├── package.json                   # Workspace test definition
├── .gitignore                     # Git ignore rules
└── Portfolio/
    ├── index.html                 # Main portfolio markup & project grid
    ├── style.css                  # Custom responsive styling
    ├── script.js                  # Scrollspy, smooth scroll & form controller
    ├── contact-validator.js       # Form validation logic
    ├── tests/
    │   └── contact-validator.test.mjs  # Unit tests for input validation
    └── Assets/                    # Images, icons, and resume files
```

---

## 📬 Contact & Connect

- **Email**: [lakshyanigam20@gmail.com](mailto:lakshyanigam20@gmail.com)
- **LinkedIn**: [linkedin.com/in/lakshyanigam](https://www.linkedin.com/in/lakshyanigam/)
- **GitHub**: [github.com/LAKSHYA-NIGAM](https://github.com/LAKSHYA-NIGAM)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
