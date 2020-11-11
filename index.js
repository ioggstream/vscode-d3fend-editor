"use strict"

module.exports.activate = () => {
    const pluginKeyword = 'mermaid';
    const tokenTypeInline = 'inline';
    const base64url = require('base64url');
    return {
        extendMarkdownIt(md) {
            md.use(require('markdown-it-container'), pluginKeyword, {
                anyClass: true,
                validate: () => true,

                render: (tokens, idx) => {
                    const token = tokens[idx];

                    if (token.info.trim() == pluginKeyword) {
                        for (const [i, value] of tokens.entries()) {
                            if (value.tag == 'p') {
                                value.type = tokenTypeInline
                                value.tag = ''
                                value.content = ''
                                value.children = []
                            } else if (value != undefined && value.type == tokenTypeInline) {
                                value.content = preProcess(value.content);
                            }
                        }
                    }

                    if (token.nesting === 1) {
                        return `<div class="${pluginKeyword}">`;
                    } else {
                        return '</div>';
                    }
                }
            });


            const highlight = md.options.highlight;
            md.options.highlight = (code, lang) => {
                if (lang && lang.match(/\bmermaid\b/i)) {
                    const img_url = () => {
                        if (!lang.match(/img/))
                            return ``;

                        const img_data = base64url.encode(
                                JSON.stringify({"code": code})
                                )
                        const img_url = `https://mermaid.ink/img/${img_data}`;
                        return `
                            <div>
                            <a href="${img_url}" >Image URL</a>
                            <blockquote>${img_url}</blockquote>
                            </div>
                            `
                    }
                    const ret = `${img_url(code, lang)}
                            <div class="${pluginKeyword}">${preProcess(code)}</div>`;
                    return ret;
                }
                const hl= highlight(code, lang);
                return hl;
            };
            console.log(md);
            return md;
        }
    }
}

const preProcess = (/** @type {string} */source) =>
    source
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;');