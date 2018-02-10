/**
 * This file is part of node-host-port
 *
 * Copyright (c) 2018 SAS 9 Février.
 *
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 *
 */


const _ = require('lodash');

const {HostEntity, HostEntityError} = require('entity-host');
const {PortEntity, PortEntityError} = require('entity-port');

const {HostPortEntityError} = require('./entity-host-port-error');

/**
 * HostPort class.
 *
 * @class
 */
class HostPortEntity {

  /***
   * Create a new instance of {HostPortEntity}.
   *
   * @param args - The arguments.
   * @constructor
   */
  constructor(...args) {
    HostPortEntity.validateTypeOfArgs(...args);
    Object.assign(this, HostPortEntity.getHostPortFromArgs(...args));
    Object.assign(this, this.validate());
  }

  /**
   * Determinate the type of passed arguments.
   *
   * @param args - The arguments.
   */
  static validateTypeOfArgs(...args) {
    const arrayOfArgs = Array.from(args);
    if ((!arrayOfArgs[0]) || (arrayOfArgs.length > 2)) {
      throw new HostPortEntityError(`No more than 2 parameters allowed. Founded ${arrayOfArgs.length} parameters: ${JSON.stringify(arrayOfArgs)}`);
    }

    if (arrayOfArgs.length === 1) {
      const arg = arrayOfArgs[0];

      if ((arg instanceof Array) && (arg.length !== 2)) {
        throw new HostPortEntityError(`{HostEntity} allows {array} as parameter if array has two items. Founded ${JSON.stringify(arg)}`);
      }

      if ((typeof arg === 'object') && (!(arg instanceof Array)) && (!(arg.host && arg.port))) {
        throw new HostPortEntityError(`{HostEntity} allows {object} as parameter if properties (host, value) are defined. Founded ${JSON.stringify(arg)}`);
      }
      /*
      if ((typeof arg === 'string')) {
        throw new HostPortEntityError(`{HostEntity} allows {{string}, {string|number}} as parameters. Founded only one parameter: ${JSON.stringify(arg)}`);
      }
      */
    } else if (arrayOfArgs.length === 2) {
      const arg1 = arrayOfArgs[0], arg2 = arrayOfArgs[1];

      if ((arg1 instanceof Array)) {
        throw new HostPortEntityError(`{HostEntity} allows only one parameter if {array} is provided. Founded parameters: ${JSON.stringify(arrayOfArgs)}`);
      }
      if ((typeof arg1 === 'object') && (!(arg1 instanceof Array))) {
        throw new HostPortEntityError(`{HostEntity} allows only one parameter if {object} is provided. Founded parameters: ${JSON.stringify(arrayOfArgs)}`);
      }
      if (((typeof arg1 === 'string') && (!(_.includes(['string', 'number'], typeof arg2)))) || (_.includes(['string', 'number'], typeof arg2) && (typeof arg1 !== 'string'))) {
        throw new HostPortEntityError(`{HostEntity} {{string}, {string|number}} as parameters. Founded invalid type of provided parameters: ${JSON.stringify(arrayOfArgs)}`);
      }
    }
  }

  /**
   * Return host and port from the passed parameters.
   *
   * @param args - The arguments.
   * @return {{host, port}}
   */
  static getHostPortFromArgs(...args) {
    const arrayOfArgs = Array.from(args);
    if (arrayOfArgs.length === 1) {
      const arg = arrayOfArgs[0];
      switch (typeof arg) {
        case 'object':
          if (arg instanceof Array) {
            return {host: arg[0], port: arg[1]};
          }
          return arg;
        case 'string':
          return {host: arg.substr(0, arg.lastIndexOf(':')), port: arg.substr(arg.lastIndexOf(':') + 1, arg.length)};
        default:
          // @todo:
          break;
      }
    } else if (arrayOfArgs.length === 2) {
      const host = arrayOfArgs[0], port = arrayOfArgs[1];
      return {host: host, port: port};
    }
  }

  /**
   * Validate host and port using {HostEntity} and {PortEntity}.
   *
   * @return {{$host, $port}}
   */
  validate() {
    try {
      return {
        $host: HostEntity.factory(this.host),
        $port: PortEntity.factory(this.port),
      }
    } catch (e) {
      throw new HostPortEntity(e);
    }
  }

}

module.exports = {};
module.exports.HostPortEntity = HostPortEntity;
