/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Jeehunter Technologies Co., Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * remove Node childNodes
 * @param node {@link HTMLElement}
 */
export const clearNode = (node: HTMLElement): void => {
    while (node.lastChild) {
        node.lastChild.remove();
    }
};

const SELECTOR_MATCHED_REGEX = /(?<tagName>[\w\\-]+)?(?<id>#([\w\\-]+))?(?<className>(\.([\w\\-]+))*)/;

export const createElement = <T extends HTMLElement>(
    description: string,
    attrs?: { [key: string]: unknown },
    ...children: (Node | string)[]
): T => {
    const match = SELECTOR_MATCHED_REGEX.exec(description);
    if (!match || !match.groups) {
        return document.createElement('div') as unknown as T;
    }
    const { tagName = 'div', id, className } = match.groups;
    const result = document.createElement(tagName) as unknown as T;

    if (id) {
        result.id = id;
    }
    if (className) {
        result.className = className.replace(/\./g, ' ').trim();
    }

    Object.entries(attrs ?? {}).forEach(([name, value]) => {
        if (typeof value === 'undefined' || /^on\w+$/.test(name)) {
            return;
        }
        result.setAttribute(name, value as string);
    });

    result.append(...children);
    return result as T;
};

/**
 * generate styles
 * @param args string
 * @returns styles {@link HTMLStyleElement}
 */
export const createStyles = (...args: string[]) => {
    const _style = document.createElement('style');
    _style.appendChild(document.createTextNode(args.join(' ')));
    return _style;
};