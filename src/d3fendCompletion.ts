
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



export const createD3fCompletion = (range: vscode.Range): vscode.CompletionItem[] => {
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