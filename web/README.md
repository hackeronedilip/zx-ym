# AuditFlow Web Portal

This directory contains the frontend portal for AuditFlow.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Notes

The frontend calls the backend at `http://localhost:4000` by default. Use the backend login endpoint to authenticate and explore the sample tenant dashboard.

## Purpose

- Compliance Dashboard
- Auditor Trust Portal
- Tenant admin portal
