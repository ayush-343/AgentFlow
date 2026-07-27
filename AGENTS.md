<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# Database types

Derive database types from the Drizzle schema - never hand-write custom or partial shapes for table rows. Export 'typeof table.$inferSelect' (and '$inferInsert' when needed) from 'lib/schemats' and import it. When a consumer needs only some columns, narrow with 'Pick<Row, ...>' / 'Omit<Row, ...>' rather than redeclaring a literal type. Don't add an insert type where 'db.insert(...).values()' already enforces the shape.


# JSX Entity Escaping

Always escape unescaped entities like apostrophes (`'`), quotes (`"`), and angle brackets in JSX text children using HTML entities (`&apos;`, `&quot;`, `&lsquo;`, `&rsquo;`) or string expressions (e.g. `{"'"}`, `{"doesn't"}`) to prevent `react/no-unescaped-entities` errors.

