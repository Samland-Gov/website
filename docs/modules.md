---
title: Modules
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
        href: "/government/organisations/department-for-digital/developers"
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
        text: "Modules"
    }
]
---

## Frontend

The frontend module is responsible for displaying content to the user. It shall send document requests to the backend which shall give the document to the frontend, which will be rendered.

The frontend shall be completely separate from the backend, and shall ues the backend's API for retrieving documents. This means the frontend can be completely redesigned in the future without affecting the backend.

## Backend

The backend is responsible for handling document requests from the frontend. The backend is split into multiple services, each with its own API.

### Services

#### Document API
