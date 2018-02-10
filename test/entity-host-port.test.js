/**
 * This file is part of node-host-port
 *
 * Copyright (c) 2018 SAS 9 Février.
 *
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 *
 */

const should = require('should'); // eslint-disable-line no-unused-vars

const {HostPortEntity} = require('../lib/entity-host-port');
const {HostPortEntityError} = require('../lib/entity-host-port-error');

describe('Base unit testing for [class=HostEntityPort]', () => {
  it('should be a function', () => {
    (HostPortEntity).should.be.a.Function();
  });
});

describe('Instantiate a new {HostPortEntity} passing ', () => {
  it('a {null} parameter should throw a {HostPortEntityError}', () => {
    (() => { new HostPortEntity(null)}).should.throw(HostPortEntityError);
  });

  it('a {arguments}[\'hostname\', port] parameter should return a instance of {HostPortEntity}', () => {
    (new HostPortEntity('hostname', 1024)).should.be.an.instanceOf(HostPortEntity);
  });

  it('an {object}{} parameter should throw a {HostPortEntityError}', () => {
    (() => { new HostPortEntity({})}).should.throw(HostPortEntityError);
  })

  it('an {object}{hostname: null, portnumber: null} parameter should throw a {HostPortEntityError}', () => {
    (() => { new HostPortEntity({})}).should.throw(HostPortEntityError);
  });

  it('an {object}{host: null, port: null} parameter should throw a {HostPortEntityError}', () => {
    (() => { new HostPortEntity({})}).should.throw(HostPortEntityError);
  });

  it('an {object}{host: \'myhostname\', port: 1024} parameter should throw a {HostPortEntity}', () => {
    (new HostPortEntity({host: 'hostname', port: 1024})).should.be.an.instanceOf(HostPortEntity);
  });

  it('an {array}[\'myhostname\', 1024] parameter should return an instance of {HostPortEntity}', () => {
    (new HostPortEntity(['hostname', 1024])).should.be.an.instanceOf(HostPortEntity);
  });

  it('an {array}[item] parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity(['hostname'])
    }).should.throw(HostPortEntityError);
  });

  it('an {array}[item, item, item] parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity(['hostname', 1024, 2048])
    }).should.throw(HostPortEntityError);
  });

  it('a {string}(hostname) parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity('hostname')
    }).should.throw(HostPortEntityError);
  });

  it('a {string,object}(hostname, {}) parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity('hostname', {})
    }).should.throw(HostPortEntityError);
  });

  it('a {string,array}(hostname, []) parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity('hostname', [])
    }).should.throw(HostPortEntityError);
  });

  it('a {array,string}([], \'1024\') parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity([], '1024')
    }).should.throw(HostPortEntityError);
  });

  it('a {object,string}({}, \'1024\') parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity({}, '1024')
    }).should.throw(HostPortEntityError);
  });

  it('a {array,number}([], 1024) parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity([], 1024)
    }).should.throw(HostPortEntityError);
  });

  it('a {object,number}({}, 1024) parameter should throw a {HostPortEntityError}', () => {
    (() => {
      new HostPortEntity({}, 1024)
    }).should.throw(HostPortEntityError);
  });

});

describe('A {HostPortEntity} using checked parameters ', () => {

  it('and passing {string,number} should have properties {.host, .port}', () => {
    (new HostPortEntity('hostname', 1024)).should.have.properties('host', 'port');
  });

  it('and passing {string,string} should have properties {.host, .port}', () => {
    (new HostPortEntity('hostname', '1024')).should.have.properties('host', 'port');
  });

  it('and passing {object} should have properties {.host, .port}', () => {
    (new HostPortEntity({host: 'hostname', port: '1024'})).should.have.properties('host', 'port');
  });

  it('and passing {array[string,number]} should have properties {.host, .port}', () => {
    (new HostPortEntity(['hostname', 1024])).should.have.properties('host', 'port');
  });

  it('and passing {array[string,string]} should have properties {.host, .port}', () => {
    (new HostPortEntity(['hostname', '1024'])).should.have.properties('host', 'port');
  });

  it('and passing {string} should have properties {.host, .port}', () => {
    (new HostPortEntity('hostname:1024')).should.have.properties('host', 'port');
  });

  it('and passing {string:ipv4} should have properties {.host, .port}', () => {
    (new HostPortEntity('172.17.0.2:1024')).should.have.properties('host', 'port');
  });

  it('and passing {string:ipv6} should have properties {.host, .port}', () => {
    (new HostPortEntity('[2001:0db8:0000:85a3:0000:0000:ac1f:8001]:1024')).should.have.properties('host', 'port');
  });

});


