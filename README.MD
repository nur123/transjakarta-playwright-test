# Transjakarta QA Automation Technical Test

## Overview

This project contains UI automation tests for the DemoQA website using Playwright, TypeScript, and the Page Object Model (POM) design pattern.

The project covers four test scenarios:

1. **Web Tables** – Bulk insert student data from a CSV file and verify the inserted records.
2. **Droppable** – Drag and drop an element into the target area and verify the result.
3. **Resizable** – Resize an element and verify its dimensions.
4. **Student Registration Form** – Fill out and submit the registration form, then verify the confirmation popup.

## Tech Stack

- Node.js
- TypeScript
- Playwright Test
- Page Object Model (POM)
- Chromium

## Prerequisites

Before running the tests, install:

- Node.js and npm
- Visual Studio Code (recommended)

## Installation

1. Clone the repository:

   git clone transajakarta-playwright-test

2. Navigate to the project directory:

   cd transjakarta-playwright-test

3. Install dependencies:

   npm install

4. Install the Chromium browser:

   npx playwright install chromium

## Running the Tests

### Run all test cases

npx playwright test --project=chromium

### Run an individual test

**Web Tables:**

npx playwright test tests/webtables.spec.ts --project=chromium

**Droppable:**

npx playwright test tests/droppable.spec.ts --project=chromium

**Resizable:**

npx playwright test tests/resizable.spec.ts --project=chromium

**Student Registration Form:**

npx playwright test tests/student-registration.spec.ts --project=chromium

### Run tests with a visible browser

npx playwright test --project=chromium --headed

## Test Reports

The project is configured to generate a Playwright HTML report.

After the test execution, open the report using:

npx playwright show-report

## Screenshots and Test Artifacts

Screenshots, videos, traces, and other test artifacts are stored in the configured Playwright output directories when generated.

Check `playwright.config.ts` for the screenshot, video, trace, and report settings.

## Project Structure

transjakarta-playwright-test/
├── data/
├── locators/
├── pages/
├── tests/
├── artifacts/
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md

## Notes

- Ensure all test cases pass before submitting the project.
- Test results may depend on the availability and behavior of the DemoQA website.
- The project uses Chromium for browser automation.