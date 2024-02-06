import { extendMarkdownItWithMermaid } from './mermaid';
import * as vscode from 'vscode';
import { createD3fCompletion } from './d3fendCompletion';
const configSection = 'markdown-mermaid';


export function activate(ctx: vscode.ExtensionContext) {

    const provider = vscode.languages.registerCompletionItemProvider(
        'markdown',
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
                const textUntilPosition = document.lineAt(position).text.slice(0, position.character);
                var match = textUntilPosition.match(
                    /d3f:/
                );
                if (!match) {
                    return undefined;
                }
                var wordRange = document.getWordRangeAtPosition(position);
                if (!wordRange) {
                    return undefined;
                }
                const p0 = new vscode.Position(position.line, wordRange.start.character);
                const p1 = new vscode.Position(position.line, wordRange.end.character);
                return createD3fCompletion(
                    new vscode.Range(p0, p1)
                )
            }
        }
    )

    ctx.subscriptions.push(provider);

    ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration(configSection) || e.affectsConfiguration('workbench.colorTheme')) {
            vscode.commands.executeCommand('markdown.preview.refresh');
        }
    }));

    return {
        extendMarkdownIt(md: any) {
            extendMarkdownItWithMermaid(md, {
                languageIds: () => {
                    return vscode.workspace.getConfiguration(configSection).get<string[]>('languages', ['mermaid']);
                }
            });
            md.use(injectMermaidTheme);
            return md;
        }
    }
}


const defaultMermaidTheme = 'default';
const validMermaidThemes = [
    'base',
    'forest',
    'dark',
    'default',
    'neutral',
];

function sanitizeMermaidTheme(theme: string | undefined) {
    return typeof theme === 'string' && validMermaidThemes.includes(theme) ? theme : defaultMermaidTheme;
}

function injectMermaidTheme(md: any) {
    const render = md.renderer.render;
    md.renderer.render = function () {
        const darkModeTheme = sanitizeMermaidTheme(vscode.workspace.getConfiguration(configSection).get('darkModeTheme'));
        const lightModeTheme = sanitizeMermaidTheme(vscode.workspace.getConfiguration(configSection).get('lightModeTheme'));
        return `<span id="${configSection}" aria-hidden="true"
                    data-dark-mode-theme="${darkModeTheme}"
                    data-light-mode-theme="${lightModeTheme}"></span>
                ${render.apply(md.renderer, arguments)}`;
    };
    return md;
}