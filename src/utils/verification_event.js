import EventEmitter from 'events';

const verificationEvents = new EventEmitter();
verificationEvents.setMaxListeners(0); // many users may wait at once

export default verificationEvents;