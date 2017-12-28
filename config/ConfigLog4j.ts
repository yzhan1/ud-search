import { LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel } from 'typescript-logging';

const options = new LoggerFactoryOptions()
    .addLogGroupRule(new LogGroupRule(new RegExp('.+'), LogLevel.Info));

export const Factory = LFService.createNamedLoggerFactory('LoggerFactory', options);