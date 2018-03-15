# Server-Sent events DEMO

**DISCLAIMER**: _Many best practises were harmed during this demo_

## Development

### Run App from CLI
```
./gradlew bootRun
```


## API

### Service Health
```
curl 'http://localhost:8080/health'
```

### Publish Event
```
curl -H "Content-Type: application/json" -X POST -d '{"id": "id1", "type": "AmazingHappened", "data": {"hey": "here"}}' 'http://localhost:8080/v1/events'
```

### Subscribe to Events
```
curl -v 'http://localhost:8080/v1/events:subscribe'
```