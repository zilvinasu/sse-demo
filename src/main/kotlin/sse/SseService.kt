package sse

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.http.codec.ServerSentEvent
import org.springframework.stereotype.Component
import reactor.core.publisher.EmitterProcessor
import reactor.core.publisher.Flux
import java.time.Duration


@Component
class SseService {
    val emitter: EmitterProcessor<ServerSentEvent<Any>> = EmitterProcessor.create(false)
    val mapper: ObjectMapper = jacksonObjectMapper()


    init {
        val interval: Flux<Long> = Flux.interval(Duration.ofSeconds(3))
        interval.subscribe({ ping() })
    }


    fun publish(event: Event) {
        emitter.onNext(
                ServerSentEvent.builder<Any>(mapper.writeValueAsString(event.data))
                        .event(event.type)
                        .id(event.id)
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


