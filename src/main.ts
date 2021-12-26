import fs from 'fs/promises';
import path from 'path';
import sass from 'sass';
import { ExifTool } from '@blogmd/exiftool';
import { MetadataBlogPost, blogTemplate, markdownToHtml } from './utils';

export type Template = (metadata: MetadataBlogPost, article: string) => string;
export interface BlogMdSettings {
	styleFile?: string // SCSSファイルのパスを指定
	template?: Template // テンプレートを指定
	articleDir?: string // 記事を保存しているディレクトリを指定する
	outDir?: string // 出力先となるディレクトリを指定する
}

export default class BlogMd {
	template: Template;
	articleDir: string;
	outDir: string;
	constructor(settings: BlogMdSettings) {
		this.template = settings.template || blogTemplate;
		this.articleDir = settings.articleDir || "./articles";
		this.outDir = settings.outDir || "./public";
		(async () => {
			// 生成物を保存するディレクトリを作成
			await fs.mkdir(this.outDir).catch(error => {
				console.error(`${this.outDir}はすでに存在します。`);
			});
			// SCSSファイルのコンパイル
			const css = sass.renderSync({
				file: settings.styleFile || "./style/basic.scss"
			}).css;
			// public直下に保存
			await fs.writeFile(path.join(this.outDir, "style.css"), css.toString());
		})();
	}

	build = async (options: { eraceExif: boolean } = { eraceExif: false }) => {
		// articleディレクトリを探査
		const articleList = await fs.readdir(this.articleDir);
		for (let article of articleList) {
			const sourceDir = path.join(this.articleDir, article);
			// 記事データの読み込み
			const markdown = await fs.readFile(path.join(sourceDir, "article.md"), {
				encoding: "utf8"
			});
			// JSONLDの読み込み
			const jsonld = await fs.readFile(path.join(sourceDir, "meta.jsonld"), {
				encoding: "utf8"
			});
			const metadata: MetadataBlogPost = JSON.parse(jsonld);
			// HTMLの作成
			const html = this.template(metadata, markdownToHtml(markdown));
			// 保存
			const destDir = path.join(this.outDir || "./public", article);
			await fs.mkdir(destDir);
			await fs.writeFile(path.join(destDir, "index.html"), html);
			// 画像データなどをコピー
			await fs.readdir(sourceDir).then(assets => {
				assets.forEach(asset => {
					if (asset.match(/.(md|jsonld)$/) === null) {
						fs.copyFile(
							path.join(sourceDir, asset),
							path.join(destDir, asset)
						);
					}
				})
			});
			// フォルダ内の画像がExif情報を持っているかどうかを確認する
			await ExifTool.checkDirectory(destDir, {
				recursive: true,
				checkOnly: !options.eraceExif
			});
		}
	}

	buildIndex = async () => {
		const indexies: string[] = [];
		// articleディレクトリを探査
		const articleList = await fs.readdir(this.articleDir);
		for (let article of articleList) {
			const sourceDir = path.join(this.articleDir, article);
			// JSONLDの読み込み
			const jsonld = await fs.readFile(path.join(sourceDir, "meta.jsonld"), {
				encoding: "utf8"
			});
			const metadata: MetadataBlogPost = JSON.parse(jsonld);
			// インデックスの作成
			const index = `<small>${metadata.datePublished}</small><br/><p><a href="./${article}/index.html">${metadata.headline}</a>by ${metadata.author.name}</p>`;
			indexies.push(index);
		}
		// インデックスページを作成
		fs.writeFile(path.join(this.outDir, "index.html"), indexies.join(""));
	}
}