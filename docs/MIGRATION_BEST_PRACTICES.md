# Database Migration Best Practices

This document outlines the best practices for creating and managing database migrations in this project. Following these guidelines will help prevent deployment failures and data loss.

## 1. Never Modify Committed Migrations

Once a migration has been committed to the `main` branch or has been run on any shared environment (including staging or other developers' local machines), it must be considered **immutable**. 

* **Do not edit a migration file after it has been committed.** If you need to make changes, create a new migration to alter the schema or data.
* **Do not delete a migration file**, even if it failed. A failed migration must be fixed with a new migration or by manually resolving the issue in the database and then creating a new migration to correct the state.

## 2. Thoroughly Test Migrations Locally

Before submitting a pull request, you must thoroughly test your migrations in a local environment that mirrors production as closely as possible.

1. **Reset your local database:**
   ```bash
   docker compose -f dev.docker-compose.yml exec backend npx prisma migrate reset --force
   ```
2. **Apply all migrations:**
   ```bash
   docker compose -f dev.docker-compose.yml exec backend npx prisma migrate deploy
   ```
3. **Seed your database with realistic data** and test the application to ensure that your changes have not introduced any unintended side effects.

## 3. Mandatory Code Reviews for Migrations

All pull requests that include database migrations must be reviewed by at least one other developer before being merged. The reviewer should:

* **Verify the migration logic:** Check for potential data loss, performance issues, and correctness.
* **Ensure the migration is idempotent:** It should be possible to run the migration multiple times without causing errors.
* **Confirm that the migration has been tested locally.**

## 4. Resolving Failed Migrations

If a migration fails in a production environment, **do not delete the migration file**. Instead, follow these steps:

1. **Identify the cause of the failure** by examining the deployment logs.
2. **Create a new migration** that fixes the issue. This might involve reverting the changes from the failed migration or applying a different set of changes.
3. **If the migration cannot be fixed with a new migration**, you may need to manually intervene in the database. In this case, you must still create a new migration to ensure that the schema is correctly reflected in the codebase.
