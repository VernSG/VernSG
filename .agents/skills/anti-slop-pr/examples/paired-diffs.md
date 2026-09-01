# Paired Diff Examples: AI Slop vs Grounded Senior Engineer

This document provides direct translations showing how to convert bloated AI summaries into crisp, high-signal PR descriptions.

---

### Example 1: Concurrency Bugfix (Go)

```diff
diff --git a/auth/token.go b/auth/token.go
@@ -42,2 +42,4 @@ func (s *Service) RefreshToken(ctx context.Context, id string) (*Token, error) {
+    s.mu.Lock()
+    defer s.mu.Unlock()
     token, err := s.store.Get(id)
```

#### ❌ AI Slop:
> *This pull request quietly resolves a latent concurrency race condition by reinforcing the load-bearing authentication seam. It ensures genuine session persistence survived concurrent refresh token invocations under heavy load.*

#### ✅ Grounded Senior Engineer:
> **Summary**: Adds a mutex lock to `RefreshToken` to prevent race conditions when simultaneous token refresh requests occur for the same session ID.
> 
> **Changes**:
> - `auth/token.go`: Added `s.mu.Lock()` / `defer s.mu.Unlock()` around store access.
> 
> **Verification**:
> - `go test -race ./auth/...`

---

### Example 2: API Route Validation (TypeScript / Node)

```diff
diff --git a/routes/users.ts b/routes/users.ts
@@ -14,2 +14,5 @@ router.post("/signup", async (req, res) => {
+  if (!isValidEmail(req.body.email)) {
+    return res.status(400).json({ error: "Invalid email format" });
+  }
```

#### ❌ AI Slop:
> *In this PR, we delve into the user onboarding flow and orchestrate a robust validation layer to safeguard against invalid email structures, paving the way for seamless user acquisition.*

#### ✅ Grounded Senior Engineer:
> **Summary**: Returns HTTP 400 when user registration email fails regex format validation.
> 
> **Changes**:
> - `routes/users.ts`: Added email format check using `isValidEmail()` before user creation.
> 
> **Verification**:
> - `npm test -- tests/routes/users.test.ts`

---

### Example 3: Database Index Migration (SQL / Laravel)

```diff
diff --git a/database/migrations/2026_09_01_add_index_to_orders.php b/database/migrations/2026_09_01_add_index_to_orders.php
@@ -0,0 +1,7 @@
+Schema::table('orders', function (Blueprint $table) {
+    $table->index(['user_id', 'created_at']);
+});
```

#### ❌ AI Slop:
> *Executes a pivotal database enhancement to streamline query performance and enrich the order retrieval tapestry, safeguarding the system from latent latency spikes.*

#### ✅ Grounded Senior Engineer:
> **Summary**: Adds composite index on `(user_id, created_at)` to `orders` table to speed up user order history queries.
> 
> **Changes**:
> - `database/migrations/..._add_index_to_orders.php`: Created migration for composite index on `orders`.
> 
> **Verification**:
> - `php artisan migrate --pretend`
