# @blogmd/core

BlogMd is an open-source blog engine

## Installation

BlogMd を使ってブログを作成するには、まずあなたのレポジトリに`@blogmd/core`をインストールする必要があります。

```bash
npm install @blogmd/core
```

`@blogmd/core`をインストールすることによって、Markdown で記述したページを HTML に変換することができます。

## Usage

次に、BlogMd を使ってブログ記事を作成する方法を紹介します。

### 手動で新規記事を作成する

2. prepare files like bellow

```text
.
├── articles
│   ├── my-favorite-movie
│   │   ├── article.md
│   │   ├── meta.jsonld
│   │   └── resources
│   │       ├── roman-holiday.jpg
│   │       └── the-third-man.jpg
│   └── summer-journey
│       ├── article.md
│       ├── meta.jsonld
│       └── resources
│           ├── airport.jpg
│           ├── grandmother.jpg
│           └── souvenior.jpg
├── manifest.json
├── package.json
└── package-lock.json
```

Each folders of `./articles` must include `article.md` and `meta.jsonld`.
If you include image or video, putting them on `resources` is recommended.
`meta.jsonld` is important to build blog posts. I will show you an example below.

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

### コマンドラインツールを使って新規記事を作成する(experimental)

便利なコマンドラインツールを使うと、マニフェストファイルを対話的に作成できたり、必要なファイルやディレクトリを自動生成することができます。
コマンドラインツールは次のコマンドでインストールすることができます。

```bash
npm install @blogmd/cli
```

コマンドラインツールがインストールできたら、記事を作成してみましょう。

```bash
npx @blogmd/cli article new-article
```

3. write a script

```javascript
// script.js
const BlogMd = require("@blogmd/core").default;

const blogmd = new BlogMd({});
blogmd.build();
blogmd.buildIndex();
```

4. run the script

```bash
node script.js
```
