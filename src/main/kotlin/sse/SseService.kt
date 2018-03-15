package sse

import org.springframework.http.codec.ServerSentEvent
import org.springframework.stereotype.Component
import reactor.core.publisher.EmitterProcessor
import reactor.core.publisher.Flux
import java.time.Duration
import java.util.*


@Component
class SseService {
    private final var emitter: EmitterProcessor<ServerSentEvent<Any>> = EmitterProcessor.create(false)

    init {
        val interval: Flux<Long> = Flux.interval(Duration.ofSeconds(3))
        interval.subscribe({ ping() })
    }


    fun publish(event: Event) {
        emitter.onNext(
                ServerSentEvent.builder<Any>()
                        .event(event.toString())
                        .id(UUID.randomUUID().toString())
                        .build())
    }
    fun ping() {
        emitter.onNext(
                ServerSentEvent.builder<Any>()
                        .comment("PING")
                        .build()
        )
    }

    fun subscribe () : Flux<ServerSentEvent<Any>> {
        return emitter
    }
}


