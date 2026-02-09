import { D3F_SHAPE_ICON_MAP } from '../d3fend/icons';

export function extendedSyntax(source: string): string {
    return d3fend_parse(
        expand_percent(
            resolve_anchors(source)
        )
    );
}

function resolve_anchors(source: string): string {
    const anchorMap: Record<string, string> = {};
    // Capture and replace anchor definitions using named groups.
    source = source.replace(
        /subgraph\s+&(?<anchorId>[a-zA-Z0-9_.-]+)(?<headerRest>[^\n]*)\n(?<body>[\s\S]*?)\nend/g,
        (match, _p1, _p2, _p3, _offset, _string, groups: { anchorId: string; headerRest: string; body: string }) => {
            anchorMap[groups.anchorId] = groups.body;
            return `subgraph ${groups.anchorId}${groups.headerRest}\n${groups.body}\nend`;
        }
    );
    // Replace anchor reference lines using named groups.
    source = source.replace(
        /^(?<indent>\s*)\*(?<refId>[a-zA-Z0-9_.-]+)/gm,
        (
            match,
            _p1,
            _p2,
            _offset,
            _string,
            groups: { indent: string; refId: string }
        ) =>
            anchorMap[groups.refId]
                ? anchorMap[groups.refId]
                    .split('\n')
                    .map(line => groups.indent + line)
                    .join('\n')
                : match
    );
    return source;
}
function test_resolve_anchors() {
    const source = `
    subgraph &a
    %%-a
    %%-b
    end

    subgraph b
    *a
    end
    `;

    const expected = `
    subgraph a
    %%-a
    %%-b
    end
    
    subgraph b
    %%-a
    %%-b
    end
    `;
    return resolve_anchors(source) == expected;
}


function expand_percent(source: string): string {
    const lines = source.split('\n');
    let inSubgraph = false;
    let subgraphId = '';
    // Regex to detect a subgraph start, capturing its ID.
    const subgraphRegex = /^(\s*)subgraph\s+(\S+)(\s*\[.*\])?\s*$/;
    const processedLines = lines.map(line => {
        if (!inSubgraph) {
            const match = line.match(subgraphRegex);
            if (match) {
                // Entering a subgraph block.
                inSubgraph = true;
                subgraphId = match[2];
            }
            return line;
        } else {
            if (line.trim() === 'end') {
                // Exiting subgraph block.
                inSubgraph = false;
                subgraphId = '';
                return line;
            } else {
                // Always add two extra spaces indent.
                const newIndent = '  ';
                const newLine = newIndent + line;
                const trimmed = newLine.trimStart();
                // If the line is a comment (starts with "%% " or "%%\t"), return unmodified.
                if (trimmed.startsWith("%% ") || trimmed.startsWith("%%\t")) {
                    return newLine;
                } else {
                    // Globally replace any occurrence of one or more "%" that
                    // are immediately followed by a dash (-) with the subgraph id.
                    return newLine.replace(/%+(?=-)/g, subgraphId);
                }
            }
        }
    });
    return processedLines.join('\n');
}

function d3fend_replace_tag_with_icon(source: string): string {
    const tags = get_d3fend_tags(source);
    let dest = source;

    // Preserve the first tag if it is used as an icon.
    if (source.startsWith('d3f:')) {
        tags.shift();
    }

    for (const tag of tags) {
        const config = D3F_SHAPE_ICON_MAP[tag] ?? { shape: 'rect', icon: null };
        if (config.icon != null) {
            dest = dest.replace(tag, config.icon);
        }
    }
    return dest;
}

function d3fend_parse(source: string): string {
    // Using named capture groups (ES2018+ required)
    const regex = /^\s*(?<node>[a-zA-Z0-9-_.]+)\["(?<desc>.*?)(?<icon>d3f:[\w-]+)(?<suffix>.*?)"\](?<class>:::[a-zA-Z]+)?(?<eol>\s*)$/gm;
    const dest = source.replace(regex, (...args) => {
        const groups = args[args.length - 1] as { node: string, desc: string, icon: string, class: string, suffix: string, eol: string };
        const config = D3F_SHAPE_ICON_MAP[groups.icon] ?? { shape: 'rect', icon: '' };
        const label = groups.desc + groups.icon + groups.suffix;
        const d3fend_tags = get_d3fend_tags(label);
        const items = [
            `shape: "${config.shape}"`,
            `label: "${d3fend_replace_tag_with_icon(label)}"`,
        ];

        // If the label starts with the icon tag and there is a valid icon,
        //   use the icon in the node definition.
        if (label.startsWith(groups.icon) && config.icon != null) {
            items.push(`icon: "${config.icon}"`);
        }

        return `${groups.node}${groups?.class ?? ''}@{${items.join(',')}}${groups.eol}`
            + `\n`
            + `click ${groups.node} callback "${d3fend_tags.join(',<br>')}"`
            + `\n`;
    });
    return dest;
}


function get_d3fend_tags(source: string): string[] {
    const regex = /d3f:[\w_-]+/g;
    const matches = source.match(regex);
    return matches ?? [];
}

function remove_d3fend_tags(source: string): string {
    const regex = /d3f:[\w_-]+/g;
    return source.replace(regex, '').replace(/\s+/g, ' ').trim();
}