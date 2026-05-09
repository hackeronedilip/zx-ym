# AuditFlow Backend Service

This directory contains the starter backend API for AuditFlow.

## Features

- Tenant resolver middleware for subdomain-based tenant routing
- JWT auth and tenant-aware login
- Controls, evidence, and audit request endpoints
- Approve pending evidence through API

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```

## Default users

Use one of these sample users to sign in from the frontend:

- `alice` / `password123` (Acme admin)
- `bob` / `password123` (Acme auditor)
- `charlie` / `password123` (Freshworks engineer)

## Local tenant routing

Local development resolves the tenant ID from the `x-tenant-id` header, the `tenant` query string, or defaults to `tenant-acme`.
