/**
 * This file is part of node-host-port
 *
 * Copyright (c) 2018 SAS 9 Février.
 *
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 *
 */


/**
 * Custom error dedicated to {HostPortEntity} class.
 *
 * @class
 */
class HostPortEntityError extends Error {

  /**
   * Create a new instance of {HostPortEntityError}.
   *
   * @param args - The arguments.
   * @constructor
   */
  constructor(...args) {
    super(...args);
  }
}

module.exports = {};
module.exports.HostPortEntityError = HostPortEntityError;