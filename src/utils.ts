import MarkdownIt from 'markdown-it';

export const markdownToHtml = (markdown: string) => {
	const parser = new MarkdownIt();
	return parser.render(markdown);
}

export type MetadataBlogPost = {
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	"mainEntityOfPage": {
		"@type": "WebPage",
		"@id": string // ブログのURL
	},
	"headline": string, // 記事のタイトル
	"image": string, // 記事のトップ画像へのリンク
	"author": {
		"@type": "Person",
		"name": string, // 筆者の名前
		"url": string // 筆者のプロフィールページへのリンク
	},
	"publisher": {
		"@type": "Organization",
		"name": string, // 発行者の名前
		"logo": {
			"@type": "ImageObject",
			"url": string // ロゴのURL
		}
	},
	"datePublished": string, // 記事の作成日
	"dateModified": string // 記事の更新日
}

export const blogTemplate = (jsonld: MetadataBlogPost, markdown: string) => `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${jsonld.headline} | ${jsonld.publisher.name}</title>
	<script type="application/ld+json">${jsonld}</script>
	<link rel="stylesheet" href="../style.css" />
</head>
<body>
	<header>
		<h1><a href="../">${jsonld.publisher.name}</a></h1>
	</header>
	<main>
		<h1 class="title">${jsonld.headline}</h1>
		<p>${jsonld.datePublished}(更新:${jsonld.dateModified})</p>
		<article>
			${markdownToHtml(markdown)}
		</article>
	</main>
	<footer>
		<nav>
			<ul>
				<li><a href="../">Home</a></li>
				<li><a href="https://github.com/yuukitoriyama">GitHub</a></li>
				<li><a href="https://twitter.com/CoconMap">Twitter</a></li>
			</ul>
		</nav>
		<small>bicycle.toriyama.dev is maintaied by <a href="${jsonld.author.url}">${jsonld.author.name}</a></small>
	</footer>
</body>
</html>`;