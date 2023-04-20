/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Jeehunter Technologies Co., Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EventEmitter, EventSubscriber } from './event';

// Default open for easy testing.
const mode = 'open';

export abstract class BaseComponent extends HTMLElement implements IComponent {
    readonly shadow: ShadowRoot;

    private readonly emitter = new EventEmitter<void>();
    readonly onConnected = this.emitter.asSubscriber('connected');
    readonly onDisconnected = this.emitter.asSubscriber('disconnected');

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode });
    }

    connectedCallback() {
        this.emitter.emit('connected');
    }
    disconnectedCallback() {
        this.emitter.emit('disconnected');
    }

    abstract dispose(): void;
}

export interface IComponent extends HTMLElement {
    onConnected: EventSubscriber<void>;
    onDisconnected: EventSubscriber<void>;
    dispose(): void;
}

/**
 * Define a new custom element.
 * @param name Name for the new custom element. Note that custom element names must contain a hyphen.
 * @param constructor Constructor for the new custom element.
 * @param options Object that controls how the element is defined.
 * @returns Whether the definition is successful.
 */
export function defineCustomElement(
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions
): boolean {
    if (window.customElements.get(name)) {
        return false;
    }
    window.customElements.define(name, constructor, options);
    return true;
}