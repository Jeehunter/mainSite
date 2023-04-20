/********************************************************************************
 * Copyright (C) Jeehunter All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

export type StoreEventListener = {
    element: HTMLElement;
    type: string;
    handler: (e: Event | MouseEvent | KeyboardEvent) => void;
};

export interface EventAction {
    preventDefault(): void;
    stopPropagation(): void;
}

/**
 * An event listener is a callback function which can be subscribed to.
 */
export interface EventListener<T> {
    (...evtArgs: T[]): void;
}

/**
 * Subscriber for adding event callback.
 */
export interface EventSubscriber<T> {
    (listener: EventListener<T>): void;
}

/**
 * Object implements EventTarget can provide listener for its events.
 */
export interface EventTarget<T> {
    /** Add a callback function as a listener to the target object */
    addEventListener(type: string, callback: EventListener<T>): void;

    /** Remove listener with the same type and callback function on target object */
    removeEventListener(type: string, callback: EventListener<T>): void;
}

/**
 * Provides a pub/sub mechanism for event
 */
export class EventEmitter<T> implements EventTarget<T> {
    private listeners?: Map<string, EventListener<T>[]>;

    addEventListener(type: string, callback: EventListener<T>): void {
        if (!this.listeners) {
            this.listeners = new Map<string, EventListener<T>[]>();
        }
        let existingListeners = this.listeners.get(type);
        if (!existingListeners) {
            existingListeners = [];
            existingListeners.push(callback);
            this.listeners.set(type, existingListeners);
        } else {
            existingListeners.push(callback);
        }
    }

    removeEventListener(type: string, listener: EventListener<T>): void {
        if (!this.listeners) {
            return;
        }

        // remove the last callback from the listeners
        const existingListeners = this.listeners.get(type);
        if (!existingListeners) {
            return;
        }
        let lastPos = -1;
        for (let i = existingListeners.length - 1; i >= 0; i--) {
            if (existingListeners[i] === listener) {
                lastPos = i;
                break;
            }
        }
        if (lastPos < 0) {
            return;
        }
        existingListeners.splice(lastPos, 1);
        return;
    }

    /**
     * Get a event subscription function for a specified event type
     * @param type Event type
     * @returns Subscription function
     */
    asSubscriber(type: string): EventSubscriber<T> {
        return (listener: EventListener<T>) => {
            this.on(type, listener);
        };
    }

    /**
     * Add a callback function to the end of the event listeners
     * @param type Event type
     * @param listener Function to be invoked when event triggered
     */
    on(type: string, listener: EventListener<T>): void {
        this.addEventListener(type, listener);
    }

    /**
     * Add a listener to the event which will only trigger once.
     * @param type Event type
     * @param listener Function to be invoked when event triggered
     */
    once(type: string, listener: EventListener<T>) {
        const onceListener = (...evtArgs: T[]) => {
            let triggered = false;
            if (!triggered) {
                this.removeEventListener(type, onceListener);
                triggered = true;
                listener.call(this, ...evtArgs);
            }
        };
        this.addEventListener(type, onceListener);
    }

    /**
     * Emit event by calling to the registered listeners synchronously in the order in which they were added
     * @param type Event type
     * @param evtArgs The event objects to be emitted
     */
    emit(type: string, ...evtArgs: T[]): void {
        if (!this.listeners) {
            return;
        }
        const listenerCandidates = this.listeners.get(type);
        if (!listenerCandidates || listenerCandidates.length === 0) {
            return;
        }
        const [...toBeEmitted] = listenerCandidates;
        for (let i = 0; i < toBeEmitted.length; i++) {
            try {
                toBeEmitted[i].call(this, ...evtArgs);
            } catch (e) {
                // prevent the error from hunging up the follow-up callbacks
                // TO-DO need more action to handle error, throw?
                // console.log(e);
            }
        }
    }

    /**
     * Remove all listeners for specific event type
     * @param type Event type to remove,
     *             remove all listeners for all event type if it is undefined
     */
    clear(type?: string) {
        if (!this.listeners) {
            return;
        }
        if (!type) {
            this.listeners.clear();
            this.listeners = undefined;
            return;
        }
        this.listeners.delete(type);
    }
}

export const EventFlowAssister = {
    stop<T extends Event>(e: T, cancelBubble?: boolean) {
        e.preventDefault?.();

        if (cancelBubble) {
            e.stopPropagation?.();
        }
    }
};

export interface DomEventListener {
    element: HTMLElement;
    type: string;
    handler(e: Event): void;
    options?: boolean | AddEventListenerOptions;
}

export class DomListener {
    private _handler: EventListenerOrEventListenerObject | null;
    private _element: HTMLElement | null;
    private readonly _type: string;
    private readonly _options: boolean | AddEventListenerOptions;

    constructor({ element, type, handler, options }: DomEventListener) {
        this._element = element;
        this._type = type;
        this._handler = handler;
        this._options = options || false;
        this._element.addEventListener(this._type, this._handler, this._options);
    }

    public unbind(): void {
        if (!this._handler) {
            return;
        }
        this._element?.removeEventListener(this._type, this._handler, this._options);
        this._element = null;
        this._handler = null;
    }
}

export class EventStore {
    private _store = new Map<number, DomListener>();
    private _id = 0;

    constructor() {}

    get store() {
        return this._store;
    }

    /**
     * add dom EventListener
     * @param element HTMLElement
     * @param type string
     * @param handler (e: T) => void T extends {@link Event}
     * @param options boolean | AddEventListenerOptions
     * @returns id number for removeListener byId
     */
    add<T extends Event>(
        element: HTMLElement,
        type: string,
        handler: (e: T) => void,
        options?: boolean | AddEventListenerOptions
    ) {
        const domListener = new DomListener({
            element,
            type,
            handler,
            options
        });
        this._store.set(this._id++, domListener);
        return this._id;
    }

    /**
     * removeListener by id
     * @param id when add add returned
     */
    removeById(id: number) {
        if (!this._store.has(id)) {
            return false;
        }
        this._store.get(id)?.unbind();
        this._store.delete(id);
    }

    /**
     * remove all Listener
     */
    clear() {
        this._store.forEach((event) => {
            event.unbind();
        });
        this._store.clear();
    }
}