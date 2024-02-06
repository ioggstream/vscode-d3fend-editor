
import * as vscode from 'vscode';
import { COMPLETION_DATA } from './d3fendData';

const createCompletionItem = (item: { label: string; kind: vscode.CompletionItemKind; documentation: string; insertText: string; range: vscode.Range; }): vscode.CompletionItem => {
    if (item.insertText === undefined) {
        throw new Error('insertText is undefined');
    }
    const ret = new vscode.CompletionItem(item.insertText.toString());
    ret.kind = item.kind;
    ret.documentation = item.documentation;
    ret.insertText = item.insertText;
    ret.range = item.range;
    return ret;
};


const createD3fCompletion = (range: vscode.Range): vscode.CompletionItem[] => {
    return COMPLETION_DATA.map(
        item => createCompletionItem({
            label: item.label,
            kind: item.kind,
            documentation: item.documentation,
            insertText: item.insertText,
            range: range
        })
    );
}


export function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
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
