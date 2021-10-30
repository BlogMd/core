# @blogmd/core

BlogMd is an open-source blog engine

## Usage

1. install blogmd on your repository

```bash
npm install @blogmd/core
```

2. prepare files like bellow

```text
.
├── articles
│   ├── summer-journey
│   │   ├── article.md
│   │   ├── ebay.png
│   │   ├── meta.jsonld
│   │   ├── airport.jpg
│   │   ├── grandmother.jpg
│   │   ├── great-dish.jpg
│   │   └── souvenior.jpg
│   └── my-favorite-movie
│       ├── article.md
│       ├── meta.jsonld
│       └── the-third-man.jpg
├── package-lock.json
└── package.json
```

Each folders of `./articles` must include `article.md` and `meta.jsonld`. `meta.jsonld` is important to build blog posts. I will show you an example below.

```javascript
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "blog.example.com" // URL of the blog
  },
  "headline": "My summer journey", // title of the post
  "image": "./airport.jpg", // main picture
  "author": {
    "@type": "Person",
    "name": "Torichan", // Author's name
    "url": "https://example.com/torichan" // Author's profile page
  },
  "publisher": {
    "@type": "Organization",
    "name": "Torichan Labo", // Publisher's name
    "logo": {
      "@type": "ImageObject",
      "url": "https://pbs.twimg.com/profile_images/1435134138659475456/rV1YHF06_400x400.jpg" // Publisher's icon
    }
  },
  "datePublished": "2021-10-28", // Created date
  "dateModified": "2021-10-28" // Last updated
}
```

3. write a script

```javascript
// script.js
const blogmd = new BlogMd({});
blogmd.build();
blogmd.buildIndex();
```

4. run the script

```bash
node script.js
```
