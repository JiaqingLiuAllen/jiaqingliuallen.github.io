# Local preview

Do not push website changes unless explicitly requested. After editing, build and show a local demo.

The website uses Jekyll. With Ruby 3.1+ and Bundler installed:

```sh
BUNDLE_PATH=vendor/bundle bundle install
BUNDLE_PATH=vendor/bundle bundle exec jekyll serve --config _config.yml,_config.local.yml --host 127.0.0.1 --port 4000
```

On this Mac, the existing Homebrew Ruby can be used without installing another Ruby:

```sh
export PATH="/opt/homebrew/Library/Homebrew/vendor/portable-ruby/3.4.5/bin:$PATH"
export BUNDLE_PATH=vendor/bundle
export BUNDLE_USER_HOME=/private/tmp/allen-site-bundler
bundle exec jekyll serve --config _config.yml,_config.local.yml --host 127.0.0.1 --port 4000
```

Open http://127.0.0.1:4000. Check the homepage, Publications, News, and Misc at desktop and mobile widths; check dark mode (follows the system setting), the nav icons that appear after scrolling past the hero, and the Abstract/BibTeX drawers. `_config.local.yml` disables only ImageMagick generation for the local preview. Production continues to use `_config.yml`.

## Updating content

- Bio: `_pages/about.md`
- Homepage structure (hero, selected publications, news, contact): `_layouts/about.liquid`
- Publications and one-sentence summaries: `_bibliography/papers.bib`
- News: `_news/` (set the icon with `emoji:` in the front matter)
- Contact and profile links: `_data/socials.yml` (the email is never printed as text: `_includes/mail_attrs.liquid` + `assets/js/site.js` assemble it, and `_includes/email_image.liquid` draws it as outlines — regenerate that file if the address changes)
- Misc photos: put images in `assets/img/misc/` and list them in `_data/photos.yml`
- Design tokens, motion and responsive styles: `_sass/_academic.scss`; small interactions: `assets/js/site.js`

Unfinished template posts, project detail pages, books, and unused demo pages are excluded from the generated site, while their source files remain available in the repository.
