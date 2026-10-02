---
trigger: always_on
---

# Rule: Prevent Prisma N+1 Query Issues

# Activation: Model Decision

## Context

When generating or modifying Prisma code, you must prevent the N+1 query problem. This happens when the code fetches a list of records and then runs a separate query for each record to fetch its relations.

## Critical Instructions

1. **Never use Loops for Relations:** Do not execute `prisma.model.findUnique()` or `findMany()` inside a `forEach`, `map`, or `for` loop to fetch related data.
2. **Use Native Includes:** Always use the `include` or `select` options inside a single query to eagerly load relations.
3. **Use Fluent API for Single Records:** When fetching relations for a known single record, use fluent API relation queries (e.g., `prisma.user.findUnique().posts()`) instead of separate queries.
4. **Use Batching for Bulk Operations:** If separate queries are unavoidable, group them using `prisma.$transaction([])`.

## Correct Examples

### Example 1: Fetching users with their posts (Eager Loading)

```typescript
// CORRECT
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true,
  },
});
```

### Example 2: Filtering by related data efficiently

```typescript
// CORRECT
const postsWithAuthors = await prisma.post.findMany({
  where: {
    published: true,
  },
  include: {
    author: true,
  },
});
```

## Incorrect Examples to Avoid

### Anti-Pattern 1: Loop Queries (Strictly Prohibited)

```typescript
// INCORRECT (Causes N+1)
const users = await prisma.user.findMany();
const usersWithPosts = await Promise.all(
  users.map(async (user) => {
    const posts = await prisma.post.findMany({ where: { authorId: user.id } });
    return { ...user, posts };
  }),
);
```
