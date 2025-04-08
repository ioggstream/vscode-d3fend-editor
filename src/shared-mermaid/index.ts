import elkLayouts from '@mermaid-js/layout-elk';
import zenuml from '@mermaid-js/mermaid-zenuml';
import mermaid, { MermaidConfig } from 'mermaid';
import { iconPackConfig, requireIconPack } from './iconPackConfig';

import {D3FEND_DATA} from '../d3fendData';


function renderMermaidElement(
    mermaidContainer: HTMLElement,
    writeOut: (mermaidContainer: HTMLElement, content: string) => void,
): {
    containerId: string;
    p: Promise<void>;
} {
    const containerId = `mermaid-container-${crypto.randomUUID()}`;
    const diagramId = `mermaid-${crypto.randomUUID()}`;

    const source = mermaidContainer.textContent ?? '';
    mermaidContainer.id = containerId;
    mermaidContainer.innerHTML = '';

    return {
        containerId,
        p: (async () => {
            try {
                // Catch any parsing errors
                await mermaid.parse(source);

                //  Render the diagram
                const renderResult = await mermaid.render(diagramId, source);
                writeOut(mermaidContainer, renderResult.svg);
                renderResult.bindFunctions?.(mermaidContainer);
            } catch (error) {
                if (error instanceof Error) {
                    const errorMessageNode = document.createElement('pre');
                    errorMessageNode.className = 'mermaid-error';
                    errorMessageNode.innerText = error.message;
                    writeOut(mermaidContainer, errorMessageNode.outerHTML);
                }

                throw error;
            }
        })()
    };
}

export async function renderMermaidBlocksInElement(root: HTMLElement, writeOut: (mermaidContainer: HTMLElement, content: string) => void): Promise<void> {
    // Delete existing mermaid outputs
    for (const el of root.querySelectorAll('.mermaid > svg')) {
        el.remove();
    }
    for (const svg of root.querySelectorAll('svg')) {
        if (svg.parentElement?.id.startsWith('dmermaid')) {
            svg.parentElement.remove();
        }
    }

    // We need to generate all the container ids sync, but then do the actual rendering async
    const renderPromises: Array<Promise<void>> = [];
    for (const mermaidContainer of root.querySelectorAll<HTMLElement>('.mermaid')) {
        renderPromises.push(renderMermaidElement(mermaidContainer, writeOut).p);
    }

    for (const p of renderPromises) {
        await p;
    }
}

function registerIconPacks(config: Array<{ prefix?: string; pack: string }>) {
    const iconPacks = config.map((iconPack) => ({
        name: iconPack.prefix || '',
        loader: () => {
            try {
                const module = requireIconPack(`./${iconPack.pack.replace('@iconify-json/', '')}`);
                return module.icons || {};
            } catch (error) {
                console.error(`Failed to load icon pack: ${iconPack.pack}`, error);
                return {};
            }
        },
    }));

    mermaid.registerIconPacks(iconPacks);
}

export async function registerMermaidAddons() {
    registerIconPacks(iconPackConfig);
    mermaid.registerLayoutLoaders(elkLayouts);
    await mermaid.registerExternalDiagrams([zenuml]);
}

export function loadMermaidConfig(): MermaidConfig {
    const configSpan = document.getElementById('markdown-mermaid');
    const darkModeTheme = configSpan?.dataset.darkModeTheme;
    const lightModeTheme = configSpan?.dataset.lightModeTheme;

    return {
        startOnLoad: false,
        theme: (document.body.classList.contains('vscode-dark') || document.body.classList.contains('vscode-high-contrast')
            ? darkModeTheme ?? 'dark'
            : lightModeTheme ?? 'default') as MermaidConfig['theme'],
    };
}

function createTooltip(needle: string): string {
   const icon = "";
   const FOO = {
    6: `https://next.d3fend.mitre.org/dao/artifact/`,
    7: `https://next.d3fend.mitre.org/dao/technique/`,
   }
   const prefix = D3FEND_DATA[needle]?.prefix || '';
   const url = prefix ? `https://next.d3fend.mitre.org/dao/artifact/${needle}/` : 'about:blank';

   return `<a title='${needle}' href='${url}' target='_blank' rel='noopener noreferrer'>${icon}</a>`;
 }
function replaceAfterPosition(
    str: string, 
    position: number, 
    searchValue: string | RegExp, 
    replaceValue: string
): string {
    let firstPart: string = str.substring(0, position);
    let secondPart: string = str.substring(position);
    secondPart = secondPart.replace(searchValue, replaceValue);
    return firstPart + secondPart;
}
interface RenderD3fendIconsConfig {
    text: string;
}

export const renderD3fendIcons = function (text: string): string {
   let matches: string[] | null = text.match(/d3f:\w+/g);
   console.log('renderD3fendIcons', text, matches);
   let position: number = 0;
   if (matches) {
     matches.forEach((needle: string) => {
       let replacement: string = createTooltip(needle);
       text = replaceAfterPosition(text, position, needle, replacement);
       position += replacement.length - needle.length;
       console.log('found', needle, text);
     });
   }
   console.log('new text', text);
   return text;
};