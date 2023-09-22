---
title: Installation Guide
layout: mainstream-guide.njk
breadcrumbs: [
    {
        text: "Home",
        href: "/"
    },
    {
        text: "Organisations",
        href: "/government/organisations"
    },
    {
        text: "Department for Digital",
        href: "/government/organisations/department-for-digital"
    },
    {
        text: "Developers",
        href: "/government/organisations/department-for-digital/developers"
    },
    {
        text: "Services",
        href: "/government/organisations/department-for-digital/developers/services"
    },
    {
        text: "Website",
        href: "/government/organisations/department-for-digital/developers/services/website"
    },
    {
        text: "Usage",
        href: "/government/organisations/department-for-digital/developers/services/website/usage"
    },
    {
        text: "Installation Guide"
    }
]
---

## Prerequisites

Before you begin, make sure you have the following installed on your system:

1. [Node.js](https://nodejs.org/): You'll need Node.js to run JavaScript on your machine. Download and install the LTS (Long Term Support) version if you haven't already.

2. [npm](https://www.npmjs.com/): npm is the Node.js package manager that comes with Node.js. Ensure it's installed by running the following command in your terminal:

   ```bash
   npm -v
   ```

3. [Git](https://git-scm.com/): This project is hosted on a Git repository (GitHub), you'll need Git for version control. Download and install Git from the official website.

## Installation Steps

1. **Clone the Repository:**

   This project is hosted on a Git repository, open your terminal and navigate to the directory where you want to install your project. Then, run the following command to clone the repository:

   ```bash
   git clone https://github.com/samland-Gov/website/
   ```

2. **Navigate to the Project Directory:**

   Change your current directory to the project folder:

   ```bash
   cd website
   ```

3. **Install Dependencies:**

   Use npm to install the project's dependencies. These dependencies are usually listed in a `package.json` file. Run the following command:

   ```bash
   npm install
   ```

4. **Start the Application:**

You make the the [running guide](./running.md) to see how this project can be ran.
