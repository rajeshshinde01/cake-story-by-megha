# Build and deploy Cake Story by Megha

Cake Story by Megha is a static React website. It does not need a database,
application server, or container to run. Build it once, then publish the
generated `dist/` folder to any static web host or web server.

## Before you begin

Install the following on the computer that will build the website:

- Node.js 22 LTS or later
- pnpm
- Git, if you are downloading the project from a repository

Check that the tools are available:

```sh
node --version
pnpm --version
```

## Get the project

Clone the repository, or copy the complete `cake-story-react` project folder
to the build computer. Then open a terminal in that folder.

```sh
cd cake-story-react
```

## Install dependencies

```sh
pnpm install
```

## Check and build

Run the quality check first:

```sh
pnpm run check
```

Create the production website files:

```sh
pnpm run build
```

The finished website is created in:

```text
dist/
```

## Review the production build locally

Before publishing, review the exact production build on your computer:

```sh
pnpm run preview
```

The terminal prints a local address. Open that address in a browser and check
the homepage, cake builder, price calculation, enquiry buttons, images, and
mobile layout.

Stop the preview when finished with `Ctrl+C`.

## Publish the website

Upload the **contents** of the `dist/` folder to the document root of any
static hosting platform or web server. The host must serve `index.html` for
the site root.

Typical choices include:

- An organisation's static web hosting service
- A shared hosting account with a `public_html` folder
- An Nginx or Apache web server
- A static-site hosting platform approved by your organisation

Do not upload `src/`, `node_modules/`, or the project configuration files to
the public website. Only publish the generated `dist/` output.

## Nginx example

Copy the contents of `dist/` to a web directory such as
`/var/www/cake-story/`, then configure Nginx to serve that directory:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/cake-story;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Use your organisation's approved HTTPS and domain configuration before making
the site public.

## Updating the website

1. Update business content in `src/data/content.js`, images in
   `public/assets/`, or the relevant components.
2. Run `pnpm run check` and `pnpm run build` again.
3. Replace the previously hosted files with the new contents of `dist/`.
4. Clear the hosting cache or browser cache if the old version remains visible.
5. Recheck the live website on desktop and mobile.

## Important notes

- Keep the source project in Git; do not make permanent edits directly in
  `dist/`.
- Keep business contact details, prices, images, and policies current before
  every release.
- Test cake pricing options after any update to the catalogue or cake-builder
  rules.
- Keep a copy of the last working `dist/` build so it can be restored quickly
  if a deployment needs to be rolled back.
