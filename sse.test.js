const { serialize, EventType } = require('./sse');

describe('SSE', () => {
  it('creates valid sse event', () => {
    expect(serialize({
      id: 'id1',
      type: EventType.MESSAGE_RECEIVED,
      data: {text: 'Ooops!'},
    })).toEqual(
      'id: id1\n' +
      'event: MESSAGE_RECEIVED\n' +
      'data: {\"text\":\"Ooops!\"}\n\n'
    );
    expect(serialize({ id: 'id2' })).toEqual('id: id2\n\n')
    expect(serialize({ type: 'HAPPENED' })).toEqual('event: HAPPENED\n\n')
  });
});