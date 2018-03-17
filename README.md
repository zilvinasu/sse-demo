# Server-Sent events demo

**DISCLAIMER**: Best practises might have been harmed during this demo

## API

### Service Health

```sh
curl 'http://localhost:8080/health'
```

### Publish Event

```sh
curl -H "Content-Type: application/json" -X POST -d '{"id": "id1", "type": "AmazingHappened", "data": {"hey": "here"}}' 'http://localhost:8080/v1/events'
```

### Subscribe to Events

```sh
curl -v 'http://localhost:8080/v1/events:subscribe'
```

## Development

### Run Client and Server

`yarn dev`

### Run Server tests

`yarn test`
