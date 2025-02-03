import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: Map<string, EventHandlerInterface[]> = new Map();

    get getEventHandlers(): Map<string, EventHandlerInterface<EventInterface>[]> {
        return this.eventHandlers;
      }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if(this.eventHandlers.has(eventName)) {
            // Para cada um dos eventos, executa um Handle do evento
            this.eventHandlers.get(eventName).forEach(handler => handler.handle(event));
        }

    }
    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.eventHandlers.has(eventName)){
            this.eventHandlers.set(eventName, []);
        }
        this.eventHandlers.get(eventName).push(eventHandler);
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if(this.eventHandlers.has(eventName)){
            const index = this.eventHandlers.get(eventName).indexOf(eventHandler);
            if(index !== -1) {
                this.eventHandlers.get(eventName).splice(index, 1);
            }
        }
    }
    unregisterAll(): void {
        this.eventHandlers.clear();
    }

}