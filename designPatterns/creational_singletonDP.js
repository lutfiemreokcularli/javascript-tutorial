export class Logger {
    static loggerInstance = null;
    static logLevels = ["info", "warn", "error"];
    constructor(logLevel = 'info', transport = console) {
        if (Logger.loggerInstance) {
            throw new TypeError(
                'Logger is not constructable, use getInstance() instead'
            );
        }
        this.logLevel = logLevel;
        this.transport = transport;
        Logger.loggerInstance = this;
    }
    isLevelEnabled(targetLevel) {
        return (
            Logger.logLevels.indexOf(targetLevel) >=
            Logger.logLevels.indexOf(this.logLevel)
        );
    }
    info(message) {
        if (this.isLevelEnabled('info')) {
            return this.transport.info(message);
        }
    }
    warn(message) {
        if (this.isLevelEnabled('warn')) {
            return this.transport.warn(message);
        }
    }
    error(message) {
        if (this.isLevelEnabled('error')) {
            return this.transport.error(message);
        }
    }
    static getInstance() {
        if (!Logger.loggerInstance) {
            Logger.loggerInstance = new Logger('info', console);
        }
        return Logger.loggerInstance;
    }
}
export default Logger.getInstance();
const a = Logger.getInstance();
const b = Logger.getInstance();


class anotherLogger {
    static loggerInstance = null;
    static logLevels = ['info', "warn", "error"];
    constructor(logLevel = 'info', transport = console) {
        if(anotherLogger.loggerInstance){
            throw new TypeError(
                'Logger is not constructable, use getInstance() instead'
            );
        }
        this.logLevel = logLevel;
        this.transport = transport;
        anotherLogger.loggerInstance = this;
    }
    isLevelEnabled(targetLevel){
        return (
            anotherLogger.logLevels.indexOf(targetLevel) == anotherLogger.logLevels.indexOf(this.logLevel)
        );
    }
    info(message){
        if(this.isLevelEnabled('info')){
            return this.transport.info(message);
        }
    }
    warn(message){
        if(this.isLevelEnabled('warn')){
            return this.transport.warn(message);
        }
    }
    static getInstance(){
        if(!anotherLogger.loggerInstance){
            anotherLogger.loggerInstance = new anotherLogger('info', console);
        }
        return anotherLogger.loggerInstance;
    }
}
var anew = new anotherLogger();